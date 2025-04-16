import { ReactNode } from "react";
import { IoMdLogIn } from "react-icons/io";

interface ButtonProps {
    name: ReactNode;
    onClick: () => void;
}

export default function LoginButton({ name, onClick }: ButtonProps) {

    return (
        <>
            <button type="button" onClick={onClick} className="bg-green-base hover:bg-green-dark flex justify-center items-center gap-2 h-12 w-32 rounded-lg text-sm text-white cursor-pointer">
                <span className="hidden sm:inline">{name}</span>
                <IoMdLogIn  size={18} />
            </button>
        </>
    )
}