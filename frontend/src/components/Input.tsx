
interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ name, placeholder, type, value, onChange }: InputProps) {
    return (
        <>
            <input
                className="w-full mb-3 max-w-2xl h-12 bg-white border-1 border-gray-300 outline-0 rounded-lg p-3 text-sm"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </>
    )
}