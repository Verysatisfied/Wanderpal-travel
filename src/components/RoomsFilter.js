import React from "react";
import { useContext } from "react";
import { RoomContext } from "../components/Context";
import styled from "styled-components";

// Utility function to get unique values
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

// Main component
export default function RoomFilter({ rooms }) {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    breakfast,
    pets,
  } = context;

  // Get unique types and capacities
  let types = getUnique(rooms, "type");
  types = ["all", ...types];
  let people = getUnique(rooms, "capacity");

  return (
    <FilterContainer>
      <FilterForm>
        {/* Room Type */}
        <FormGroup>
          <label htmlFor="type">Rooms Type</label>
          <SelectWrapper>
            <select name="type" id="type" value={type} onChange={handleChange}>
              {types.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </SelectWrapper>
        </FormGroup>

        {/* Guests */}
        <FormGroup>
          <label htmlFor="capacity">Guests</label>
          <SelectWrapper>
            <select
              name="capacity"
              id="capacity"
              value={capacity}
              onChange={handleChange}
            >
              {people.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </SelectWrapper>
        </FormGroup>

        {/* Price Range */}
        <FormGroup>
          <label htmlFor="price">Room Price ${price}</label>
          <RangeInput
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Extras */}
        <FormGroup>
          <SingleExtra>
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </SingleExtra>
          <SingleExtra>
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">Pets</label>
          </SingleExtra>
        </FormGroup>
      </FilterForm>
    </FilterContainer>
  );
}

// Styled components

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #faa935; /* Yellow background */
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #faa935;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #faa935;
    cursor: pointer;
  }
`;
const FilterContainer = styled.section`
  padding: 5rem 0;
`;

const FilterForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 40px;
  row-gap: 2rem;
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectWrapper = styled.div`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black; /* Change color if needed */
    pointer-events: none;
  }
  select {
    width: 100%;
    padding-right: 30px; /* Make space for the arrow */
    -webkit-appearance: none; /* Remove default arrow from Chrome */
    -moz-appearance: none; /* Remove default arrow from Firefox */
  }
`;

const SingleExtra = styled.div`
  display: flex;
  align-items: center;
  label {
    margin-left: 0.5rem;
  }
`;
