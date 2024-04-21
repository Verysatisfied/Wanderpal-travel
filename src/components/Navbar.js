import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { GrFormSearch } from "react-icons/gr";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { toggleSidebar } from "../reducers/sidebarReducer";
import { logoutUser } from "../reducers/userSlice";
import "../assets/css/header.css";
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
          <p>JourneyMate</p>
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
          {/* <Link to="/blog">Blog</Link> */}
          {user && <Link to="/dashboard">Dashboard</Link>}
          <input
            type="text"
            className="input-accommodation"
            placeholder="  Accommodation/Transportation/Tours"
          />
          <Link to="/dashboard/accommodation" className="start-here-button">
            <span type="submit">
              <i className="ri-search-line">
                <GrFormSearch />
              </i>
            </span>
          </Link>
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
  position: fixed; /* Change position to fixed */
  top: 0; /* Align to the top of the viewport */
  left: 0; /* Align to the left of the viewport */
  width: 100%; /* Span the full width of the viewport */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure it sits above other content */
  background: var(--white); /* Define --white or use a specific color */
  margin-bottom: 20px;
  transition: background-color 0.3s; /* Optional: for any background transition effect */
  .start-here-button span,
  .start-here-button i {
    color: white; /* Ensures text is white */
  }
  .input-accommodation {
    border-radius: 20px;
    margin-left: 10px;
    background-color: #eeeeee;
    width: 45%;

    border: 1px solid white;
    max-width: 500px;

    /* Placeholder color */
    ::placeholder {
      color: white;
    }
  }
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
      color: var(--heading-color);
      font-family: var(--font-name);
      font-size: 1.5rem;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--secondary-color);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .nav-links a {
    text-decoration: none;
    color: var(--heading-color);
    font-weight: 500;
    font-size: 1.5rem;
  }
  .nav-links a:hover,
  .nav-links a.active__link {
    color: var(--secondary-color);
  }
  .cart-btn-wrapper {
    display: none;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
    cursor: pointer;
    color: #faa935;
    &:hover {
      color: #faa935;
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
    background: #faa935;
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
    color: white;
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: white;
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
  }

  .dropdown-btn:hover {
    color: #000000; /* 鼠标悬浮时的文字色 */
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
          border-bottom: 2px solid #faa935;
        }
      }
      .nav-header p {
        margin: 0 auto; /* Center the text */
        text-align: center; /* Ensure text is centered */
        flex-grow: 1; /* Allow it to fill space for center alignment */
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;
