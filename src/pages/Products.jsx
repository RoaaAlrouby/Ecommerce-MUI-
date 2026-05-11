import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`https://dummyjson.com/products`);
      setProducts(res.data.products);
    };
    getProducts();
  },[]);

return (
  <div className="container py-5">
    <h2 className="text-center mb-5 fw-bold text-black"> Our Products</h2>
    <div className="row">
      {products.map(product => (
        <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card h-100 product-card shadow-sm">
            <img src={product.thumbnail} className="product-image" alt={product.title} />
            <div className="card-body d-flex flex-column">
              <h6 className="card-title fw-bold text-dark">{product.title}</h6>
              <p className="card-text text-muted small flex-grow-1">
                {product.description.substring(0, 60)}...
              </p>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="price-tag">${product.price}</span>
                <Link to={`/product/${product.id}`} className="btn btn-success btn-sm px-3 bg-success">
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};
export default Products;