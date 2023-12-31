import Link from 'next/link'
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'

export default function RegisterForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // handle errors 
    const [error, setError] = useState("");

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('completa campos');
            return;
        }
        try {
            const response = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (response.ok) {
                const form = e.target;
                router.push("/loginPage")
                form.reset();
            } else {
                console.log('Registro fallido')
            }
        } catch (error) {
            console.log('Error', error)
        }
    }



    return (
        <div className="grid place-items-center bg-gradient-to-b from-blue-800 to-blue-400 h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 bg-white border-blue-900">
                <h1 className="text-xl font-bold my-4">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        className="p-2"
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                    />
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
                        Register
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className="text-sm mt-3 text-right" href={"/loginPage"}>
                        Already have an account? <span className="underline text-blue-900">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}