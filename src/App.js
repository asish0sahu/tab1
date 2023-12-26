import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import UserForm from "./components/Tableone/UserForm";
import UserTable from "./components/Tableone/UserTable";

const App = () => {
  const navigate = useNavigate();

  const handleClickLink = () => {
    navigate("/create");
  };
  return (
    <div className="App">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <br />
      <Link to="/create">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClickLink}
        >
          Create +
        </button>
      </Link>
      <br />
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/create" element={<UserForm navigate={navigate} />} />
      </Routes>
    </div>
  );
};

export default App;
