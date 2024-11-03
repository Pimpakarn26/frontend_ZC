import React from 'react';
import Map from '../components/Map';
// import Navbar from '../components/Navbar';
import { Outlet } from "react-router-dom";
import StoreService from "../services/Store.services";
import { useEffect, useState } from "react";

const Home = () => {
    const [store, setStore] = useState({});
    useEffect(() => {
      const FetchStore = async () => {
        const respone = await StoreService.getAllStores();
        console.log(respone.data);
  
        setStore(respone);
      };
  
      FetchStore();
    }, []);
  
    return (
        <div>

            {/* <Navbar /> */}
            <div className="mt-24"></div>
            <Map />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Home;