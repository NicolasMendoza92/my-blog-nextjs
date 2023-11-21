import Layout from '@/components/Layout'
import NewPostForm from '@/components/NewPostForm'
import { useRouter } from 'next/router';

export default function newPostPage() {

    const router = useRouter();

    function goBack() {
        router.push('/');
    }

    return (
        <Layout>
             <div className="flex justify-between content-center">
                <div>
                    <p className='title-page text-blue-600'> New Post Page </p>
                </div>
                <div>
                    <button onClick={goBack} className='bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </button>
                </div>
            </div>
            <NewPostForm/>
        </Layout>
    )
}
