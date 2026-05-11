import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, deleteProduct } from "../redux/reducer/cartSlice";
import { Link } from "react-router-dom";
import { LanguagesContext } from "../context/LanguagesContext";
import {Box, Typography, Button, IconButton,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent,} from "@mui/material";

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cartSlice);
  const { lang } = useContext(LanguagesContext);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 8, p: 5, border: "1px solid", borderColor: "divider", borderRadius: 2, bgcolor: "background.paper", mx: "auto", maxWidth: 500 }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {lang === "en" ? "Your shopping cart is Empty" : "سلة المشتريات فارغة"}
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary" sx={{ mt: 2 }}>
          {lang === "en" ? "Start Shopping" : "ابدأ التسوق"}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 5, px: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {lang === "en" ? "Cart Summary" : "ملخص السلة"}
      </Typography>

      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.100" }}>
            <TableRow>
              <TableCell>{lang === "en" ? "Description" : "الوصف"}</TableCell>
              <TableCell align="center">{lang === "en" ? "Quantity" : "الكمية"}</TableCell>
              <TableCell align="center">{lang === "en" ? "Remove" : "حذف"}</TableCell>
              <TableCell align="center">{lang === "en" ? "Price" : "السعر"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component="img" src={item.thumbnail} alt={item.title} sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1 }} />
                    <Typography fontWeight="bold">{item.title}</Typography>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <IconButton size="small" color="success" onClick={() => dispatch(addToCart(item))} sx={{ border: "1px solid", borderColor: "success.main" }}>
                      +
                    </IconButton>
                    <Box sx={{ border: "1px solid", borderColor: "divider", px: 2, py: 0.5, borderRadius: 1, minWidth: 40, textAlign: "center" }}>
                      {item.quantity}
                    </Box>
                    <IconButton size="small" onClick={() => dispatch(removeFromCart(item.id))} sx={{ border: "1px solid", borderColor: "divider" }}>
                      −
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <IconButton color="error" onClick={() => dispatch(deleteProduct(item.id))}>
                    ✕
                  </IconButton>
                </TableCell>

                <TableCell align="center">
                  <Typography fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Card elevation={2} sx={{ minWidth: 220 }}>
          <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography color="text.secondary" mr={2}>
              {lang === "en" ? "Total" : "الإجمالي"}
            </Typography>
            <Typography variant="h5" fontWeight="bold">${totalPrice.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Cart;