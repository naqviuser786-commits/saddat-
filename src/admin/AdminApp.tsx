import { Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./AdminAuthContext";
import RequireAdminAuth from "./RequireAdminAuth";
import AdminLayout from "./AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductsList from "./pages/ProductsList";
import ProductForm from "./pages/ProductForm";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import SiteSettingsPage from "./pages/SiteSettingsPage";

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<RequireAdminAuth />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductForm />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<SiteSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}