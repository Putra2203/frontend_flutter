import React from "react";
import { NavLink } from "react-router-dom";

function Sider() {
  return (
    <aside className="w-64 p-4 text-white bg-green-600">
      <h1 className="text-2xl font-bold">Admin Management</h1>
      <nav className="mt-4">
        <ul>
          <li className="p-2 hover:bg-green-700">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "font-bold bg-green-800 block p-2 rounded"
                  : "block p-2"
              }
            >
              Products
            </NavLink>
          </li>
          <li className="p-2 hover:bg-green-700">
            <NavLink
              to="/add-product"
              className={({ isActive }) =>
                isActive
                  ? "font-bold bg-green-800 block p-2 rounded"
                  : "block p-2"
              }
            >
              Add Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sider;
