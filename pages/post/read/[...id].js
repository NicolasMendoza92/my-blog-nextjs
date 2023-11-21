import Layout from '@/components/Layout'
import ReadPost from '@/components/ReadPost';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function ReadPostPage() {

  // traemos la informacion del producto 
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  // traemos la propiedad id, de router.query, ya que nos fiamos previamente con un console log donde estaba el file [...id]  que creamos con console.log({router});
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get('/api/post?id=' + id).then(response => {
      setPostInfo(response.data);
      setIsLoading(false);
    })
  }, [id]);

  function goBack() {
    router.push('/');
  }

  return (
    <Layout>
      <div className="flex justify-end content-center">
        <button onClick={goBack} className='bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        </button>
      </div>
      <ReadPost {...postInfo} />
    </Layout>
  )
}
