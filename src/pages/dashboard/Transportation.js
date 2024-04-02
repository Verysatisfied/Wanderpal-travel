import React, { useState } from "react";
import styled from "styled-components";
// Assuming you're using redux, else adjust as necessary
import { useDispatch } from "react-redux";
import { FormRow, FormRowSelect } from "../../components";
const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem;
  box-shadow: var(--shadow-2);

  h3 {
    margin-bottom: 2rem;
    margin-top: 0;
  }

  .form {
    display: grid;
    gap: 1rem;
    max-width: 800px;
    margin: auto;
  }

  .form-center {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    align-items: end;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2rem;

    button {
      height: 35px;
      padding: 0.5rem 2rem;
      border: none;
      border-radius: var(--borderRadius);
      cursor: pointer;
      font-weight: bold;
      width: 100%;
    }
  }

  .clear-btn {
    background: var(--grey-500);
    color: var(--white);
  }

  .clear-btn:hover {
    background: var(--black);
  }

  .submit-btn {
    background: white;
    color: black;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease; /* 添加阴影变化的过渡效果 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 初始阴影较浅 */
  }

  .submit-btn:hover {
    background: var(--primary-hover);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Hover时阴影变深 */
  }
`;

const TransportationSearchBar = () => {
  // Initialize state and dispatch
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    transportationType: "bus",
  });
  const dispatch = useDispatch();

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchData);
    // Dispatch your search action here
    // dispatch(searchAction(searchData));
  };

  // Transportation options
  const transportationOptions = ["bus", "train", "flight"];

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h3>Search Transportation</h3>

        <div className="form-center">
          <FormRow
            type="text"
            labelText="from"
            name="note"
            id="from"
            value={searchData.from}
            placeholder="Enter start city"
            onChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="to"
            name="to"
            id="to"
            value={searchData.to}
            placeholder="Enter destination city"
            onChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="note"
            name="note"
            placeholder="Enter notes (less than 20 words)"
          />
          <FormRow type="date" labelText="Date" name="date" />

          <FormRowSelect
            labelText="Transportation Type"
            name="transportationType"
            value={searchData.transportationType}
            handleChange={handleChange}
            list={transportationOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="clear-btn"
              onClick={() =>
                setSearchData({
                  from: "",
                  to: "",
                  date: "",
                  transportationType: "bus",
                })
              }
            >
              Clear
            </button>
            <button type="submit" className="submit-btn">
              Search
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default TransportationSearchBar;
