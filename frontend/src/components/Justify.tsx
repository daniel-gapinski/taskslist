import { ReactNode } from "react"


interface JustifyProps {
    children: ReactNode;
}

export default function Justify({ children }: JustifyProps) {
    return (
        <>
            <div className="w-full relative">
                <div className="w-full absolute -top-6 flex justify-center gap-5 max-w-7xl mx-auto px-2">
                    {children}
                </div>
            </div>
        </>
    )
}