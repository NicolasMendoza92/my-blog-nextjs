import React from 'react'
import PostCard from './PostCard'

export default function PostsGrid({ posts }) {


    return (
        <div>
            {posts?.length === 0 && (
                <div className=" text-center p-2">
                    <p className='m-0'> Not post published yet</p>
                </div>
            )}
            <div className="board-grid">
                {posts?.length > 0 && posts.map(post => (
                    <PostCard key={post._id} {...post} />
                ))}
            </div>
        </div>
    )
}
