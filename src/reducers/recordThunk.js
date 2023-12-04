import { logoutUser } from "./userSlice";
import { showLoading, hideLoading } from "./allRecordsSlice";
import { storeLocally } from "./appointmentSlice";
import { deleteRecord } from "./appointmentSlice";
import { editRecord } from "./appointmentSlice";
export const createRecordThunk = async ({ data }, thunkAPI) => {
  try {
    // console.log("Async Thunk Executed:", data);
    thunkAPI.dispatch(storeLocally({ data }));
    // Return the data so that it can be accessed in createRecord.fulfilled
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(
      error.response ? error.response.data.msg : "Error creating record"
    );
  }
};

export const deleteRecordThunk = async (recordId, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    await thunkAPI.dispatch(deleteRecord(recordId));
    thunkAPI.dispatch(hideLoading());
    return recordId;
  } catch (error) {
    console.error("Error deleting record:", error);
    thunkAPI.dispatch(hideLoading());
    throw error;
  }
};
export const editRecordThunk = async (recordData, thunkAPI) => {
  try {
    recordData.id = thunkAPI.getState().appointment.editRecordId;
    // console.log("recordData after update:", recordData);
    thunkAPI.dispatch(editRecord(recordData)); // Dispatch the editRecord action
    return recordData;
  } catch (error) {
    // Handle errors, for example, display an error message
    throw error;
  }
};
