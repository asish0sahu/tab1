import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const UserForm = ({ record }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    record || { name: "", phone: "", email: "" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const action = record
      ? editUser({ id: record.id, newData: formData })
      : addUser(formData);
    dispatch(action);

    setFormData({ name: "", phone: "", email: "" });
    //use navigation
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>Phone:</label>
        <input
          type="tel"
          placeholder="Enter your number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-2 mr-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;
