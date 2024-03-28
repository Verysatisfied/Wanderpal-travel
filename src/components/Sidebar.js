import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSidebar } from "../reducers/sidebarReducer";
export const Sidebar = () => {
  const isSidebarHidden = useSelector((state) => state.sidebar.isSidebarHidden);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  return (
    <SidebarContainer className="show-sidebar sidebar">
      <aside
        className={`${isSidebarHidden ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header">
          <img src={logo} alt=" we care " className="logo" />
          <button
            className="close-btn"
            type="button"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          <Link to="/" onClick={() => dispatch(toggleSidebar())} v>
            Home
          </Link>
          <Link to="/about" onClick={() => dispatch(toggleSidebar())}>
            About
          </Link>
          {/* <Link to="/blog" onClick={() => dispatch(toggleSidebar())}>
            Blog
          </Link> */}
          {user && (
            <div>
              <Link to="/dashboard" onClick={() => dispatch(toggleSidebar())}>
                Stats
              </Link>
              <Link
                to="/dashboard/all-records"
                onClick={() => dispatch(toggleSidebar())}
              >
                all records
              </Link>
              <Link
                to="/dashboard/add-record"
                onClick={() => dispatch(toggleSidebar())}
              >
                add record
              </Link>
              <Link
                to="/dashboard/profile"
                onClick={() => dispatch(toggleSidebar())}
              >
                profile
              </Link>
            </div>
          )}
        </ul>
        {!user && (
          <Link
            to="/register"
            className="cart-btn-wrapper"
            onClick={() => dispatch(toggleSidebar())}
          >
            Login/Register
          </Link>
        )}
      </aside>
    </SidebarContainer>
  );
};

const mapStateToProps = (state) => ({
  isSidebarHidden: state.sidebar.isSidebarHidden,
});

export default connect(mapStateToProps, { toggleSidebar })(Sidebar);

const SidebarContainer = styled.div`
  text-align: center;

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: red;
  }
  .logo {
    justify-self: center;
    height: 60px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
    background: white;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
    cursor: pointer;
    color: #faa935;
    &:hover {
      color: #b5651d;
    }
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;
