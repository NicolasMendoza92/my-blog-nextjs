import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import Editor from './Editor';


export default function NewPostForm({
    _id,
    title: exisingTitle,
    summary: exisingSummary,
    content: exisingContent,
    cover: exisingCover,
}) {

    const router = useRouter();
    // esto hace como una validacion a ver si existe cuenta. 
    const { data: session } = useSession();

    const [title, setTitle] = useState(exisingTitle || '');
    const [summary, setSummary] = useState(exisingSummary || '');
    const [content, setContent] = useState(exisingContent || '');
    const [cover, setCover] = useState(exisingCover || []);

    const [isUploading, setIsUploading] = useState(false);

    async function createNewPost(e) {
        try {
            e.preventDefault();
            const data = { title, summary, cover, content, author: session?.user.email }
            if (_id) {
                //update
                await axios.put('/api/post', { ...data, _id });
            } else {
                //create
                const res = await axios.post('/api/post', data);
            }
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    // solo saco la imagen del array images usando filter, y si el valor link es igual al del click, entonces seteo las imagenes, con la nueva lista
    function deleteFile(e, link) {
        e.preventDefault()
        try {
            Swal.fire({
                title: 'Estas seguro?',
                text: `Quiere borrar este archivo?`,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, borrar!',
                confirmButtonColor: '#d55',
                reverseButtons: true,
            }).then(async result => {
                // hacemos console log del result y vemos que opcion es cada una. 
                if (result.isConfirmed) {
                    const newOnesFiles = cover.filter(value => value !== link)
                    setCover(newOnesFiles)
                }
            });

        } catch (error) {
            console.log(error)
        }
    }

    // CONEXION CON API PARA SUBIR IMAGENES 
    async function uploadFiles(e) {
        e.preventDefault()
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setCover(oldFiles => {
                return [...oldFiles, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    return (
        <form className="d-flex flex-column" onSubmit={createNewPost} >
            <div>
                <input
                    type="title"
                    className="m-2"
                    placeholder={'Title'}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <input
                    type="summary"
                    className="m-2"
                    placeholder={'Summary'}
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                />
                <p>Cover image</p>
                <div className='mb-2 flex flex-wrap gap-1 items-center'>
                    {!!cover?.length && cover.map(link => (
                        <div key={link} className=" flex h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                            <img src={link} alt="" className="rounded-lg" />
                            <span onClick={e => deleteFile(e, link)} className="swym-delete-img">x</span>
                        </div>
                    ))}
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            Loading...
                        </div>
                    )}
                    <label className="w-20 h-20 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 rounded-sm bg-white shadow-sm border border text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload file
                        </div>
                        <input type="file" onChange={uploadFiles} className="hidden" />
                    </label>
                </div>
                <Editor value={content} onChange={setContent} />

            </div>
            <button className='bg-blue-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-blue-500' type='sumbit' style={{ marginTop: '5px' }}>Create post</button>
        </form>
    );
}
