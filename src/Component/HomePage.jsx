import React, { useEffect } from 'react';
import { useGlobalState } from '../Global/GlobalState';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function HomePage() {
  const { globalState, setGlobalState } = useGlobalState();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGlobalState({
          ...globalState,
          items: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <div className="container mt-3">
        <Navbar />
        <div className="row mt-4">
          {globalState.items.map((ele, index) => {
            return (
              <Link
                to="/ProductDetails"
                state={{ productIndex: index }}
                className={`col-lg-3 col-md-4 col-sm-6 mb-4 ${ele.id}`}
                style={{textDecoration:'none'}}
                key={index}
              >
                <div className="card h-100">
                  <div className="card-body d-flex justify-content-center flex-column text-center align-items-center">
                    <img src={ele.image} alt="" className="img-fluid" />
                    <p className='text-dark fw-bold fs-7'>{ele.title}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
