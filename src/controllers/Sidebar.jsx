import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    Swal.fire({
      title: "Apa anda yakin?",
      text: "Anda akan logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="fs-5">App <i className="bi bi-apple"></i></span>
        </div>
        <hr />
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="/Dashboard" className="nav-link text-white">
              <i className="bi bi-house-dash-fill"></i>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="/data-pelanggan" className="nav-link text-white">
              <i className="bi bi-person-workspace"></i>
              Pelanggan
            </a>
          </li>
          <li className="nav-item">
            <a href="/data-ruang" className="nav-link text-white">
              <i className="bi bi-shop"></i>
              Ruang
            </a>
          </li>
          <li className="nav-item">
            <a href="/data-kamar" className="nav-link text-white">
              <i className="bi bi-buildings"></i>
              Kamar
            </a>
          </li>
          <li className="nav-item">
            <a href="/data-tambah" className="nav-link text-white">
              <i className="bi bi-pc-display-horizontal"></i>
              Data Tambah
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link text-white" onClick={logout}>
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </a>
          </li>
        </ul>
        <button
        className={`sidebar-toggle btn btn-link btn-sm ${
          isOpen ? "open" : ""
        }`}
        onClick={toggleSidebar}
      >
        <i className="bi bi-list"></i>
      </button>
      </div>
    </div>
  );
}

export default Sidebar;
