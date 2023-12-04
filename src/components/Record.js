import React from "react";

import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch } from "react-redux";

import RecordInfo from "./RecordInfo";
import moment from "moment";
import { useSelector } from "react-redux";
import { deleteRecordAsync, setEditRecord } from "../reducers/appointmentSlice";
import { fetchLocalRecords } from "../reducers/allRecordsSlice";
const Record = ({
  id,
  doctor,
  hospital,
  location,
  note,
  medicalType,
  status,
  date,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.allRecords.isLoading);
  const formattedDate = date
    ? moment(date).format("MMM Do, YYYY")
    : moment().format("MMM Do, YYYY");
  const handleDelete = async () => {
    try {
      await dispatch(deleteRecordAsync(id));
      await dispatch(fetchLocalRecords());
    } catch (error) {
      console.error("Error deleting record:", error);
      // Handle error, if needed
    }
  };
  const limitNote = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };
  return (
    <Wrapper>
      {isLoading && <div className="loading"></div>}
      <header>
        <div className="main-icon">{doctor.charAt(0)}</div>
        <div className="info">
          <h5>{doctor}</h5>
          <p>{hospital}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <RecordInfo icon={<FaLocationArrow />} text={location} />
          <RecordInfo icon={<FaCalendarAlt />} text={formattedDate} />
          <RecordInfo icon={<FaBriefcase />} text={medicalType} />
          <RecordInfo icon={<CgNotes />} text={limitNote(note, 25)} />
          <div
            className={`status ${status.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {status}
          </div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/dashboard/add-record"
              className="btn edit-btn"
              onClick={() => {
                dispatch(
                  setEditRecord({
                    editRecordId: id,
                    doctor,
                    hospital,
                    location,
                    note,
                    medicalType,
                    status,
                    date,
                  })
                );
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Record;
