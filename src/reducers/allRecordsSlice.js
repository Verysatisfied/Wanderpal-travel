import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import React, { useEffect } from "react";

export const fetchLocalRecords = createAsyncThunk(
  "allRecords/fetchLocalRecords",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());

      // get local storage and add time
      const data = JSON.parse(localStorage.getItem("localRecords")) || [];
      // console.log(data);
      // Apply filters based on search criteria
      const filteredData = data
        .filter((record) => {
          // Filter by search text
          const searchMatch =
            record.doctor
              .toLowerCase()
              .includes(thunkAPI.getState().allRecords.search.toLowerCase()) ||
            record.hospital
              .toLowerCase()
              .includes(thunkAPI.getState().allRecords.search.toLowerCase()) ||
            record.note
              .toLowerCase()
              .includes(thunkAPI.getState().allRecords.search.toLowerCase());

          // Filter by medical type
          const medicalTypeMatch =
            thunkAPI.getState().allRecords.searchType === "all" ||
            record.medicalType === thunkAPI.getState().allRecords.searchType;

          // Filter by status
          const statusMatch =
            thunkAPI.getState().allRecords.searchStatus === "all" ||
            record.status === thunkAPI.getState().allRecords.searchStatus;

          return searchMatch && medicalTypeMatch && statusMatch;
        })
        .map((record, index) => ({
          ...record,
          id: record.id || new Date().getTime() + index,
        }));

      // Sort the filtered data
      const sortedData = sortData(
        filteredData,
        thunkAPI.getState().allRecords.sort
      );

      thunkAPI.dispatch(hideLoading());
      return sortedData;
    } catch (error) {
      console.error("Error loading local records:", error);
      thunkAPI.dispatch(hideLoading());
      throw error;
    }
  }
);
// Helper function to sort data based on the specified sort option
const sortData = (data, sortOption) => {
  // console.log(data);
  const isValidDate = (dateString) => !isNaN(new Date(dateString).getTime());
  switch (sortOption) {
    case "latest":
      return [...data].sort((a, b) => {
        const dateA = isValidDate(a.date) ? new Date(a.date) : null;
        const dateB = isValidDate(b.date) ? new Date(b.date) : null;

        if (dateA && dateB) {
          return dateB.getTime() - dateA.getTime();
        } else if (dateA) {
          return -1;
        } else if (dateB) {
          return 1;
        } else {
          return 0;
        }
      });

    case "oldest":
      return [...data].sort((a, b) => {
        const dateA = isValidDate(a.date) ? new Date(a.date) : null;
        const dateB = isValidDate(b.date) ? new Date(b.date) : null;

        if (dateA && dateB) {
          return dateA.getTime() - dateB.getTime();
        } else if (dateA) {
          return -1;
        } else if (dateB) {
          return 1;
        } else {
          return 0;
        }
      });
    case "a-z":
      return [...data].sort((a, b) => a.doctor.localeCompare(b.doctor));
    case "z-a":
      return [...data].sort((a, b) => b.doctor.localeCompare(a.doctor));
    default:
      return data;
  }
};

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  records: [],
  totalRecords: 0,
  numOfPages: 1,
  currentPage: 1,
  recordsPerPage: 10,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const showStats = createAsyncThunk(
  "allRecords/showStats",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());

      const data = JSON.parse(localStorage.getItem("localRecords")) || [];

      const scheduledAppointmentCount = data.filter(
        (record) => record.medicalType === "Scheduled Appointment"
      ).length;
      const emergencyVisitCount = data.filter(
        (record) => record.medicalType === "Emergency Visit"
      ).length;
      const routineCheckupCount = data.filter(
        (record) => record.medicalType === "Routine Checkup"
      ).length;
      const completedVisitCount = data.filter(
        (record) => record.status === "Completed Visit"
      ).length;
      const pendingVisitCount = data.filter(
        (record) => record.status === "Pending Visit"
      ).length;
      const pendingTestResultsCount = data.filter(
        (record) => record.status === "Pending Test Results"
      ).length;

      // Calculate the total records for each month using a plain JavaScript object
      const monthlyApplications = {};

      data.forEach((record) => {
        const date = new Date(record.date);

        // Check if the date is valid before extracting month and year
        if (!isNaN(date.getTime())) {
          const yearMonthKey = `${date.getFullYear()}.${date.getMonth() + 1}`;

          // Increment the count for the corresponding month
          monthlyApplications[yearMonthKey] =
            (monthlyApplications[yearMonthKey] || 0) + 1;
        } else {
          // Handle records with invalid dates by using the current date
          const currentDate = new Date();
          const currentYearMonthKey = `${currentDate.getFullYear()}.${
            currentDate.getMonth() + 1
          }`;

          monthlyApplications[currentYearMonthKey] =
            (monthlyApplications[currentYearMonthKey] || 0) + 1;
        }
      });
      thunkAPI.dispatch(hideLoading());

      return {
        scheduledAppointmentCount,
        routineCheckupCount,
        emergencyVisitCount,
        completedVisitCount,
        pendingVisitCount,
        pendingTestResultsCount,
        monthlyApplications,
      };
    } catch (error) {
      console.error("Error fetching and calculating stats:", error);
      thunkAPI.dispatch(hideLoading());
      throw error;
    }
  }
);

const allRecordsSlice = createSlice({
  name: "allRecords",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      // state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocalRecords.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLocalRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records = action.payload;
        state.numOfPages = Math.ceil(
          action.payload.length / state.recordsPerPage
        );
      })
      .addCase(fetchLocalRecords.rejected, (state, action) => {
        state.isLoading = false;
        // handle error
        state.error = action.error.message;
      })
      .addCase(showStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(showStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Store the error message
      });
  },
});

export const {
  updateCurrentPage,
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
} = allRecordsSlice.actions;

export default allRecordsSlice.reducer;
