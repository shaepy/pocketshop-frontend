import { useEffect, useState } from "react";
import TestRunShops from "../services/TestRun";
import "./App.css";

function App() {
  // const [shops, setShops] = useState([]);
  // useEffect(() => {
  //   const fetchShops = async () => {
  //     const shops = await TestRunShops();
  //     console.log("shops",shops)
  //     setShops(shops);
  //   };

  //   fetchShops();
  // }, []);

  return (
    <>
      <h1>Welcome To PocketShop</h1>
      <ul>
        {/* {shops.map((shop) => (
          <li key={shop.id}>{shop.name}</li>
        ))} */}
      </ul>
    </>
  );
}

export default App;
