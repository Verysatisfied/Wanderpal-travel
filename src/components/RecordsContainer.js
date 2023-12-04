import React, { useEffect } from "react";
import Record from "./Record";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";
import { RingLoader } from "react-spinners";
import {
  fetchLocalRecords,
  updateCurrentPage,
} from "../reducers/allRecordsSlice";
import PageBtnContainer from "./PageBtnContainer";
const RecordsContainer = () => {
  const { records, isLoading, currentPage, numOfPages, recordsPerPage } =
    useSelector((state) => state.allRecords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocalRecords());
  }, [dispatch]);

  useEffect(() => {
    // Check if currentPage is greater than the updated numOfPages
    // If so, set currentPage to the last page
    if (currentPage > numOfPages) {
      dispatch(updateCurrentPage(numOfPages));
    }
  }, [numOfPages, currentPage, dispatch]);
  const handlePageChange = (page) => {
    dispatch(updateCurrentPage(page));
  };

  if (isLoading) {
    return (
      <Wrapper>
        <h2>
          <div className="loading loading-center" />
        </h2>
      </Wrapper>
    );
  }

  if (records.length === 0) {
    return (
      <Wrapper>
        <h2>No records to display...</h2>
      </Wrapper>
    );
  }

  // Calculate the start and end index of the records for the current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  // Get the records for the current page
  const recordsForPage = records.slice(startIndex, endIndex);

  return (
    <Wrapper>
      <h5>
        {records.length} record{records.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {recordsForPage.map((record) => {
          return <Record key={record.id} {...record} />;
        })}
      </div>
      {records.length / recordsPerPage > 1 && (
        <PageBtnContainer
          currentPage={currentPage}
          numOfPages={numOfPages}
          onPageChange={handlePageChange}
        />
      )}
    </Wrapper>
  );
};

export default RecordsContainer;
