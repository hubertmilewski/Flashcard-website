import {Outlet} from "react-router-dom"; 
import Footer from './Footer'; 

export default function DefaultLayout() {
    return (
        <div className="text-white">
            <Outlet />
            <Footer />
        </div>
    );
}