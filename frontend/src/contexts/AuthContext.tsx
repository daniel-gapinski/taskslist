import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "../services/apiClient";
import { NavigateFunction } from "react-router-dom";

interface AuthContextData {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    loading: boolean;
    SignIn: (credentials: SignInProps, navigate: NavigateFunction) => void;
    SignUp: (credentials: SignUpProps) => void;
    logoutUser: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

interface SignInProps {
    email: string;
    password: string;
}

interface SignUpProps {
    name: string;
    email: string;
    password: string;
}

interface UserProps {
    id: string;
    name: string;
    email: string;
}


export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(null, "@tasks.token", { path: "/" });
        window.location.href = "/login";
    } catch (err) {
        console.log("Erro ao sair!", err);
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { "@tasks.token": token } = parseCookies();

        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            //console.log("Token encontrado:", token);

            api.get("/me").then((response) => {
                //console.log("Usuário autenticado:", response.data);
                const { id, name, email } = response.data;
                setUser({
                    id,
                    name,
                    email,
                });
            }).catch((err) => {
                console.log("erro ao buscar me: ", err);
                signOut();
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    async function SignIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", {
                email,
                password,
            });
            //console.log(response.data);

            const { id, name, email: userEmail, token } = response.data;
            setCookie(undefined, "@tasks.token", token, {
                maxAge: 60 * 60 * 24 * 30, //Expira em um mês
                path: "/",
            });
            setUser({
                id,
                name,
                email: userEmail,
            });

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            window.location.href = "/";

        } catch (err) {
            console.log("Erro ao logar", err);
        }
    }


    async function SignUp({ name, email, password }: SignUpProps) {
        try {
            await api.post("/users", {
                name,
                email,
                password,
            });
            window.location.href = "/login";

        } catch (err) {
            console.log("Erro ao registrar", err);
        }
    }

    async function logoutUser() {
        try {
            destroyCookie(null, "@tasks.token", { path: "/" });
            window.location.href = "/login";
            setUser(undefined);
        } catch (err) {
            console.log("Erro ao deslogar: ", err)
        }
    }


    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            SignIn,
            SignUp,
            logoutUser,
            loading,
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
