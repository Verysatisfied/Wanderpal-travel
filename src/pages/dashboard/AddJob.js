import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  setEditRecord,
  editRecordAsync,
} from "../../reducers/appointmentSlice";
import {
  handleChange,
  clearValues,
  createRecord,
} from "../../reducers/appointmentSlice";
const AddJob = () => {
  const {
    isLoading,
    doctor,
    hospital,
    location,
    note,
    medicalTypeOptions,
    medicalType,
    status,
    statusOptions,
    isEditing,
    editRecordId,
    date,
    id,
  } = useSelector((store) => store.appointment);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctor || !hospital || !location) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    const recordData = {
      doctor,
      hospital,
      location,
      note,
      medicalType,
      status,
      date,
      id,
      editRecordId,
    };
    if (isEditing) {
      // Dispatch the editRecordAsync action
      dispatch(editRecordAsync(recordData));
    } else {
      // Dispatch the createRecord action
      dispatch(createRecord({ data: recordData, storeLocally: true }));
    }
    // console.log("Dispatching createRecord with data:", recordData);
    // dispatch(createRecord({ data: recordData, storeLocally: true }));
    dispatch(clearValues());
  };

  useEffect(() => {
    if (isEditing) {
      dispatch(
        setEditRecord({
          doctor,
          hospital,
          location,
          note,
          medicalType,
          status,
          date,
          id,
        })
      );
    }
  }, [
    isEditing,
    dispatch,
    doctor,
    hospital,
    location,
    note,
    medicalType,
    status,
    date,
    id,
  ]);

  const handleJobInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "date" && !value) {
      // Set the date to the current date with only year, month, and day
      const currentDate = new Date().toLocaleDateString("en-CA");
      value = currentDate;
    }
    if (name === "note" || "location" || "doctor" || "hospital") {
      const words = value.split(" ");
      if (words.length > 20) {
        toast.warn("Note should be limited to 20 words.");
        return;
      }
    }

    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit records" : "add itinerary records"}</h3>
        <h7>Invite friends</h7>
        <Link to="/dashboard/group" className="start-here-button">
          <span type="submit">
            <i className="ri-search-line">
              <FaPlus />
            </i>
          </span>
        </Link>
        <div className="form-center">
          {/* date */}
          <FormRow
            type="date"
            labelText="Date"
            name="date"
            value={date}
            handleChange={handleJobInput}
          />
          {/* position */}
          <FormRow
            type="text"
            name="doctor"
            labelText="Activities"
            placeholder="Enter the Activities"
            value={doctor}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            labelText="Attractions"
            placeholder="Enter the Attractions"
            name="hospital"
            value={hospital}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="city/location"
            name="location"
            placeholder="Enter the location"
            value={location}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name="medicalType"
            labelText="Category of Activities"
            value={medicalType}
            handleChange={handleJobInput}
            list={medicalTypeOptions}
          />
          {/* note */}
          <FormRow
            type="text"
            labelText="note"
            name="note"
            value={note}
            placeholder="Enter notes (less than 20 words)"
            handleChange={handleJobInput}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
