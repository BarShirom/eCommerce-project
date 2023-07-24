import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/Header";
import CartPage from "./pages/CartPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import OrderListPage from "./pages/OrderListPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import UserEditPage from "./pages/UserEditPage";
import UserListPage from "./pages/UserListPage";


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="/order/:id" Component={OrderPage} />
           <Route path="/placeorder" Component={PlaceOrderPage} />
          <Route path="/shipping" Component={ShippingPage} /> 
          <Route path="/payment" Component={PaymentPage} /> 
          <Route path="/register" Component={RegisterPage} />
          <Route path="/profile" Component={ProfilePage} /> 
          <Route path="/product/:id" Component={ProductPage} />
          <Route path="/cart/:id?" Component={CartPage} />
          <Route path="/admin/userlist" Component={UserListPage} />
          <Route
            path="/admin/productlist"
            Component={ProductListPage} />
            
       
           <Route
            path="/admin/productlist/:pageNumber"
            Component={ProductListPage}/>

          <Route path="/admin/product/:id/edit" Component={ProductEditPage} />
          <Route path="/admin/user/:id/edit" Component={UserEditPage} />
          <Route path="/admin/orderlist" Component={OrderListPage} />
          <Route path="/search/:keyword" Component={HomePage}  />
          <Route path="/page/:pageNumber" Component={HomePage}  />
          <Route
            path="/search/:keyword/page/:pageNumber"
            Component={HomePage}
            
          />
          <Route path="/" Component={HomePage}  />
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;










