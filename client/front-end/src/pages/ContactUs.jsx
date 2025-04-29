import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import { Link} from 'react-router-dom'
import LoginImage from '../assets/images/login-image.jpg'
import { useState, useContext, useRef, useEffect } from 'react'
import AuthContext from '../context/AuthContext.jsx'
import Header from '../components/Header.jsx'
import BlankProfile from '../assets/images/blank-pp.png'
import Footer from '../components/Footer.jsx'

function ContactUs() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const { user, handleLogout } = useContext(AuthContext)
    const [picture, setPicture] = useState(user.profile_pic ? `http://127.0.0.1:8000${user.profile_pic}` : BlankProfile);
    

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };



    }, []);

    return (
        <div className="flex flex-col w-full h-full pt-8 gap-8 overflow-auto">
            <Header children={
                <div className="relative" ref={profileRef}>
                    <div 
                        className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border-1 border-(--secondary)"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img src={picture} alt="Blank Profile" />
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 bg-white z-50 p-5 rounded-[20px] mt-3 w-[200px] gap-7 flex flex-col">
                            <div className="w-fill flex flex-row items-center justify-center gap-3 font-bold" >
                                <div className="w-10 h-10 rounded-full overflow-hidden border-1 border-(--secondary)">
                                    <img src={picture} alt="Blank Profile" />
                                </div>
                                
                                {user && <p className="capitalize">{user.first_name} {" "} {user.last_name} </p> }
                            </div>

                            <hr className="border-1 border-(--secondary)"/>

                            <div className="flex flex-col gap-3 text-left font-medium">
                                <Link to={"/dashboard"}>
                                    <Button text={"Dashboard"} className={"btn link text-(--text)"}/>
                                </Link>
                                {user && user.is_agent &&
                                    <Link to={"/dashboard/your-listings"}>
                                        <Button text={"Your Listings"} className={"btn link text-(--text)"}/>
                                    </Link>
                                }
                                <Link to={"/dashboard/saved-listings"}>
                                    <Button text={"Saved Listings"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/dashboard/account"}>
                                    <Button text={"Account"} className={"btn link text-(--text)"}/>
                                </Link>

                            </div>

                            <div className="flex flex-col gap-3 text-left font-medium items-start">
                                {user && user.is_agent &&
                                    <Link to={"/add-listing"}>
                                        <Button text={"Add Listing"} className={"btn link text-(--primary)"}/>
                                    </Link>
                                }


                                
                                <Button text={"Logout"} className={"btn link logout text-red-600 "} onClick={()=> handleLogout()}/>

                            </div>

                        </div>
                    )}
                </div>
            } />

            <div className='w-full h-full flex flex-wrap justify-evenly items-center gap-8 px-8'>

                <div className='bg-white flex flex-col p-7 gap-5 rounded-[28px] max-w-[400px] w-full '>
                    
                    <div className='w-fit h-fit text-(--text)'>
                        <h3 className='font-bold'>Contact Us</h3>
                    </div>

                    <form className='flex flex-col gap-4 text-(--text)' >
                        <Input placeholder={"Name"} type={"text"} name={"name"} className="input primary" />

                        <Input placeholder={"Email"} type={"Email"} name={"email"} className="input primary" />

                        <textarea name="reason" placeholder='write here the reason' className='input primary h-[100px] max-h-[200px] '></textarea>
                        <Button text={"Login"} className={"btn primary"} type="submit"/>

                        </form>




                </div>

                <div className='max-w-[600px] max-h-[600px] rounded-[32px] overflow-hidden '>
                    <img src={LoginImage} alt="Login Image modern home" className='w-auto h-full object-cover'/>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default ContactUs;