import React, { useState } from "react";
import s from "./AddModal.module.css";

const AddModal = ({ isOpen, onRequestClose, onAddItem, title, options }) => {
  const [formData, setFormData] = useState({
    city: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddItem = () => {
    onAddItem(formData);
    setFormData({ city: "", startDate: "", endDate: "" });
    onRequestClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className={s.modal_content}>
        <h2>{title}</h2>
        <label>
          City:
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a city
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleAddItem}>Save</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddModal;
