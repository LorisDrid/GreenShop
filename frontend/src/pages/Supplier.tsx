import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Supplier.scss";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Supplier: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    supplier: "",
    image: "",
    greenScore: "A",
    weight_value: "",
    weight_unit: "kg",
    distance_value: "",
    distance_unit: "km",
    transport_method: "ship",
    labels: [] as string[], // Labels sélectionnés
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [allLabels, setAllLabels] = useState<{ _id: string; name: string }[]>(
    [],
  ); // Labels sans images

  useEffect(() => {
    if (BACKEND_URL) {
      axios
        .get(`${BACKEND_URL}/labels`)
        .then((response) => {
          setAllLabels(response.data); // Supposons que la réponse est un tableau d'objets avec _id, name, et description
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des labels", error);
        });
    }
  }, [BACKEND_URL]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleLabelClick = (labelId: string) => {
    const isSelected = formData.labels.includes(labelId);

    const updatedLabels = isSelected
      ? formData.labels.filter((label) => label !== labelId) // Retirer le label s'il est déjà sélectionné
      : [...formData.labels, labelId]; // Ajouter le label s'il n'est pas sélectionné

    setFormData((prevFormData) => ({
      ...prevFormData,
      labels: updatedLabels,
    }));

    console.log("Labels sélectionnés :", updatedLabels);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Créer une copie mutable de formData
    const formDataCopy = { ...formData };

    // Définir l'image par défaut si aucune image n'est fournie
    formDataCopy.image = formDataCopy.image || "default.jpg";

    // Vérification des paramètres requis
    if (
      !formDataCopy.name ||
      !formDataCopy.price ||
      isNaN(Number(formDataCopy.price)) ||
      !formDataCopy.description ||
      !formDataCopy.supplier
    ) {
      setErrorMessage("Please fill in all required fields correctly.");
      return;
    }

    // Vérification des autres paramètres requis
    if (
      !formDataCopy.weight_value ||
      isNaN(Number(formDataCopy.weight_value)) ||
      !formDataCopy.weight_unit ||
      !formDataCopy.distance_value ||
      isNaN(Number(formDataCopy.distance_value)) ||
      !formDataCopy.distance_unit ||
      !formDataCopy.transport_method
    ) {
      setErrorMessage("Please fill in all required fields correctly.");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/items`, formDataCopy);
      console.log("Item created successfully:", response.data);
      // Réinitialiser le formulaire ou rediriger l'utilisateur
      setFormData({
        name: "",
        price: "",
        description: "",
        supplier: "",
        image: "",
        greenScore: "A",
        weight_value: "",
        weight_unit: "kg",
        distance_value: "",
        distance_unit: "km",
        transport_method: "ship",
        labels: [],
      });
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating item:", error);
      setErrorMessage("An error occurred while creating the item.");
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="form-container">
          <h2 className="title">Create New Item</h2>
          <img
            src={require("../assets/logout.png")}
            alt="Logout"
            className={"logoutButton"}
            onClick={handleLogout}
          />
          <form className="supplier-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group last">
                <label htmlFor="price" className="form-label">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label htmlFor="supplier" className="form-label">
                Supplier:
              </label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Image URL:
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="greenScore" className="form-label">
                Green Score:
              </label>
              <select
                id="greenScore"
                name="greenScore"
                value={formData.greenScore}
                onChange={handleChange}
                className="form-select"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="transportMethod" className="form-label">
                  Transport Method:
                </label>
                <select
                  id="transportMethod"
                  name="transportMethod"
                  value={formData.transport_method}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="ship">Ship</option>
                  <option value="train">Train</option>
                  <option value="truck">Truck</option>
                  <option value="plane">Plane</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Labels:</label>
              <div className="label-group">
                {allLabels.map((label) => (
                  <button
                    key={label._id}
                    type="button"
                    className={`label-button ${formData.labels.includes(label._id) ? "selected" : ""}`}
                    onClick={() => handleLabelClick(label._id)}
                  >
                    {label.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight_value" className="form-label">
                  Weight:
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    id="weight_value"
                    name="weight_value"
                    value={formData.weight_value}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  <select
                    id="weight_unit"
                    name="weight_unit"
                    value={formData.weight_unit}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="g">g</option>
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                    <option value="mt">mt</option>
                  </select>
                </div>
              </div>
              <div className="form-group last">
                <label htmlFor="distance_value" className="form-label">
                  Distance:
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    id="distance_value"
                    name="distance_value"
                    value={formData.distance_value}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  <select
                    id="distance_unit"
                    name="distance_unit"
                    value={formData.distance_unit}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="mi">mi</option>
                    <option value="km">km</option>
                  </select>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <button type="submit" className="btn-submit">
              Create Item
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Supplier;
