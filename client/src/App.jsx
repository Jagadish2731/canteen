import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import HelpSupport from "./pages/HelpSupport"; 
import Contact from "./pages/Contact";// ✅ Import
import TermsCondition from "./pages/TermsCondition";
import About from "./pages/about";
function App() {
  return (
    <Routes>
      <Route path="/"          element={<Home />}     />
      <Route path="/favorites" element={<Favorite />} />
      <Route path="/orders"    element={<Order />}    />
      <Route path="/cart"      element={<Cart />}     />
      <Route path="/profile"   element={<Profile />}  />
      <Route path="/payment"   element={<Payment />}  />
      <Route path="/help"       element={<HelpSupport />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<TermsCondition />} />
      <Route path="/about" element={<About />} />
  
    </Routes>
  );
}

export default App;