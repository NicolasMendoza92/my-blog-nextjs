import Navbar from './Navbar';

export default function Layout({children }) {

    return (
        <div className=" min-h-screen ">
            <Navbar/>
            <div className="bg-white flex-grow ms-2 mt-2 mr-2 mb-3 rounded-lg p-4 ">
                {children}
            </div>
        </div>
    )
}
