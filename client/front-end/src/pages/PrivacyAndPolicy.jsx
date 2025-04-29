import LoginImage from '../assets/images/login-image.jpg'
import Footer from '../components/Footer.jsx'

function PrivacyAndPolicy() {

    return (
        <div className="flex flex-col w-full h-full pt-8 gap-8 overflow-auto">

            <div className='w-full h-full flex flex-wrap justify-evenly items-center gap-8 px-8'>

                   
                <div className='w-full h-fit max-w-[600px]' >
                    <h2>Privacy And Policy</h2>

                    <p>
                    Welcome to Sheger-Space! We are committed to protecting your personal information and your right to privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                    </p>

                    <h3>Information We Collect</h3>
                    <p>
                    We may collect the following types of information:
                    </p>
                    <ul>
                        <li>Personal Information: such as your name, email address, phone number, and location.</li>
                        <li>Property Preferences: such as types of properties you’re interested in.</li>
                    </ul>

                </div>

   

                <div className='max-w-[600px] max-h-[600px] rounded-[32px] overflow-hidden '>
                    <img src={LoginImage} alt="Login Image modern home" className='w-auto h-full object-cover'/>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default PrivacyAndPolicy;