import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Landing/Landing";
import Home from "./Components/Home/Home.jsx";
import Groceries from "./Components/Groceries/Groceries.jsx";
import Details from "./Components/Details/Details.jsx";
import Receipt from "./Components/Receipt/Receipt.jsx";
import { CartProvider } from './Context/CartContext';
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import "./App.css"
import Profile from "./Components/Profile/Profile";
import EnterToken from "./Components/ResetPassword/EnterToken";

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/groceries" element={<Groceries />} />
        <Route path='/movies/:id' element={<Details movies="movies"/>} />
        <Route path='/upcoming/:id' element={<Details movies="upcoming"/>} />
        <Route path='/toprated/:id' element={<Details movies="toprated"/>} />
        <Route path='/payment' element={<Receipt/>} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<SignUp />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/entertoken' element={<EnterToken />} />
        <Route path='/account' element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
