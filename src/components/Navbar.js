import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { toggleSidebar } from "../reducers/sidebarReducer";

import { logoutUser } from "../reducers/userSlice";

export const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const isSidebarHidden = useSelector((state) => state.sidebar.isSidebarHidden);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="we care logo" />
          </Link>
          <p>we care</p>
          {!isSidebarHidden && (
            <button
              type="button"
              className="nav-toggle"
              onClick={() => dispatch(toggleSidebar())}
            >
              <FaBars />
            </button>
          )}
        </div>
        <ul className="nav-links">
          <Link to="/">Home</Link> <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </ul>
        {/* <LoginButtons or user logoutButtons /> */}
        {user ? (
          <div className="btn-container">
            <button
              type="button"
              className="btn"
              onClick={() => setShowLogout(!showLogout)}
            >
              <FaUserCircle />
              {user?.name}
              <FaCaretDown />
            </button>
            <div
              className={showLogout ? "dropdown show-dropdown" : "dropdown "}
            >
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => {
                  dispatch(logoutUser("Logging out ..."));
                  setShowLogout(false);
                }}
              >
                logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/register" className="cart-btn-wrapper">
            Login/Register
          </Link>
        )}
      </div>
    </NavContainer>
  );
};
const NavContainer = styled.nav`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* 调整阴影样式 */
  margin-bottom: 2px;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 80px;
      margin-left: -15px;
    }
    p {
      color: #4a9fe0;
      font-family: cursive;
      font-size: 1.5rem;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: #4a9fe0;
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
    cursor: pointer;
    color: #2c7db7;
    &:hover {
      color: #195b8e;
    }
  }

  background: var(--white);
  .btn-container {
    position: relative;
    @media (max-width: 992px) {
      display: flex;
      justify-content: right;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid #4a9fe0;
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;
