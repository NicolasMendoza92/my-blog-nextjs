import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MyPostCard from '@/components/MyPostCard';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import UserInfo from '@/components/UserInfo';



export default function profilePage() {

    const { data: session } = useSession();
    const router = useRouter();

    function goToLogin() {
        router.push('/loginPage')
      }

    const [myPosts, setMyPosts] = useState('');

    useEffect(() => {
        getMyPosts();
    }, []);

    const getMyPosts = async () => {
        try {
            const response = await axios.get('/api/profile')
            setMyPosts(response.data.posts)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            {!session &&
                <div className="flex flex-col text-center justify-center m-auto w-64 gap-2">
                    <h1>User not logged</h1>
                    <h1>Please login to make a post</h1>
                    <button className="bg-blue-400 rounded-lg text-white font-bold p-2" onClick={goToLogin}> Login </button>
                </div>
            }
            {session &&
                <>
                    <UserInfo session={session}/>
                    <p className='text-blue-600 text-center'>My Posts</p>
                    {myPosts?.length === 0 && (
                        <div className='text-center'>
                            You not posted yet.
                        </div>
                    )}
                    <div className="board-grid">
                        {myPosts.length > 0 && myPosts.map(post => (
                            <MyPostCard key={post._id} {...post} />
                        ))}
                    </div>
                </>
            }
        </Layout>
    )
}
