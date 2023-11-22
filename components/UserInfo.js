
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function UserInfo({ session }) {

  const router = useRouter();
  const [userLog, setUserLog] = useState('');

  async function logout() {
    await router.push('/loginPage');
    await signOut();
  }

  useEffect(() => {
    getUserAuth();
  }, []);

  const getUserAuth = async () => {
    try {
      const response = await axios.get('/api/userAuth')
      setUserLog(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(userLog)


  return (
    <>
      <div className="text-black flex gap-2 justify-between items-center shadow-md p-4 mb-3">
        <Link className="bg-blue-400 rounded-lg text-white font-bold p-2" href={"/editUserPage"} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </Link>
        <div className=" flex items-center gap-2" >
          <button>
            <Link className="bg-blue-400 rounded-lg text-white font-bold p-2" href={"/newPostPage"} >
              New Post
            </Link>
          </button>
          Hola <span className="font-bold"> {session?.user?.name}</span>
          <button
            onClick={logout}
            className="bg-red-400 rounded-lg text-white font-bold p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
      </div>
    </>

  );
}