import InputRegister from "../components/InputRegister";
import LoginButton from "../components/LoginButton";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const { SignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        if(email == "" && password == "") {
            alert("Os campos e-mail e password são obrigatórios!");
            return;
        }

        SignIn({
            email,
            password,
        }, navigate);

    }

    return (
        <>
            <div className="w-full h-screen bg-purple-950 flex justify-center items-center">
                <div className="p-3 bg-white rounded-md w-full max-w-xl mx-3">
                    <div className="w-full flex justify-center py-2">
                        <div className="flex flex-row gap-1 text-3xl ">
                            <h2 className="font-bold py-3 text-purple-base">Entrar</h2>
                        </div>
                    </div>


                    <InputRegister 
                        name="email" 
                        placeholder="E-mail" 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputRegister 
                        name="password" 
                        placeholder="********" 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <div className="w-full flex justify-center">
                        <LoginButton name="Entrar" onClick={handleLogin} />
                    </div>
                    <div className="flex justify-center mt-5 gap-1">
                        <h2 className="text-green-base">Não possui conta?</h2>
                        <a className="text-purple-base hover:text-purple-950" href="/register">Registre-se</a>
                    </div>
                </div>
            </div>
        </>
    )
}