import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import Swal from "sweetalert2";
import LocationMap from "./LocationMap";
import Tokenservice from "../services/token.services"; // ปรับเส้นทางให้ตรงกับที่คุณเก็บ Tokenservice
import StoreService from "../services/Store.services";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STORE_API = import.meta.env.VITE_STORE_API;

// Define custom icons
const storeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/256/1198/1198297.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const houseIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/256/12960/12960647.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

// Custom icon for selected store
const selectedStoreIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/256/11060/11060883.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

function Map() {
  const center = [13.838500199744178, 100.02534412184882];
  const [stores, setStores] = useState([]);
  const [myLocation, setMylocation] = useState({ lat: "", lng: "" });
  const [selectedStore, setSelectedStore] = useState(null);

  // const { user } = useAuthContext();
  const navigate = useNavigate();

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth radius in meters
    const phi_1 = (lat1 * Math.PI) / 180;
    const phi_2 = (lat2 * Math.PI) / 180;

    const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
    const delta_lambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) *
        Math.cos(phi_2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/stores`);
        console.log(response.data);
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  const handlerGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleLocationCheck = () => {
    if (!myLocation.lat || !myLocation.lng) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your valid location",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedStore) {
      Swal.fire({
        title: "Error!",
        text: "Please select a store",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      selectedStore.lat,
      selectedStore.lng
    );
    if (distance <= selectedStore.radius) {
      Swal.fire({
        title: "Success",
        text: "You are within the delivery zone for " + selectedStore.name,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "You are outside the delivery zone for " + selectedStore.name,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteStore = async (storeId) => {
    const accessToken = Tokenservice.getLocalAccessToken();
    console.log("Access Token:", accessToken); // ตรวจสอบว่ามี access token หรือไม่
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No access token found",
      });
      return;
    }
    // แสดง SweetAlert เพื่อให้ผู้ใช้ยืนยันการลบ
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${STORE_API}/${storeId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
            Swal.fire("Deleted!", "The store has been deleted.", "success").then(() => {
              // รีเฟรชหน้าเมื่อผู้ใช้กดปิด SweetAlert
              window.location.reload();
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error deleting store: " + error.message,
          });
        }
      }
    });
  };

  return (
    <>
      <div className="flex space-x-4 justify-center my-6">
        <button className="btn btn-outline btn-accent" onClick={handlerGetLocation}>
          Get My Location
        </button>

        <button className="btn btn-outline btn-secondary" onClick={handleLocationCheck}>
          Check Delivery Availability
        </button>
      </div>

      <div className="mapContainer w-full max-w-4xl">
        <MapContainer
          center={center}
          zoom={14}
          style={{ height: "75vh", width: "99vw" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stores.length > 0 &&
            stores.map((store) => (
              <Marker
                key={store.id}
                position={[store.lat, store.lng]}
                icon={
                  selectedStore && selectedStore.id === store.id
                    ? selectedStoreIcon
                    : storeIcon
                }
                eventHandlers={{
                  click: () => {
                    setSelectedStore(store);
                  },
                }}
              >
                <Popup className="popup">
  <b>{store.storeName}</b>
  <p>{store.address}</p>
  <p>Delivery Radius: {store.radius} meters</p>
  <a
    href={`https://www.google.com/maps/dir/?api=1&origin=${myLocation.lat},${myLocation.lng}&destination=${store.lat},${store.lng}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Get Direction
  </a>
  <button
    onClick={() => navigate(`/edit/${store.id}`)}
    className="popup-button"
  >
    Edit
  </button>
  <button
    onClick={() => handleDeleteStore(store.id)}
    className="popup-button"
  >
    Delete
  </button>
</Popup>

              </Marker>
            ))}

          <LocationMap
            myLocation={myLocation}
            icon={houseIcon}
            onLocationSelect={setMylocation}
          />

          {selectedStore && (
            <>
              <Circle
                center={[selectedStore.lat, selectedStore.lng]}
                radius={selectedStore.radius}
                color="#008163"
                fillColor="#008163"
                fillOpacity={0.2}
                weight={1.5}
              />
              <Marker
                position={[selectedStore.lat, selectedStore.lng]}
                icon={selectedStoreIcon}
              >
                <Popup>
                  <b>{selectedStore.name}</b>
                  <p>{selectedStore.address}</p>
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
