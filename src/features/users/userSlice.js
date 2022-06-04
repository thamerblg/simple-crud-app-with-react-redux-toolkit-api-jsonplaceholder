import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = {
  listOfUser: [],
  loading: false,
  hasErrors: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    getUsers: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.listOfUser = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getUsersFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    addNewUser: (state, action) => {
      state.listOfUser = [...state.listOfUser, action.payload];
      state.loading = false;
      state.hasErrors = false;
    },
    deleteUser: (state, action) => {
      state.listOfUser = [...state.listOfUser].filter(
        (user) => user.id !== action.payload
      );
      state.loading = false;
      state.hasErrors = false;
    },
    editUser: (state, action) => {
      state.listOfUser = state.listOfUser.map((user) =>
        user.id === action.payload.id
          ? { ...user, name: action.payload.userName }
          : user
      );
    },
  },
});

export const getUsersAsync = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getUsersSuccess(response.data));
  } catch (err) {
    dispatch(getUsersFailure(err));
  }
};

export const addUsersAsync = (newUser) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}`, newUser);
    dispatch(addNewUser(response.data));
  } catch (err) {
    dispatch(getUsersFailure(err));
  }
};

export const deleteUsersAsync = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    dispatch(deleteUser(response.data));
  } catch (err) {
    dispatch(getUsersFailure(err));
  }
};
export const editUsersAsync = (id, name) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`);
    dispatch(editUser(response.data));
  } catch (err) {
    dispatch(getUsersFailure(err));
  }
};

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  addNewUser,
  deleteUser,
  editUser,
} = userSlice.actions;

export default userSlice.reducer;
