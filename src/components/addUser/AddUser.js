import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { addUsersAsync } from "../../features/users/userSlice";
import "./AddUser.css";

const AddUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    const newUser = {
      id: +Math.floor(Math.random() * 100),
      name,
      username,
      email,
      phone: +phone,
      website,
    };
    console.log(newUser);
    dispatch(addUsersAsync(newUser));
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setWebsite("");
  };

  return (
    <Popup
      trigger={<button className="button add-user"> Add new user </button>}
      modal
      nested
    >
      {(close) => (
        <div className="modale">
          <div className="close" onClick={close}>
            &times;
          </div>
          <div className="header">Form for adding a new user</div>
          <div className="content">
            <form>
              <div className="form-outline mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-outline mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-outline mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-outline mb-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-outline mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Website url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={(e) => {
                submitForm(e);
                close();
              }}
            >
              submit
            </button>
            <button
              className="button"
              onClick={() => {
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddUser;
