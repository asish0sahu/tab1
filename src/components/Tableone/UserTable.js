import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, editUser } from "../store/userSlice";

const UserTable = () => {
  const [localRecords, setLocalRecords] = useState([]);
  const records = useSelector((state) => state?.users?.records);
  const dispatch = useDispatch();
  const [editUserId, setEditUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  // Load data from local storage
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("userRecords")) || [];
    setLocalRecords(storedRecords);
  }, []);

  useEffect(() => {
    localStorage.setItem("userRecords", JSON.stringify(records));
    setLocalRecords(records);
  }, [records]);

  const handleEdit = (id, name, phone, email) => {
    setEditUserId(id);
    setEditedName(name);
    setEditedPhone(phone);
    setEditedEmail(email);
  };

  const handleSaveEdit = (id) => {
    const updatedLocalRecords = localRecords.map((user) =>
      user.id === id
        ? { ...user, name: editedName, phone: editedPhone, email: editedEmail }
        : user
    );

    setLocalRecords(updatedLocalRecords);
    // console.log("save local records:", updatedLocalRecords);
    dispatch(editUser(updatedLocalRecords));

    setEditUserId(null);
    setEditedName("");
    setEditedPhone("");
    setEditedEmail("");
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditedName("");
    setEditedPhone("");
    setEditedEmail("");
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Mail id</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {localRecords?.map((user) => (
            <tr key={user.id ?? user.phone ?? user.email} className="border-t">
              <td className="py-2 px-4">
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="py-2 px-4">
                {editUserId === user.id ? (
                  <input
                    type="tel"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td className="py-2 px-4">
                {editUserId === user.id ? (
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="py-2 px-4">
                {editUserId === user.id ? (
                  <>
                    <button
                      className="bg-green-500 text-white py-1 px-2 mr-2 rounded"
                      onClick={() => handleSaveEdit(user.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-red-500 text-white py-1 px-2 mr-2 rounded"
                    onClick={() =>
                      handleEdit(user.id, user.name, user.phone, user.email)
                    }
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-yellow-500 text-black py-1 px-2 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {localRecords?.length === 0 && <p>No records found</p>}
    </div>
  );
};

export default UserTable;
