import { VscTrash } from "react-icons/vsc";

interface DeleteButtonProps {
    onClick: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {

    return (
        <>
            <button className="cursor-pointer" onClick={onClick}>
                <VscTrash className="hover:text-red-500" />
            </button>
        </>
    )
}