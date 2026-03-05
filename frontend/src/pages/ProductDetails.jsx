import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await axiosInstance.get(`/products/${id}`);

        setProduct(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProduct();

  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (

    <div style={{ padding: "40px" }}>

      <h1>{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        width="350"
      />

      <h2>₹{product.price}</h2>

      <p>{product.description}</p>

      <button
        style={{
          padding: "10px 20px",
          background: "#ff9900",
          border: "none",
          color: "#fff",
          fontSize: "16px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Add To Cart
      </button>

    </div>
  );
}