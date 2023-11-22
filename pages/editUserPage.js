import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function editUserPage() {

    const [picture, setPicture] = useState([]);
    const [name, setName] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            data = { name, picture }
            const response = await axios.put('api/register', data)

            if (response.ok) {
                const form = e.target;
                router.push("/profilePage")
            } else {
                console.log('Registro fallido')
            }
        } catch (error) {
            console.log('Error', error)
        }
    }


    // CONEXION CON API PARA SUBIR IMAGENES 
    async function uploadPic(e) {
        e.preventDefault()
        const files = e.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setPicture(oldFiles => {
                return [...oldFiles, ...res.data.links];
            });
        }
    }

    // solo saco la imagen del array images usando filter, y si el valor link es igual al del click, entonces seteo las imagenes, con la nueva lista
    function deletePic(e, link) {
        e.preventDefault()
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to delete this picture?`,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes, delete!',
                confirmButtonColor: '#d55',
                reverseButtons: true,
            }).then(async result => {
                // hacemos console log del result y vemos que opcion es cada una. 
                if (result.isConfirmed) {
                    const newOnesFiles = picture.filter(value => value !== link)
                    setPicture(newOnesFiles)
                }
            });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center m-auto gap-3">
                {!!picture?.length && picture.map(link => (
                    <div key={link} className=" flex h-20 bg-white p-4 ">
                        <img src={link} alt="" className="rounded-lg h-12 w-12" />
                        <div onClick={e => deletePic(e, link)} className="swym-edit-img">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                    </div>
                ))}
                {picture?.length === 0 && (
                    <label className="cursor-pointer text-center bg-white text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input type="file" onChange={uploadPic} className="hidden" />
                    </label>
                )}
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                />
                <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
                    Save changes
                </button>
            </form>
        </Layout>
    )
}
