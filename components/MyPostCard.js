import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import Swal from 'sweetalert2';

export default function MyPostCard({ ...post }) {

    
    const router = useRouter()

    async function readPost(e, id) {
        e.preventDefault()
        try {
            router.push('/post/read/' + id)
        } catch (error) {
            console.log(error)
        }
    }
    
    function deletePost(e, id) {
        e.preventDefault()
        try {
            Swal.fire({
                title: 'Estas seguro?',
                text: `Quiere borrar este post?`,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, borrar!',
                confirmButtonColor: '#d55',
                reverseButtons: true,
            }).then(async result => {
                // hacemos console log del result y vemos que opcion es cada una. 
                if (result.isConfirmed) {
                    const response = await axios.delete('/api/post?id=' + id);
                    router.push('/profilePage')
                }
            });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex'>
            <div className="board-card" onClick={(e) => readPost(e, post._id)}>
                <img src={post.cover[0]} alt="" className="rounded-lg" />
                <h3 className="board-title ">{post.title}</h3>
                <div className="board-number">{post.summary}</div>
                <div className="board-number">{post.author}</div>
                <button className='bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200'>
                    <Link  href={'/post/edit/' + post._id}>
                        Editar
                    </Link>
                </button>
                <button className="bg-red-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-red-200" onClick={(e) => deletePost(e, post._id)} >
                        Borrar
                </button>
            </div>
        </div>
    )
}
