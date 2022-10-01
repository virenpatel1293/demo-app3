import React from "react";
import { Routes, Route } from "react-router-dom";
import AddUser from "./Users/AddUser";
import Default from "./Default";
import Laptop from "./component/Laptop";

function App() {
 /* const [token, setToken] = useState(); */

 /* if(!token)
  return(<Login setToken={setToken} />) */

  return (
    <Routes>
      <Route path="/" element={ <Default/> } />
      <Route path="/AddUser" element={ <AddUser/> } />
      <Route path="/Details/:ProductId" element={ <Laptop/> } />
    </Routes>
  );
}

export default App;
