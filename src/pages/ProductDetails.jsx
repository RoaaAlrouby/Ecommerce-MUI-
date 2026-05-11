import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartSlice";
import axios from "axios";
import { Box, Typography, Button, Chip, CircularProgress } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    };
    getProduct();
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 5, px: 2 }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>

        <Box sx={{ flexShrink: 0, width: { xs: "100%", md: "40%" } }}>
          <Box
            component="img"
            src={product.thumbnail}
            alt={product.title}
            sx={{ width: "100%", borderRadius: 2, border: "1px solid", borderColor: "divider", objectFit: "cover" }}
          />
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            {product.title}
          </Typography>

          <Typography variant="h4" color="success" fontWeight="bold">
            ${product.price}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignSelf: "center" }}>
            <Chip label={`Category: ${product.category}`} />
            <Chip label={`Brand: ${product.brand}`} />
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{ py: 1.5, fontWeight: "bold", bgcolor: "grey.900", color: "white", "&:hover": { bgcolor: "grey.700" }, width: "60%", alignSelf: "center" }}
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default ProductDetails;