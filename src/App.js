import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AddUser from "./components/addUser/AddUser";
import User from "./components/user/User";
import { getUsersAsync } from "./features/users/userSlice";

function App() {
  const listUsers = useSelector((state) => state.users.listOfUser);

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getUsersAsync());
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className="container">
        {listUsers.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
      <AddUser />
    </>
  );
}

export default App;
