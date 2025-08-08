// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils/utils.js';
// import { ToastContainer } from 'react-toastify';

import Navbar from "../Components/Navbar.jsx"
import AllQuestions from '../Components/AllPosts';
import Footer from "../Components/Footer.jsx";
import AllPosts from "../Components/AllPosts";
// import Slider from "../Components/Slider.jsx"

function Home() {
    

    return (
        <div>
<Navbar/>
<AllPosts/>
<Footer/>
{/* <Slider/> */}
        </div>
    )
}

export default Home