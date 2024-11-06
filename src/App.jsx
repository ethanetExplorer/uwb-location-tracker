import { useState } from "react";
import LocationDiagram from "./LocationDiagram";
import "./App.css";

function App() {
  return (
    <>
      {/* Top title bar; it doesn't do much */}
      <div>
        <h1>Overview</h1>
      </div>

      {/* Actual tracking interface */}
      <LocationDiagram />

      {/* List of workers */}
      <div></div>
    </>
  );
}

export default App;
