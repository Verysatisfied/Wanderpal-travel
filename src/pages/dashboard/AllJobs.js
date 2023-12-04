import React from "react";
import { RecordsContainer, SearchContainer } from "../../components";

const AllJobs = () => {
  // const localRecords = JSON.parse(localStorage.getItem("localRecords")) || [];

  return (
    <>
      <SearchContainer />
      <RecordsContainer />
    </>
  );
};

export default AllJobs;
