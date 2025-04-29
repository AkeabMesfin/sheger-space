import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import { Link } from 'react-router-dom'
import LoginImage from '../assets/images/login-image.jpg'
import Logo from '../components/Logo.jsx'
import { useState, useContext } from 'react'
import AuthContext from "../context/AuthContext.jsx";

function SignUp() {

    const { handleSignUp } = useContext(AuthContext)
    const [userType, setUserType] = useState("buyer")

    const [first_name, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    

    return(
         <div className="flex flex-col w-full h-full p-8 gap-8 overflow-auto">
            <div className="w-full h-fit px-8 ">
                <Logo home={"var(--primary)"} s={"var(--background)"}/>
            </div>
        
            <div className='w-full h-full flex flex-wrap justify-evenly items-center gap-8 '>

                <div className='max-w-[600px] max-h-[600px] rounded-[32px] overflow-hidden max-[1024px]:order-2'>
                    <img src={LoginImage} alt="Login Image modern home" className='w-auto h-full object-cover'/>
                </div>
        
                <div className='bg-white flex flex-col p-7 gap-5 rounded-[28px] max-w-[340px] w-full max-[1024px]:order-1'>
                    <div className='w-fit h-fit text-(--text)'>
                        <h3 className='font-bold'>Sign up</h3>
                        <p>Get Closer to Your Dream Home</p>
                    </div>
        
                    <form className='flex flex-col gap-4 text-(--text)' onSubmit={(e) => handleSignUp(e, first_name, email, password, userType )}>
        
                        <Input placeholder={"Name"} type={"text"} name={"first_name"} className="input primary"  value={first_name} onChange={(e) => setFirstName(e.target.value)}/>

                        <Input placeholder={"Email"} type={"Email"} name={"email"} className="input primary" value={email} onChange={(e) => setEmail(e.target.value)}/>

                        <div className="primary-radio flex flex-wrap gap-4 justify-between">
                            <input type="radio" name="user-type" value={"buyer"} id="buyer" checked={userType === "buyer"} onChange={(e) => setUserType(e.target.value)} />
                            <label htmlFor="buyer">Buyer</label>

                            <input type="radio" name="user-type" id="agent" value={"agent"} checked={userType === "agent"} onChange={(e) => setUserType(e.target.value)}/>
                            <label htmlFor="agent">Agent</label>
                        </div>

        
                        <Input placeholder={"Password"} type={"Password"} name={"Password"} className="input primary" value={password} onChange={(e) => setPassword(e.target.value)}/>
        
                        <p>
                            <span>
        
                                Already have an account? {""}
        
                                <Link to={"/login"}>
        
                                    <Button text={"Login"} className={"btn link text-(--accent)"}/>
        
                                </Link>
                            </span>
        
                        </p>
        
                        <Button text={"Sign up"} className={"btn primary"}/>
        
                    </form>
        
                    <div className="flex flex-row w-full h-fit justify-center items-center gap-2 text-(--text)">
                        <hr className='line grow-1'/>
                        <p>OR</p>
                        <hr className='line grow-1'/>
                    </div>
        
                            <Button 
                                text={
                                    <span className='flex flex-row items-center justify-center gap-3'>
                                        <svg
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 256 262"
                                            xmlns="http://www.w3.org/2000/svg"
                                            preserveAspectRatio="xMidYMid"
                                        >
                                            <path
                                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                            fill="#4285F4"
                                            />
                                            <path
                                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                            fill="#34A853"
                                            />
                                            <path
                                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                            fill="#FBBC05"
                                            />
                                            <path
                                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                            fill="#EB4335"
                                            />
                                        </svg>
                                        Sign up with Google
                                    </span>
                                }
                                className={"btn secondary"}
                                />
        
                </div>
        

        
            </div>
        
        </div>
    )
}

export default SignUp;