import { useState, useEffect } from "react";
import Shop from "./pages/Shop";

function Hello() {
  useEffect(() => {
    console.log("Đã được add");
    return () => {
      console.log("Đã được gỡ khỏi DOM");
    };
  }, []);
  return <h1>Hello mọi người</h1>;
}

function App() {
  return (
    <div>
      <Shop />
    </div>
  );
}

export default App;

// state thay đổi
// re-render
// UI update
// clean up
// callback useEffect
