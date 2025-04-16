import { useContext, useState } from "react";
import InputRegister from "../components/InputRegister";
import RegisterButton from "../components/RegisterButton";
import { AuthContext } from "../contexts/AuthContext";

export default function Register() {

    const { SignUp } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister() {
        if(name === "" && email === "" && password === ""){
            alert("Preencha todos os campos!");
            return;
        }

        SignUp({
            name,
            email,
            password,
        })
    }

    return (
        <>
            <div className="w-full h-screen bg-purple-950 flex justify-center items-center">
                <div className="p-3 bg-white rounded-md w-full max-w-xl mx-3">
                    <div className="w-full flex justify-center py-2">
                        <div className="flex flex-row gap-1 text-3xl ">
                            <h2 className="font-bold py-3 text-green-base">Criar</h2>
                            <h2 className="font-bold py-3 text-purple-base">conta</h2>
                        </div>
                    </div>

                    <InputRegister 
                        name="name" 
                        placeholder="Nome" 
                        type="text" 
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        <RegisterButton onClick={handleRegister} name="Registrar" />
                    </div>
                    <div className="flex justify-center mt-5 gap-1">
                        <h2 className="text-green-base">Já possui conta?</h2>
                        <a className="text-purple-base hover:text-purple-950" href="/login">Entrar</a>
                    </div>
                </div>
            </div>
        </>
    )
}