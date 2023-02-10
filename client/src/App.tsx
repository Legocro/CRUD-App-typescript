import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.css";
import CustomerList from './Pages/CustomerList';
import AddCustomer from './Pages/AddCustomer';
import Customer from './Pages/Customer';
function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/customers"} className="nav-link">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addCustomer"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<CustomerList/>} />
          <Route path="/customers" element={<CustomerList/>} />
          <Route path="/customers/:id" element={<Customer/>} />
          <Route path="/addCustomer" element={<AddCustomer/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;