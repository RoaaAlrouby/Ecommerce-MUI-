import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").matches(emailRegex, "Invalid email format"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required").matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  });

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6, px: 2 }}>
      <Typography variant="h4" textAlign="center" mb={4} color="success.main" fontWeight="bold">
        Login
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => { console.log(values); navigate("/"); }}
      >
        {({ errors, submitCount, handleChange, handleBlur, values }) => (
          <Form autoComplete="off">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField name="email" label="Email" type="email" fullWidth value={values.email} onChange={handleChange} onBlur={handleBlur}
               error={submitCount > 0 && Boolean(errors.email)} helperText={submitCount > 0 && errors.email} />
              <TextField name="password" label="Password" type="password" fullWidth value={values.password} onChange={handleChange} onBlur={handleBlur} 
              error={submitCount > 0 && Boolean(errors.password)} helperText={submitCount > 0 && errors.password} autoComplete="new-password" />
              <Button type="submit" variant="contained" color="success" size="large" fullWidth sx={{ mt: 1, py: 1.5, fontWeight: "bold" }}>
                Login
              </Button>

              <Typography textAlign="center" color="text.secondary">
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "green", fontWeight: "bold", textDecoration: "none" }}>
                  Register
                </Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default Login;