import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../Global/GlobalState";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

function ProductDetails() {
  const location = useLocation();
  const { globalState, setGlobalState } = useGlobalState();

  const notify = () => toast("Item added");
  const navigate = useNavigate();

  const productIndex = location.state;
  const product = globalState.items[productIndex.productIndex];
  console.log(product);

  const addProducts = (item) => {
    setGlobalState((prevState) => {
      notify();
      navigate("/cart");
      
      const itemExists = prevState.cart.some(
        (cartItem) => cartItem.id === item.id
      );

      if (!itemExists) {
        const newItem = { ...item, quantity: 1 };
        return {
          ...prevState,
          cart: [...prevState.cart, newItem],
        };
      }
      return prevState;
    });
  };

  return (
    <div className="container">
      <Navbar />
      <ToastContainer position="bottom-right" theme="light" />
      <div className="row">
        <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
          {product && product.image && (
            <img src={product.image} alt="" style={{height:'400px'}} className="img-fluid" />
          )}
        </div>
        <div className="col-lg-7 col-md-6 col-sm-12">
          <div>
            <h3>{product.title}</h3>
            <p>{product.rating.rate}⭐</p>
            <h2>₹{product.price}</h2>
          </div>
          <div className="py-4">
            <button
              className="buy-now-btn btn-warning border-warning"
              onClick={() => addProducts(product)}
            >
              ADD TO CART
            </button>
          </div>
          <div>
            <h3>Description</h3>
            <p className="text-secondary">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
