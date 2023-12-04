import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { clearFilters, handleChange } from "../reducers/allRecordsSlice";
import {
  fetchLocalRecords,
  updateCurrentPage,
} from "../reducers/allRecordsSlice";
const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allRecords);
  const { medicalTypeOptions, statusOptions } = useSelector(
    (store) => store.appointment
  );
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    // Dispatch fetchLocalRecords to update records based on the new search criteria
    dispatch(fetchLocalRecords());
    dispatch(updateCurrentPage(1));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
    dispatch(fetchLocalRecords()); // Also fetch records when filters are cleared
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="search"
            value={search}
            placeholder={"Search by doctor/hospital/note"}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...medicalTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
