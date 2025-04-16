import { ReactNode } from "react";
import { GoPlusCircle } from "react-icons/go";

interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
}

export default function CreateTaskButton({ children, onClick }: ButtonProps) {

    return (
        <>
            <button type="button" onClick={onClick} className="bg-purple-dark flex justify-center items-center gap-2 h-12 w-32 rounded-lg text-sm text-white cursor-pointer">
                <span className="hidden sm:inline">{children}</span>
                <GoPlusCircle size={18} />
            </button>
        </>
    )
}