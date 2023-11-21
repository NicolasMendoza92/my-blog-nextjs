import React from 'react'

export default function ReadPost({ _id, title, summary, cover, author, content, createdAt }) {

    return (
        <div className='container m-auto'>
            <div>
                <img src={cover} alt="" className="rounded-lg m-auto mt-3" />
            </div>
            <div className='flex flex-col mx-5 my-2 gap-2'>
                <p><b className='text-blue-600'>Author:</b> {author}</p>
                <p><b className='text-blue-600'> Published:</b> {(new Date(createdAt)).toLocaleString(
                    "en-US", { dateStyle: "short" }
                )}</p>
            </div>
            <div className='gap-2 mb-3'>
                <p className='title'>{title}</p>
                <p>{summary}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        </div >
    )
}
