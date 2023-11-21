import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import 'react-quill/dist/quill.snow.css'
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';

export default function App({
    Component, pageProps: { session, ...pageProps }
}) {

    return (
        <>
            <Head>
                <title>My blog page</title>
            </Head>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}
