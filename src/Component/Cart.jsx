import React from "react";
import Navbar from "./Navbar";
import { useGlobalState } from "../Global/GlobalState";

const CardCheckout = ({ image, title, id, quantity, price }) => {
  const { globalState, setGlobalState } = useGlobalState();

  const removeProduct = (id) => {
    setGlobalState((prevState) => {
      const updatedCart = [...prevState.cart];

      const itemIndex = updatedCart.findIndex((cartItem) => cartItem.id === id);
      if (itemIndex !== -1) {
        updatedCart.splice(itemIndex, 1);
        return {
          ...prevState,
          cart: updatedCart,
        };
      }
      return prevState;
    });
  };

  const increaseQuantity = (id) => {
    const updatedCart = globalState.cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setGlobalState((prevState) => ({
      ...prevState,
      cart: updatedCart,
    }));
  };

  const decreaseQuantity = (id) => {
    const updatedCart = globalState.cart.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(item.quantity - 1, 1);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setGlobalState((prevState) => ({
      ...prevState,
      cart: updatedCart,
    }));
  };

  return (
    <div
      className="card shadow mb-3 d-flex justify-content-center flex-column text-center align-items-center cart-items"
      key={id}
    >
      <div className="d-flex">
        <div className="p-4">
          <img src={image} alt="" className="img-fluid" style={{height:'200px'}}/>
        </div>
        <div className="p-4 m-3 d-flex flex-column ">
          <p>{title}</p>
          <div className="d-flex justify-content-center align-items-center">
            <button className="border-danger btn-danger fw-bold text-dark" onClick={() => decreaseQuantity(id)}>-</button>
            <span className="mx-2 fw-bold" >{quantity}</span>
            <button className="border-danger btn-danger fw-bold text-dark" onClick={() => increaseQuantity(id)}>+</button>
          </div>
          <h4>₹{price}</h4>
        </div>
      </div>
      <button className="btn btn-danger my-3" onClick={() => removeProduct(id)}>
        Remove
      </button>
    </div>
  );
};

function Cart() {
  const { globalState } = useGlobalState();

  const totalPrice = () => {
    let totalPrice = 0;

    globalState.cart.map((ele) => {
      return (totalPrice += ele.price * ele.quantity);
    });
    return totalPrice;
  };

  return (
    <>
      <div className="container mt-3">
        <Navbar />
        <div className="w-100 m-auto">
          <div className="row">
            {globalState.cart.length > 0 ? (
              <>
                <div className="col-lg-8 col-md-12 mb-4">
                  {globalState.cart.map((ele, index) => {
                    return (
                      <CardCheckout
                        key={index}
                        image={ele.image}
                        title={ele.title}
                        id={ele.id}
                        quantity={ele.quantity}
                        price={ele.price}
                      />
                    );
                  })}
                </div>
                <div className="col-lg-4 col-md-12 p-4 card shadow checkout-card">
                  <div className="price-details">
                    <p>PRICE DETAILS</p>
                    <hr />
                  </div>
                  <div className="d-flex justify-content-between delivery-details">
                    <p className="m-0">
                      Price <span>1 item</span>
                    </p>
                    <p className="m-0">₹ {totalPrice()}</p>
                  </div>
                  <div className="d-flex justify-content-between delivery-details">
                    <p className="m-0">Delivery Charges</p>
                    <p className="text-success m-0">Free</p>
                  </div>
                  <div className="d-flex justify-content-between total-amount">
                    <p className="m-0">Total Amount</p>
                    <p className="m-0">₹ {totalPrice()}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-md-12 text-center">
                <h3>Cart is empty</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
