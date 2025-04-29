import { Link } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";

function NotFound() {
    return (
        <div className="flex flex-col w-full h-full overflow-auto">
            <div className=" w-full min-h-full flex flex-col items-center justify-center gap-3 p-8">
                <div className="flex flex-col">
                    <h1 className="font-extrabold text-(--text)">404</h1>
                    <p className="font-medium text-(--text)">Page Not Found</p>
                </div>

                <Link to={'/'}>
                    <Button type={"button"} className={"btn secondary"} text={"Go Home"}/>
                </Link>
            </div>

            <Footer/>
        </div>
    )
}

export default NotFound;