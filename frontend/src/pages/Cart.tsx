import React, { useEffect, useState } from "react";
import { Item } from "../interfaces/Item";
import TopNavHeader, { NavOption } from "../components/header/TopNavBar";
import Header from "../components/header/Header";
import Footer from "../components/Footer";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Récupérer les items du local storage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Fonction pour calculer le prix total et arrondir au centime près
  const calculateTotal = (items: Item[]) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(Math.round(total * 100) / 100);
  };

  // Fonction pour supprimer un item du cart
  const handleRemoveItem = (itemToRemove: Item) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== itemToRemove._id,
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const event = new CustomEvent("cartUpdated");
    window.dispatchEvent(event);
    calculateTotal(updatedCart);
  };

  // Fonction pour vider le cart
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    const event = new CustomEvent("cartUpdated");
    window.dispatchEvent(event);
    setTotalPrice(0);
  };

  // Fonction pour simuler une commande
  const handlePurchase = () => {
    // Implémenter la logique de commande
    alert("Commande passée avec succès !");
    handleClearCart(); // Vider le cart après la commande
  };

  return (
    <>
      <TopNavHeader selected={NavOption.Shop} />
      <Header />
      <div style={mainContainerStyles}>
        <div style={leftColumnStyles}>
          <div style={adContainerStyles}>
            <img
              src={require("../assets/ad/petit-ours.jpg")}
              alt="Ad Left"
              style={imageAdStyles}
            />
            <h3 style={adTitleStyles}>BD Petit Ours</h3>
          </div>
        </div>
        <div style={centerContentStyles}>
          <h2 style={headerStyles}>Votre Panier</h2>
          <div style={cartContentStyles}>
            {cartItems.length === 0 ? (
              <p style={emptyCartStyle}>Votre panier est vide.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item._id} style={cartItemStyles}>
                    <img
                      src={require(`../assets/products/${item.image}`)}
                      alt={item.name}
                      style={imageStyles}
                    />
                    <div style={itemDetailsStyles}>
                      <h3>{item.name}</h3>
                      <p>Prix : {item.price} €</p>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        style={removeButtonStyles}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
                <div style={footerStyles}>
                  <h3>Total : {totalPrice.toFixed(2)} €</h3>
                  <button onClick={handlePurchase} style={purchaseButtonStyles}>
                    Passer la commande
                  </button>
                  <button onClick={handleClearCart} style={clearButtonStyles}>
                    Vider le panier
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div style={rightColumnStyles}>
          <div style={adContainerStyles}>
            <img
              src={require("../assets/ad/courgette.jpg")}
              alt="Ad Right"
              style={imageAdStyles}
            />
            <h3 style={adTitleStyles}>Courgette Bio</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Styles
const mainContainerStyles: React.CSSProperties = {
  display: "flex",
  margin: "20px auto",
  minHeight: "calc(100vh - 100px)", // Ajuster selon la hauteur de votre header et footer
  alignItems: "center",
  justifyContent: "center",
  padding: "25px",
};

const leftColumnStyles: React.CSSProperties = {
  flex: "1",
  height: "700px",
  marginRight: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(230, 193, 167, 0.5)",
  border: "2px solid black",
};

const centerContentStyles: React.CSSProperties = {
  flex: "3",
};

const rightColumnStyles: React.CSSProperties = {
  flex: "1",
  height: "700px",
  backgroundColor: "rgba(230, 193, 167, 0.5)",
  marginLeft: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid black",
};

const cartStyles: React.CSSProperties = {
  padding: "20px",
};

const cartItemStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  borderBottom: "1px solid #ccc",
  paddingBottom: "10px",
};

const imageStyles: React.CSSProperties = {
  width: "100px",
  height: "100px",
  marginRight: "20px",
  objectFit: "cover",
};

const itemDetailsStyles: React.CSSProperties = {
  flexGrow: 1,
};

const removeButtonStyles: React.CSSProperties = {
  backgroundColor: "#ff6347",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "5px",
};

const footerStyles: React.CSSProperties = {
  marginTop: "20px",
  textAlign: "right",
};

const purchaseButtonStyles: React.CSSProperties = {
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "5px",
  marginRight: "10px",
};

const clearButtonStyles: React.CSSProperties = {
  backgroundColor: "#ff6347",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "5px",
};

const imageAdStyles: React.CSSProperties = {
  maxWidth: "90%",
  maxHeight: "1500px",
  objectFit: "cover",
};

const adContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  backgroundColor: "#FFFFFF",
  alignItems: "center",
  justifyContent: "center",
  height: "300px",
  width: "200px",
};

const adTitleStyles: React.CSSProperties = {
  marginTop: "10px",
  fontSize: "18px",
  fontWeight: "bold",
};

const headerStyles: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
  position: "relative",
  top: 0,
};

const cartContentStyles: React.CSSProperties = {
  minHeight: "200px", // Ajustez cette valeur selon vos besoins
};

const emptyCartStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "50px",
};
export default Cart;
