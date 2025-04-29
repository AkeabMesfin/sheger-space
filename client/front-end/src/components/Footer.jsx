import Logo from "./Logo.jsx";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="w-full bg-(--accent)">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                id="visual"
                version="1.1"
                viewBox="0 0 900 200"
                className="w-fit"
                >
                <path
                fill="var(--background)"
                strokeLinecap="round"
                d="m0 183 25-.8c25-.9 75-2.5 125-24.2s100-63.3 150-79.3 100-6.4 150 13C500 111 550 140 600 137s100-38 150-53.7c50-15.6 100-12 125-10.1l25 1.8V0H0Z"
                ></path>
            </svg>

            <div className="w-full h-fit p-8">
                <div className="flex flex-wrap justify-between items-start gap-8">
                    <div className="flex flex-col max-w-[400px] gap-3">
                        <div className="flex flex-row gap-1 items-start">
                            <Logo home={"#f1f3f4"} s={"#3b4876"}/>
                            <h3 className="font-extrabold text-(--background)">heger Space</h3>
                        </div>
                        <p className="font-medium text-(--background)">Your trusted platform for buying, renting, and selling properties.</p>
                    </div>

                    <div className="flex flex-col gap-4 text-(--background)">
                        <h3 className="font-bold">Company</h3>

                        <div className="flex flex-col gap-3">
                            <p className="hover:underline cursor-pointer w-fit">About Us</p>
                            <p className="hover:underline cursor-pointer w-fit">Contact Us</p>
                            <p className="hover:underline cursor-pointer w-fit">Terms & Conditions</p>
                            <Link to={'/privacy-policy'}><p className="hover:underline cursor-pointer w-fit" >Privacy Policy</p></Link>
                            <p className="hover:underline cursor-pointer w-fit">FAQ</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-(--background)">
                        <h3 className="font-bold">Social</h3>

                        <div className="flex flex-col gap-3">
                            <p className="hover:underline cursor-pointer w-fit">X</p>
                            <p className="hover:underline cursor-pointer w-fit">Facebook</p>
                            <p className="hover:underline cursor-pointer w-fit"><a href="https://github.com/AkeabMesfin">Github</a></p>
                        </div>
                    </div>

                </div>
            </div>
         
        </div>
    )
}

export default Footer;