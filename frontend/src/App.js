import { React } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Dashboard from "./pages/DashboardPage/Dashboard";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "rgba(240, 240, 240, 0.5)",
        height: "fit-content",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/myapi" element={<Dashboard />} />
          <Route path="/myaccount" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
