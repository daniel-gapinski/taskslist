import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateProps {
    children: ReactNode
}

export default function Private({ children }: PrivateProps) {

    const { isAuthenticated, loading } = useContext(AuthContext);

    if(loading) {
        return (
            <div>Carregando...</div>
        )
    }

    if (!isAuthenticated) {
        console.log("Você não está autenticado!");
        return (
            <Navigate to={"/login"} />
        )
    }

    return children;

}