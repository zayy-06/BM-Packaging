import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';

// Customer Pages
import Home from './pages/customer/Home';
import About from './pages/customer/About';
import Services from './pages/customer/Services';
import Products from './pages/customer/Products';
import ProductDetails from './pages/customer/ProductDetails';
import Customize from './pages/customer/Customize';
import OrderSummary from './pages/customer/OrderSummary';
import OrderConfirmation from './pages/customer/OrderConfirmation';
import Dashboard from './pages/customer/Dashboard';
import OrderDetails from './pages/customer/OrderDetails';
import Contact from './pages/customer/Contact';
import HowItWorks from './pages/customer/HowItWorks';
import Login from './pages/customer/Login';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminPricing from './pages/admin/AdminPricing';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetails from './pages/admin/AdminOrderDetails';
import AdminCustomers from './pages/admin/AdminCustomers';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Customer Facing Routes */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order-details/:orderId" element={<OrderDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Customer Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/client-login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/pricing" element={<AdminPricing />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:orderId" element={<AdminOrderDetails />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
