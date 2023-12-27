import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";


export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // handle errors 
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid place-items-center bg-gradient-to-b from-blue-800 to-blue-400 h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 bg-white border-blue-900">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        className="p-2"
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        className="p-2"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="bg-blue-900 text-white font-bold cursor-pointer px-6 py-2 hover:bg-blue-600">
                        Login
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ">
                            {error}
                        </div>
                    )}
                    <Link className="text-sm mt-3 " href={"/registerPage"}>
                        ¿No tienes cuenta? <span className="underline text-blue-900">Register</span>
                    </Link>
                    <Link className="text-sm " href={"/"}>
                        Continuar sin sesión <span className="underline text-blue-900">Continuar</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}