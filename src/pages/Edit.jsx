import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StoreService from "../services/Store.services";
import Swal from "sweetalert2";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [store, setStore] = useState({
      storeName: "",
      address: "",
      lat: "",
      lng: "",
      radius: "",
    });
    useEffect(() => {
        const fetchStore = async () => {
          try {
            const data = await StoreService.getStoreById(id);
            setStore({
              storeName: data.storeName || "", // Ensure it falls back to empty string
              address: data.address || "",
              lat: data.lat || "",
              lng: data.lng || "",
              radius: data.radius || "",
            });
          } catch (error) {
            console.error("Error fetching store:", error);
            // Keep the existing state
          }
        };

        fetchStore();
      }, [id]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setStore((prevStore) => ({
          ...prevStore,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const changes = [];
    
        // Check for changes and record them
        if (store.storeName !== "") changes.push(`Store Name: ${store.storeName}`);
        if (store.address !== "") changes.push(`Address: ${store.address}`);
        if (store.lat !== "") changes.push(`Latitude: ${store.lat}`);
        if (store.lng !== "") changes.push(`Longitude: ${store.lng}`);
        if (store.radius !== "")
          changes.push(`Radius: ${store.radius} m`);
    
        try {
          // Check if any changes were made before attempting to update
          if (changes.length === 0) {
            Swal.fire({
              title: "No changes!",
              text: "You didn't make any changes to update.",
              icon: "info",
              confirmButtonText: "OK",
            });
            return; // Exit the function if no changes
          }
          await StoreService.updateStore(id, store);
      const changeMessage = `You have updated the following:\n- ${changes.join(
        "\n- "
      )}`;
      Swal.fire({
        title: "Success!",
        text: changeMessage,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/home");
      });
    } catch (error) {
      console.error("Error updating store:", error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "There was an error updating the store.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your changes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7085d6",
      cancelButtonColor: "#d35",
      confirmButtonText: "Yes, go back!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/home");
      }
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#E8F7E9] to-[#C2EBC3]">
      <div className="card w-full max-w-sm shadow-lg bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-center">Edit Store</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={store.storeName} // Ensure this is correctly set
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">Address</label>
              <input
                type="text"
                name="address"
                value={store.address} // Ensure this is correctly set
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">Latitude</label>
              <input
                type="number"
                step="any"
                name="lat"
                value={store.lat} // Ensure this is correctly set
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">Longitude</label>
              <input
                type="number"
                step="any"
                name="lng"
                value={store.lng} // Ensure this is correctly set
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">Delivery Radius (m)</label>
              <input
                type="number"
                step="any"
                name="Radius"
                value={store.radius} // Ensure this is correctly set
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="card-actions justify-end">
              <button
                type="submit"
                className="btn bg-green-500 hover:bg-green-600"
              >
                Update Store
              </button>

              <button
                type="button"
                className="btn btn-error"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default Edit;