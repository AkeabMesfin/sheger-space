import Header from "../components/Header.jsx";
import { useState, useRef, useEffect, useContext } from "react";
import Button from "../components/Button.jsx";
import BlankProfile from "../assets/images/blank-pp.png"
import { Link, useNavigate } from 'react-router-dom'
import Footer from "../components/Footer.jsx";
import AuthContext from "../context/AuthContext.jsx";

function AddListing() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    let authToken = localStorage.getItem("authToken");
    let presAuthToken = JSON.parse(authToken);
    const { user} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.is_agent) {
            navigate("/listings")
        }   
    })

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

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedImage3, setSelectedImage3] = useState(null);

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    };

        const [phoneError, setPhoneError] = useState('');
        const validatePhoneNumber = (e) => {
            const value = e.target.value;
            setPhone(value);
        
            const phoneStr = value.toString();
            const startsCorrectly = phoneStr.startsWith('09') || phoneStr.startsWith('07') || phoneStr.startsWith('9') || phoneStr.startsWith('7');
            const correctLength = phoneStr.length === 9 || phoneStr.length === 10; // 9 or 10 digits (depending on whether user types 0)
        
            if (!startsCorrectly || !correctLength) {
              setPhoneError("Invalid phone number");
            } 

            else {
              setPhoneError("");
            }
          };
      

    const addListing = async (e, title, location, phone, price, description, image1, image2, image3) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(user.user_id);
        
        formData.append('author', user.user_id);
        formData.append('title', title);
        formData.append('location', location);
        formData.append('phone', phone);
        formData.append('price', price);
        formData.append('description', description);
        if (image1) formData.append('image_1', image1);
        if (image2) formData.append('image_2', image2);
        if (image3) formData.append('image_3', image3);

        

        try {
            const response = await fetch('http://127.0.0.1:8000/api/listing/add-listing/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${presAuthToken.access}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full pt-8 gap-8 flex flex-col h-full overflow-auto">
            <Header children={
                <div className="relative" ref={profileRef}>
                    <div 
                        className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border-1 border-(--secondary)"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img src={BlankProfile} alt="Blank Profile" />
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 bg-white z-50 p-5 rounded-[20px] mt-3 w-[200px] gap-7 flex flex-col">
                            <div className="w-fill flex flex-row items-center justify-center gap-3 font-bold" >
                                <div className="w-10 h-10 rounded-full overflow-hidden border-1 border-(--secondary)">
                                    <img src={BlankProfile} alt="Blank Profile" />
                                </div>
                                <p>Akeab Mesfin</p>
                            </div>

                            <hr className="border-1 border-(--secondary)"/>

                            <div className="flex flex-col gap-3 text-left font-medium">
                                <Link to={"/dashboard"}>
                                    <Button text={"Dashboard"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/your-listings"}>
                                    <Button text={"Your Listings"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/saved-listings"}>
                                    <Button text={"Saved Listings"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/account"}>
                                    <Button text={"Account"} className={"btn link text-(--text)"}/>
                                </Link>

                            </div>

                            <div className="flex flex-col gap-3 text-left font-medium">
                                <Link to={"/add-listing"}>
                                    <Button text={"Add Listing"} className={"btn link text-(--primary)"}/>
                                </Link>

                                <Link to={"/dashboard"}>
                                    <Button text={"Logout"} className={"btn link logout text-red-600 "}/>
                                </Link>

                            </div>

                        </div>
                    )}
                </div>
            } />

            <form className="w-full h-fit flex flex-wrap gap-8 justify-evenly items-start" onSubmit={(e) => addListing(e, title, location, phone, price, description, image1, image2, image3)}>

                <div  className="flex flex-wrap gap-6 w-full max-w-[680px] justify-evenly ">
                
                    <input
                        type="file"
                        accept="image/*"
                        id="image1"
                        className="hidden"
                        onChange={(e) => {handleImageChange(e, setSelectedImage1); setImage1(e.target.files[0])}}
                    />
                    <label htmlFor="image1"   className="w-full rounded-3xl overflow-hidden h-[300px] min-w-[240px] border-1 border-dashed flex items-center justify-center">
                        {selectedImage1 ? (
                            <img
                                src={selectedImage1}
                                alt="Preview 1"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex justify-center items-center flex-col text-center">

                            <span className="">
                                <svg
                                    width="80px"
                                    height="80px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                        d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z"
                                        stroke="var(--text)"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        ></path>
                                    </g>
                                </svg>
                            </span>

                            <span className="font-bold">
                                Choose an image
                            </span>

                            <span className="font-light">
                                Support JPG, PNG
                            </span>

                        </div>

                        )}

                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        id="image2"
                        className="hidden"
                        onChange={(e) => {handleImageChange(e, setSelectedImage2); setImage2(e.target.files[0])}}
                    />
                    <label htmlFor="image2"   className="rounded-3xl overflow-hidden relative h-[300px] max-w-[320px] min-w-[240px] w-full border-1 border-dashed flex items-center justify-center">
                        {selectedImage2 ? (
                            <img
                                src={selectedImage2}
                                alt="Preview 2"
                                className="w-full h-full object-cover"
                            />
                        ) : (
      
                            <div className="flex justify-center items-center flex-col text-center">
                            <span className="">
                                <svg
                                    width="80px"
                                    height="80px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                        d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z"
                                        stroke="var(--text)"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        ></path>
                                    </g>
                                </svg>
                            </span>

                            <span className="font-bold">
                                Choose an image
                            </span>

                            <span className="font-light">
                                Support JPG, PNG
                            </span>

                        </div>

                        )}

                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        id="image3"
                        className="hidden"
                        onChange={(e) => {handleImageChange(e, setSelectedImage3); setImage3(e.target.files[0])}}
                    />
                    <label htmlFor="image3"   className="rounded-3xl overflow-hidden relative h-[300px] max-w-[320px] min-w-[240px] w-full border-1 border-dashed flex items-center justify-center">
                        {selectedImage3 ? (
                            <img
                                src={selectedImage3}
                                alt="Preview 3"
                                className="w-full h-full object-cover"
                            />
                        ) : (
 
                            <div className="flex justify-center items-center flex-col text-center">
                            <span className="">
                                <svg
                                    width="80px"
                                    height="80px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                        d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z"
                                        stroke="var(--text)"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        ></path>
                                    </g>
                                </svg>
                            </span>

                            <span className="font-bold">
                                Choose an image
                            </span>

                            <span className="font-light">
                                Support JPG, PNG
                            </span>

                        </div>
                        )}
                    </label>

                </div>

                <div className="flex flex-col gap-4 max-w-[500px] w-full ">
                    <div className=" flex flex-col ">
                        <p className="font-bold">Title:</p>
                        <input type="text" name="title" id="title" className="input primary min-w-[200px]" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className=" flex flex-col">
                        <p className="font-bold">Phone:</p>
                        <div className="flex flex-wrap gap-3 w-full items-center">
                            <span className="font-bold">+251</span>
                            <input type="number" name="phone" id="phone" className="input primary grow-1 min-w-[200px]" placeholder="Phone ex: 912345678 or 712345678" onChange={validatePhoneNumber}/>
                        </div>
                        {phoneError && (
                            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                            )}
                    </div>

                    <div className=" flex flex-col">
                        <p className="font-bold">Location:</p>
                        <div className="gap-3 flex flex-wrap justify-start items-center">
                            <select name="Addis-Abeba" className="input primary w-fit text-center"  onChange={(e) => setLocation(e.target.value)}>
                                    <option value=" ">--Select--</option>
                                    <option value="AddisKetema">Addis Ketema</option>
                                    <option value="AkakyKaliti">Akaky Kaliti</option>
                                    <option value="Arada">Arada</option>
                                    <option value="Bole">Bole</option>
                                    <option value="Gullele">Gullele</option>
                                    <option value="Kirkos">Kirkos</option>
                                    <option value="KolfeKeranio">Kolfe Keranio</option>
                                    <option value="Lideta">Lideta</option>
                                    <option value="NifasSilkLafto">Nifas Silk-Lafto</option>
                                    <option value="Yeka">Yeka</option>
                            </select>

                            <p>, Addis Abeba</p>
                        </div>
                    </div>

                    <div className=" flex flex-col">
                        <p className="font-bold">Price:</p>
                        <div className="flex flex-wrap gap-3 justify-start items-center">
                            <p>ETB</p>
                            <input type="number" name="price" id="price" className="input primary grow-1 min-w-[200px]" placeholder="Price" onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                    </div>


                    <div className=" flex flex-col">
                        <p className="font-bold">Description:</p>
                        <textarea name="description" id="description" className="input primary w-full min-w-[200px]  h-[200px]" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="w-full h-fit flex justify-center items-center">
                        <Button text={"Publish"} className={"btn primary"}  type={"submit"}/>

                    </div>


                </div>


            </form>

            <Footer />

        </div>
    )
}

export default AddListing;