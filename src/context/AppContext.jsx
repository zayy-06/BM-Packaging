import { createContext, useContext, useState } from 'react';
import { mockOrders } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentEstimate, setCurrentEstimate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState(mockOrders);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);

  const placeOrder = (orderData) => {
    const newId = `BMP-${10026 + orders.filter(o => o.customer === 'NatureBrew Co.').length}`;
    const newOrder = {
      id: newId,
      ...orderData,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      estimatedDelivery: 'TBD',
    };
    setOrders(prev => [newOrder, ...prev]);
    setLastOrderId(newId);
    return newId;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    );
  };

  const login = (email, password) => {
    if (email === 'customer@bmprint.com' && password === 'demo123') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const adminLogin = (email, password) => {
    if (email === 'admin@bmprint.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsLoggedIn(false);
  const adminLogout = () => setIsAdminLoggedIn(false);

  return (
    <AppContext.Provider value={{
      currentEstimate,
      setCurrentEstimate,
      selectedProduct,
      setSelectedProduct,
      orders,
      placeOrder,
      updateOrderStatus,
      isLoggedIn,
      isAdminLoggedIn,
      login,
      adminLogin,
      logout,
      adminLogout,
      lastOrderId,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
