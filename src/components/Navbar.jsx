import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { LanguagesContext } from "../context/LanguagesContext";
import { AppBar, Toolbar, Typography, Box, Select, MenuItem, Badge, IconButton, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const { items } = useSelector((state) => state.cartSlice);
  const { lang, setLang } = useContext(LanguagesContext);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ bgcolor: "background.paper" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          component={NavLink}
          to="/"
          variant="h6"
          fontWeight="bold"
          sx={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 1 }}
        >
          🛒 {lang === "en" ? "E-Store" : "متجري"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button component={NavLink} to="/" color="inherit" sx={{ textTransform: "none" }}>
            {lang === "en" ? "Products" : "المنتجات"}
          </Button>

          <Button component={NavLink} to="/login" color="inherit" sx={{ textTransform: "none" }}>
            {lang === "en" ? "Login" : "تسجيل الدخول"}
          </Button>

          <Select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            size="small"
            sx={{ minWidth: 110 }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ar">العربية</MenuItem>
          </Select>

          <IconButton component={NavLink} to="/cart" color="inherit">
            <Badge badgeContent={totalCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;