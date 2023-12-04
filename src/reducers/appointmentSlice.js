import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createRecordThunk,
  editRecordThunk,
  deleteRecordThunk,
} from "./recordThunk";
// Action to store the record locally
export const storeLocally = (record) => {
  try {
    const key = "localRecords";
    const existingRecords = JSON.parse(localStorage.getItem(key)) || [];

    const defaultDate = new Date().toISOString(); // Adjust accordingly

    const updatedRecords = [
      ...existingRecords,
      {
        ...record.data,
        id: record.data.id || new Date().getTime(),
        date: record.data.date || defaultDate,
      },
    ];

    localStorage.setItem(key, JSON.stringify(updatedRecords));
    toast.success("Record Created");
    // console.log("Record added to local storage:", record);
  } catch (error) {
    console.error("Error storing data in local storage:", error);
  }
};

const initialState = {
  isLoading: false,
  doctor: "",
  hospital: "",
  location: "",
  specialtyExaminations: "",
  medicalTypeOptions: [
    "Scheduled Appointment",
    "Emergency Visit",
    "Routine Checkup",
  ],
  medicalType: "Scheduled Appointment",
  statusOptions: ["Completed Visit", "Pending Visit", "Pending Test Results"],
  status: "Completed Visit",
  note: "",
  isEditing: false,
  editRecordId: "",
  date: "",
  localRecords: [],
  id: "",
};

export const createRecord = createAsyncThunk(
  "record/createRecord",
  createRecordThunk
);

export const storeLocallyAction = createAction("record/storeLocallyAction");

export const deleteRecordAsync = createAsyncThunk(
  "appointment/deleteRecordAsync",
  deleteRecordThunk
);

export const editRecordAsync = createAsyncThunk(
  "appointment/editRecordAsync",
  editRecordThunk
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
    setEditRecord: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
    storeLocallyAction: (state, action) => {
      const data = action.payload.data;
      const timestamp = new Date().getTime(); // Get a unique timestamp
      const recordWithId = { ...data, id: data.id || timestamp };
      state.localRecords = [...state.localRecords, recordWithId];
      storeLocally(recordWithId);
      console.log(recordWithId);
    },

    deleteRecord: (state, action) => {
      const recordIdToDelete = action.payload;
      const idToDelete = parseInt(recordIdToDelete, 10);
      const updatedRecords = (
        JSON.parse(localStorage.getItem("localRecords")) || []
      ).filter((record) => record.id !== idToDelete);
      localStorage.setItem("localRecords", JSON.stringify(updatedRecords));
      state.localRecords = updatedRecords;
      toast.success("Record deleted successfully!");
    },
    editRecord: (state, { payload }) => {
      const { editRecordId, ...restPayload } = payload;
      if (editRecordId) {
        const localRecords =
          JSON.parse(localStorage.getItem("localRecords")) || [];
        const recordIndex = localRecords.findIndex(
          (record) => record.id === parseInt(editRecordId)
        );

        if (recordIndex !== -1) {
          localRecords[recordIndex] = {
            ...localRecords[recordIndex],
            ...restPayload,
          };
          localStorage.setItem("localRecords", JSON.stringify(localRecords));
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        const newData = action.payload;
        state.isLoading = false;
        state.localRecords = [...state.localRecords, newData];
        toast.success("Record Created");
        storeLocally(newData);
        // console.log("Record Created:", newData);
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.isLoading = false;
        // toast.error(action.payload);
      })
      .addCase(deleteRecordAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecordAsync.fulfilled, (state, action) => {
        const deletedRecordId = action.payload;
        state.isLoading = false;

        state.localRecords = state.localRecords.filter(
          (record) => record.id !== deletedRecordId
        );

        localStorage.setItem(
          "localRecords",
          JSON.stringify(state.localRecords)
        );
      })
      .addCase(deleteRecordAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error deleting record:", action.error.message);
      })
      .addCase(editRecordAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editRecordAsync.fulfilled, (state, action) => {
        toast.success("Record updated successfully!");
        state.isLoading = false;
      })
      .addCase(editRecordAsync.rejected, (state, action) => {
        toast.error("Error editing record. Please try again.");
        state.isLoading = false;
      });
  },
});

export const {
  handleChange,
  clearValues,
  setEditRecord,
  deleteRecord,
  editRecord,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
