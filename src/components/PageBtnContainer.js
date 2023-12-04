import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../reducers/allRecordsSlice";
const PageBtnContainer = ({ currentPage, numOfPages, onPageChange }) => {
  const dispatch = useDispatch();

  const nextPage = () => {
    if (currentPage < numOfPages) {
      dispatch(updateCurrentPage(currentPage + 1));
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(updateCurrentPage(currentPage - 1));
    }
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {Array.from({ length: numOfPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              type="button"
              className={
                pageNumber === currentPage ? "pageBtn active" : "pageBtn"
              }
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)} // Pass the pageNumber to onPageChange
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
