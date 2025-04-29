import { createContext, useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    let authToken = localStorage.getItem("authToken");
    let presAuthToken = JSON.parse(authToken);
    let decodedToken = authToken ?jwtDecode(presAuthToken.access): null;
    const [user, setUser] = useState(authToken? decodedToken: null);
    

    const handleSignUp = async (e, first_name, email, password, userType) => {
        e.preventDefault();
        const is_buyer = userType === 'buyer' ? true : false;
        const is_agent = userType === 'agent' ? true : false;

        try {
            const response = await fetch('http://localhost:8000/api/auth/sign-up/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: first_name,
                    email: email,
                    password: password,
                    is_buyer: is_buyer,
                    is_agent: is_agent,
                }),
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }

        }catch (err) {
            alert(err)
        }
    }

    const handleLogin = async (e, email, password) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("authToken", JSON.stringify(data));
                setUser(jwtDecode(data.access));
            }

            } catch (err) {
                alert(err)
            }
    }

    useEffect(() => {
        const updateToken = async () => {
          const authToken = localStorage.getItem("authToken");
          if (!authToken) return;
      
          const parsedToken = JSON.parse(authToken);
          const refresh_token = parsedToken?.refresh;
      
          if (!refresh_token) return;
      
          try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/update-token/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refresh_token: refresh_token,
              }),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log("Updated Token:", data);
              localStorage.setItem("authToken", JSON.stringify(data));
              setUser(jwtDecode(data.access));
            } else {
              console.error("Failed to refresh token", await response.json());
            //   handleLogout();
            }
          } catch (err) {
            console.log("Token refresh failed: " + err.message);
            // handleLogout();
          }
        };
      
        updateToken();
      
        const interval = setInterval(() => {
          updateToken();
        }, 240000);
      
        return () => clearInterval(interval);
      }, []);
      
    const handleLogout = async () => {
        localStorage.removeItem("authToken");
        setUser(null);
    }

    
    const handleForgotPassword = async (e, email) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/forgot-password/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                alert("check your email");
            } else {
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const handleEditProfile = async (e, firstName, lastName, email, phone) => {
        e.preventDefault();
    
        const dataToSend = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
        };
    
        console.log("Request Payload:", dataToSend); 
        
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/edit-profile/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${presAuthToken.access}`,  
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("authToken", JSON.stringify(data));
                setUser(jwtDecode(data.access));
            } else {
                const errorData = await response.json();
                console.error("Failed to update profile:", errorData);
                alert("Failed to update profile: " + errorData.message);  
            }
        } catch (err) {
            console.log("Error:", err);
            alert("An error occurred: " + err.message);
        }
    };
    

    const handleUploadProfilePicture = async (e, picture) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("profile_pic", picture);
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/upload-profile-picture/", {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${presAuthToken.access}`,  
                },
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("authToken", JSON.stringify(data));
                setUser(jwtDecode(data.access));   
                alert("Profile picture uploaded successfully");             
            } else {
                const errorData = await response.json();
                console.error("Failed to upload profile picture:", errorData.message);
                alert("Failed to upload profile picture: " + errorData.message);  
            }
        } catch (err) {
            console.log("Error:", err);
            alert("An error occurred: " + err.message);
        }
    }
    

    const handleChangePassword = async (e, currentPassword, newPassword, confirmPassword) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/change-password/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${presAuthToken.access}`,  
                },
                body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("authToken", JSON.stringify(data));
                setUser(jwtDecode(data.access));
                alert("Password changed successfully");
            } else {
                const errorData = await response.json();
                console.error("Failed to change password:", errorData.message);
                alert("Failed to change password: " + errorData.message);  
            }
        } catch (err) {
            console.log("Error:", err);
            alert("An error occurred: " + err.message);
        }
        }

        const [savedListingsList, setSavedListingsList] = useState([]);
        const [savedListings, setSavedListings] = useState({});  

        const getSavedListings = async() => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/listings/saved-listings', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${presAuthToken.access}`,
                    }
                })
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setSavedListingsList(data);
                }
    
    
            } catch(err) {
                console.log(err);
                
            }
        }
    

        const handleSaveListing = async (e, listing_id) => {
            e.preventDefault();
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/listings/save-listing/${listing_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${presAuthToken.access}`,
                    },
                    body: JSON.stringify({}),
                });
        
                if(response.ok) {
                    setSavedListings(prev => ({
                        ...prev,
                        [listing_id]: !prev[listing_id],
                    }));
                    getSavedListings();
                }
            } catch (err) {
                console.log(err);
            }
        };


        

    const contextData = {
        handleSignUp:handleSignUp,
        user:user,
        handleLogin:handleLogin,
        handleLogout:handleLogout,
        handleForgotPassword:handleForgotPassword,
        handleEditProfile:handleEditProfile,
        handleUploadProfilePicture:handleUploadProfilePicture,
        handleChangePassword:handleChangePassword,
        handleSaveListing:handleSaveListing,
        savedListings:savedListings,
        savedListingsList:savedListingsList,
        getSavedListings:getSavedListings
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}