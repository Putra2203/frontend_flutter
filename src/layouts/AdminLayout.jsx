import React from "react";
import Sider from "../components/Sider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <Sider />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
