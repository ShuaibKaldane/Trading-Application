import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './landing_page/home/HomePage'
import PricingPage from "./landing_page/pricing/PricingPage"
import SignupPage from "./landing_page/signup/Signup"
import ProductPage from "./landing_page/product/Product"
import AboutPage from "./landing_page/about/AboutPage"
import SupportPage from "./landing_page/support/SupportPage"
import Navbar from './Navbar';
import Footer from './Footer';
import NotFound from './landing_page/NotFound';
import LoginPage from "./landing_page/login/Login"

function App() {
  

  return (
    <>
    <Navbar/>
       <Routes>
          <Route path='/' element = {<HomePage/>}/>
          <Route path='/signup' element = {<SignupPage/>}/>
          <Route path='/login' element = {<LoginPage/>}/>
          <Route path='/product' element = {<ProductPage/>}/>
          <Route path='/about' element = {<AboutPage/>}/>
          <Route path='/pricing' element = {<PricingPage/>}/>
          <Route path='/support' element = {<SupportPage/>}/>
          <Route path='*' element = {<NotFound/>}/>
        </Routes>
        <Footer/>
    </>
  )
}

export default App
