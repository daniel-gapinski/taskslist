import { useContext } from "react";
import Container from "./Container";
import Logo from "./Logo";
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from "../contexts/AuthContext";


export default function Header() {

    const { logoutUser } = useContext(AuthContext);

    function handleLogout() {
        logoutUser();
    }

    return (
        <>
            <header className="bg-gray-light h-32 w-full">
                <Container>
                    <button onClick={handleLogout} className="absolute right-3 top-3 cursor-pointer hover:scale-150 hover:transition-all">
                        <IoIosLogOut size={19} color="#eb3434" />
                    </button>
                    <div className="flex justify-center w-full h-32">
                        <Logo />
                    </div>
                </Container>
            </header>
        </>
    )
}