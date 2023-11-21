
import { useRouter } from 'next/router'
import React from 'react'

export default function PostCard({ ...post }) {

    const router = useRouter()


    async function readPost(e, id) {
        e.preventDefault()
        try {
            router.push('/post/read/' + id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex'>
            <div className="board-card" onClick={(e) => readPost(e, post._id)}  >
                <img src={post.cover[0]} alt="" className="rounded-lg" />
                <p className="board-title">{post.title}</p>
                <div className="board-summary">{post.summary}</div>
                <div className="board-data">
                    <span>Author: {post.author}</span>
                    <span>Published: {(new Date(post.createdAt)).toLocaleString(
                        "en-US", { dateStyle: "short" }
                    )}</span>
                </div>

            </div>
        </div>
    )
}
