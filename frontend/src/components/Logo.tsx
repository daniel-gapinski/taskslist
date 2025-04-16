import logoImg from "../assets/Logo.svg";

export default function Logo() {
    return(
        <>
            <img src={logoImg} alt="Logomarca" className="object-fill max-w-32 max-h-32" />
        </>
    )
}