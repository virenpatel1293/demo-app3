import React from "react";
import { Routes, Route } from "react-router-dom";
import AddUser from "./Users/AddUser";
import Default from "./Default";
import Laptop from "./component/Laptop";
import MyGallery from "./component/MyGallery";

function App() {
 /* const [token, setToken] = useState(); */

 /* if(!token)
  return(<Login setToken={setToken} />) */

  return (
    <Routes>
      <Route path="/" element={ <Default/> } />
      <Route path="/AddUser" element={ <AddUser/> } />
      <Route path="/Details/:ProductId" element={ <Laptop/> } />
      <Route path="/Gallery" element={ <MyGallery/> } />
    </Routes>
  );
}

export default App;
