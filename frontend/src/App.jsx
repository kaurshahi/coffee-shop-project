import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";

import ChangeProductDescription from "./components/ChangeProductDescription";
import TaxCalculator from "./components/TaxCalculator";
import UpdateOrderStatus from "./pages/UpdateOrderStatus";
import AddItem from "./pages/AddItem";
import SaleChecker from "./pages/SaleChecker";
import Reports from "./pages/Reports";

function App() {
  return (
    <Router>
      <NavBar />
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/update-description"
            element={<ChangeProductDescription />}
          ></Route>
          <Route path="/tax-calculator" element={<TaxCalculator />}></Route>
          <Route
            path="/update-order-status"
            element={<UpdateOrderStatus />}
          ></Route>
          <Route path="/add-item" element={<AddItem />}></Route>
          <Route path="/sale-checker" element={<SaleChecker />}></Route>
          <Route path="/reports" element={<Reports />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
