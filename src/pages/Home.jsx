import React from 'react';
import Map from '../components/Map';
import Navbar from '../components/Navbar';
import { Outlet } from "react-router-dom";
import StoreService from "../services/Store.services";
import { useEffect, useState } from "react";

const Home = () => {
    const [stores, setStores] = useState({});
    useEffect(() => {
      const FetchStores = async () => {
        const respone = await StoreService.getAllStores();
        console.log(respone.data);
  
        setStores(respone);
      };
  
      FetchStores();
    }, []);
  
    return (
        <div>

            <Navbar />
            <div className="mt-24"></div>
            <Map />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Home;