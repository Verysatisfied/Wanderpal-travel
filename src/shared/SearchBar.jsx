import React, { useRef } from "react";
import "./search-bar.css";
import { toast } from "react-toastify";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import { CiLocationOn } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "") {
      return toast.error("All fields are required!");
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
    );

    if (!res.ok) alert("Something went wrong");

    const result = await res.json();

    navigate(
      `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
      { state: result.data }
    );
  };
  const navigateToPayPage = () => {
    navigate("/pay");
  };
  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line">
                <CiLocationOn />
              </i>
            </span>
            <div>
              <h6>Departure</h6>
              <input
                type="text"
                placeholder="Where do you start?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line">
                <GiPathDistance />
              </i>
            </span>
            <div>
              <h6>Destination</h6>
              {/* <input
                type="number"
                placeholder="Where are you going?"
                ref={distanceRef}
              />*/}
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i class="ri-group-line">
                <MdOutlinePeopleOutline />
              </i>
            </span>
            <div>
              <h6>Invite Friends</h6>
              <h8>Share with your friends</h8>
              {/* <input type="number" placeholder="0" ref={maxGroupSizeRef} /> */}
            </div>
          </FormGroup>
          <Link to="/dashboard/group" className="start-here-button">
            <span type="submit" onClick={searchHandler}>
              <i className="ri-search-line">
                <FaPlus />
              </i>
            </span>
          </Link>

          {/* Start Here Button */}
          <Link
            to="/dashboard/add-record"
            // onClick={navigateToPayPage}
            className="start-here-button"
          >
            Add Itinerary
          </Link>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
