import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
    const activeStyle = {
      color: "rgba(255,255,255,0.9)",
    };
function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              today
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tomorrow"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              tomorrow
            </NavLink>
          </li>
          <li>
            <NavLink
              to="next-week"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              next 7 days
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout