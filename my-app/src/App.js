import React from "react";
import AddButton from "./AddButton";
import "./AddButton.css";

function App() {
  return (
    <div className="full" style={{ height: "100vh" }}>
        <h1 style={{ color: "white", height: "100px", width: "600px" , position:"relative",justifyContent:"center", alignItems:"center"}} className="form2">Form Responses</h1>
     
        <AddButton />
      
     
      </div>
  );
}

export default App;
