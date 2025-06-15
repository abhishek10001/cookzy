// npm install -D tailwindcss@3.4.1 postcss autoprefixer  for tailwind npx tailwind init

import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import MyBookings from "./Pages/MyBookings";
import Bookings from "./Pages/Bookings";
import Contact from "./Pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cooks from "./Pages/Cooks";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <>
    <Navbar/>
    <div className=" mt-28">
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cooks" element={<Cooks />} />
        <Route path="/cooks/:speciality" element={<Cooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="bookings/:cookId" element={<Bookings />} />
      </Routes>
      
    </div>
    <Footer/>
    <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
