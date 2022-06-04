import React, { useState } from "react";
import "./User.css";
import {
  FaArrowRight,
  FaArrowLeft,
  FaUserCircle,
  FaTrash,
  FaPen,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaUserTag,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteUser, editUser } from "../../features/users/userSlice";

const User = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isFliped, setIsFliped] = useState(false);

  const dispatch = useDispatch();

  const handleFlipCard = () => {
    setIsFliped(!isFliped);
  };
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleOnEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({ id: user.id, userName: e.target.name.value }));
    setIsEdit(false);
  };
  return (
    <div className={`card ${isFliped ? "flipped" : ""}`}>
      {!isFliped ? (
        <div className="card-front">
          <FaUserCircle size={60} />
          {isEdit ? (
            <form onSubmit={handleOnEditSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter new name here..."
                defaultValue={user.name}
              />
            </form>
          ) : (
            <h2>{user.name}</h2>
          )}
          <div className="go-corner">
            <div className="go-arrow" onClick={handleFlipCard}>
              <FaArrowRight size={18} />
            </div>
          </div>

          <div className="go-bottom">
            <div className="go-trash" onClick={() => handleDelete(user.id)}>
              <FaTrash />
            </div>
            <div className="go-pen" onClick={() => handleEdit()}>
              <FaPen />
            </div>
          </div>
        </div>
      ) : (
        <div className="card-back">
          <div className="go-corner">
            <div className="go-arrow" onClick={handleFlipCard}>
              <FaArrowLeft size={18} />
            </div>
          </div>
          <div className="layer">
            <div className="top">
              <h2>
                <FaUserTag /> {user.username}
              </h2>
            </div>
            <div className="bottom">
              <p>
                <FaPhone />
                <span>Phone :</span>
                <a href={"tel:" + user.phone}>{user.phone}</a>
              </p>
              <p>
                <FaEnvelope />
                <span>Email:</span>
                <a href={"mailto:" + user.email}>{user.email}</a>
              </p>
              <p>
                <FaGlobe />
                <span>Website:</span>
                <a href={user.website}>{user.website}</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
