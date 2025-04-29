import Header from "../components/Header.jsx";
import { useState, useRef, useEffect, useContext } from "react";
import Button from "../components/Button.jsx";
import BlankProfile from "../assets/images/blank-pp.png"
import { Link, useParams } from 'react-router-dom'
import Footer from "../components/Footer.jsx";
import Input from "../components/Input.jsx";
import AuthContext from "../context/AuthContext.jsx";

function EditListing() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const { uid } = useParams();
    const { user, handleLogout} = useContext(AuthContext)
    const [picture, setPicture] = useState(user.profile_pic ? `http://127.0.0.1:8000${user.profile_pic}` : BlankProfile);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [id, setId] = useState('');
    
    let authToken = localStorage.getItem("authToken");
    let presAuthToken = JSON.parse(authToken);  
    console.log(presAuthToken);
      

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


    useEffect(() => {
        ListingDetails();
    }, [])

    const ListingDetails = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/listing/listing-details/${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json'
                }
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            
                const phoneStr = data.phone.toString();
                const cleanedPhone = phoneStr.startsWith('251') ? phoneStr.slice(3) : phoneStr;
            
                setTitle(data.title);
                setLocation(data.location);
                setPhone(cleanedPhone);
                setPrice(data.price);
                setDescription(data.description);
                setImage1(`http://127.0.0.1:8000${data.image_1}`);
                setImage2(`http://127.0.0.1:8000${data.image_2}`);
                setImage3(`http://127.0.0.1:8000${data.image_3}`);
                setId(data.id);
            }
            
            
        } catch(err) {
            console.log(err);
        }
    }



    const [phoneError, setPhoneError] = useState('');
    const validatePhoneNumber = (e) => {
        const value = e.target.value;
        setPhone(value);
    
        const phoneStr = value.toString();
        const startsCorrectly = phoneStr.startsWith('09') || phoneStr.startsWith('07') || phoneStr.startsWith('9') || phoneStr.startsWith('7');
        const correctLength = phoneStr.length === 9 || phoneStr.length === 10; // 9 or 10 digits (depending on whether user types 0)
    
        if (!startsCorrectly || !correctLength) {
          setPhoneError("Invalid phone number");
        } else {
          setPhoneError("");
        }
      };

      const editListing = async (e, title, location, phone, price, description, image1, image2, image3) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('phone', phone);
        formData.append('price', price);
        formData.append('description', description);

        if (image1 && image1 instanceof File) formData.append('image_1', image1);
        if (image2 && image2 instanceof File) formData.append('image_2', image2);
        if (image3 && image3 instanceof File) formData.append('image_3', image3);

        console.log();
        

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/listing/edit-listing/${uid}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${presAuthToken.access}`,
                },
                body: formData,
              });

            if(response.ok) {
                const data = await response.json()
                console.log(data);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const [image1Pre, setImage1Pre] = useState(null);
    const [image2Pre, setImage2Pre] = useState(null);
    const [image3Pre, setImage3Pre] = useState(null);

      

    return (
        <div className="w-full pt-8 overflow-auto gap-8 flex flex-col h-full">
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
                                
                                {user && <p>{user.first_name} {" "} {user.last_name} </p> }
                            </div>

                            <hr className="border-1 border-(--secondary)"/>

                            <div className="flex flex-col gap-3 text-left font-medium">
                                <Link to={"/dashboard"}>
                                    <Button text={"Dashboard"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/dashboard/your-listings"}>
                                    <Button text={"Your Listings"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/dashboard/saved-listings"}>
                                    <Button text={"Saved Listings"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/dashboard/account"}>
                                    <Button text={"Account"} className={"btn link text-(--text)"}/>
                                </Link>

                            </div>

                            <div className="flex flex-col gap-3 text-left font-medium items-start">
                                <Link to={"/add-listing"}>
                                    <Button text={"Add Listing"} className={"btn link text-(--primary)"}/>
                                </Link>

                                
                                <Button text={"Logout"} className={"btn link logout text-red-600 "} onClick={()=> handleLogout()}/>

                            </div>

                        </div>
                    )}
                </div>
            } />

            <form className="w-full h-fit flex flex-wrap gap-8 justify-evenly items-start px-8" onSubmit={(e) => editListing(e, title, location, phone, price, description, image1, image2, image3)}>

                <div  className="flex flex-wrap gap-6 w-full max-w-[680px] justify-evenly ">
                    <div   className="w-full rounded-3xl overflow-hidden h-[300px] min-w-[240px] relative">
                        <img
                        src={image1Pre? image1Pre : image1}
                        alt="Property 3"
                        className="w-full h-full object-cover opacity-60"
                        />
                        <Input  type="file" name="image_1" id="image_1" accept="image/*" onChange={(e) => {setImage1Pre(URL.createObjectURL(e.target.files[0])); setImage1(e.target.files[0])}} className="hidden"/>
                        <label htmlFor="image_1" className="w-full h-full absolute top-0 left-0 cursor-pointer flex items-center justify-center">                            
                            <div className="flex justify-center items-center flex-col text-center ">
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
                        </label>
                    </div>

                    <div   className="rounded-3xl overflow-hidden relative h-[300px] max-w-[320px] min-w-[240px] w-full">
                        <img
                        src={image2Pre ? image2Pre : image2}
                        alt="Property 1"
                        className="w-full h-full object-cover opacity-60"
                        />
                        <Input  type="file" name="image_2" id="image_2" accept="image/*" onChange={(e) => {setImage2Pre(URL.createObjectURL(e.target.files[0])); setImage2(e.target.files[0])}}  className="hidden"/>
                        <label htmlFor="image_2" className="w-full h-full absolute top-0 left-0 cursor-pointer flex items-center justify-center">                            
                            <div className="flex justify-center items-center flex-col text-center ">
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
                        </label>

                    </div>

                    <div   className="rounded-3xl overflow-hidden relative h-[300px] max-w-[320px] min-w-[240px] w-full">
                        <img
                        src={image3Pre? image3Pre : image3}
                        alt="Property 2"
                        className="w-full h-full object-cover opacity-60"
                        />
                        <Input  type="file" name="image_3" id="image_3" accept="image/*" onChange={(e) => {setImage3(e.target.files[0]); setImage3Pre(URL.createObjectURL(e.target.files[0]))}} className="hidden"/>
                        <label htmlFor="image_3" className="w-full h-full absolute top-0 left-0 cursor-pointer flex items-center justify-center">                            
                            <div className="flex justify-center items-center flex-col text-center ">
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
                        </label>
                    </div>

                </div>

                <div className="flex flex-col gap-4 max-w-[500px] w-full ">
                    <div className=" flex flex-col w-full">
                        <p className="font-bold">Title:</p>
                        <Input 
                            type="text" 
                            name="title" 
                            id="title"
                            className="input primary w-full min-w-[200px]"  
                            placeholder="title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                    </div>

                    <div className=" flex flex-col">
                        <p className="font-bold">Phone:</p>

                        <div className="flex flex-wrap gap-3 items-center justify-start">
                            <p>+251</p>

                            <Input 
                            type="number" 
                            name="phone" 
                            id="phoneNum" 
                                                
                            placeholder="Phone Number" 
                            className={`input primary grow-1 min-w-[200px] `}
                            value={phone} 
                            onChange={validatePhoneNumber}
                            />

                        </div>
                            {phoneError && (
                            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                            )}
                        
                    </div>

                    <div className=" flex flex-col">
                        <p className="font-bold">Location:</p>
                        <div className="gap-3 flex flex-wrap justify-start items-center">
                            <select name="Addis-Abeba" className="input primary w-fit text-center"  value={location} onChange={(e) => setLocation(e.target.value)}>
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
                        <div className="flex flex-wrap justify-start items-center gap-3">
                            <p>ETB</p>
                            <Input 
                                type="number" 
                                name="price" 
                                id="price" 
                                className="input primary grow-1 min-w-[200px]" 
                                placeholder="price" 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                />
                        </div>
  
                    </div>

                    <div className=" flex flex-col">
                        <p className="font-bold">Description:</p>
                        <textarea 
                            name="description" 
                            id="description" 
                            className="input primary grow-1 h-[200px]" 
                            placeholder="description" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={255}
                            />
                    </div>



                    <div className="w-full h-fit flex justify-between items-center">
                        <Link to={`/listing-details/${id}`}>
                            <Button text={"Cancel"} className={"btn territory"} />
                        </Link>

                        <Button text={"Save Changes"} className={"btn primary"}  type="submit"/>
                    </div>


                </div>


            </form>

            <Footer />

        </div>
    )
}

export default EditListing;