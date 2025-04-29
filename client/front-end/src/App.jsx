import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx'
import Listings from './pages/Listings.Jsx';
import AddListing from './pages/AddListing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import EditListing from './pages/EditListing.jsx'
import ListingDetails from './pages/ListingDetails.jsx'
import SavedListings from './pages/SavedListings.jsx'
import YourListings from './pages/YourListings.jsx'
import Account from './pages/Account.jsx'
import NotFound from './pages/NotFound.jsx'
import VerifyAccount from './pages/VerifyAccount.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import VerifyAccountPage from './pages/VerifyAccountPage.jsx';
import PrivateRoute from './context/PrivateRoute.jsx';
import PublicRoute from './context/PublicRoute.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ContactUs from './pages/ContactUs.jsx';
import PrivacyAndPolicy from './pages/PrivacyAndPolicy.jsx';

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/verify-account" element={<VerifyAccount />} />
            <Route path="/verify-account/:uid/:token" element={<VerifyAccountPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/listings" element={<Listings />} />
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-listing/:uid" element={<EditListing />} />
            <Route path="/listing-details/:uid" element={<ListingDetails />} />
            <Route path="/dashboard/saved-listings" element={<SavedListings />} />
            <Route path="/dashboard/your-listings" element={<YourListings />} />
            <Route path="/dashboard/account" element={<Account />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/contact-us' element={ <ContactUs />}/>
          <Route path='/privacy-policy' element={ <PrivacyAndPolicy />}/>
        </Routes>
      </AuthProvider>
    </Router>

  )
}

export default App;
