import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

function Register() {
    const navigate = useNavigate();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const initialValues = { name: "", email: "", username: "", password: "", confirmPassword: "" };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required").matches(emailRegex, "Invalid email format"),
        username: Yup.string().required("Username is required").matches(/^\S+$/, "Username can't contain spaces"),
        password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required").matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
    });

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 6, px: 2 }}>
            <Typography variant="h4" textAlign="center" mb={4} color="success" fontWeight="bold">
                Register
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => { console.log(values); navigate("/"); }}
            >
                {({ errors, submitCount, handleChange, handleBlur, values }) => (
                    <Form autoComplete="off">
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            <TextField name="name" label="Name" fullWidth value={values.name} onChange={handleChange} onBlur={handleBlur} 
                            error={submitCount > 0 && Boolean(errors.name)} helperText={submitCount > 0 && errors.name} />
                            <TextField name="email" label="Email" type="email" fullWidth value={values.email} onChange={handleChange} onBlur={handleBlur} 
                            error={submitCount > 0 && Boolean(errors.email)} helperText={submitCount > 0 && errors.email} />
                            <TextField name="username" label="Username" fullWidth value={values.username} onChange={handleChange} onBlur={handleBlur} 
                            error={submitCount > 0 && Boolean(errors.username)} helperText={submitCount > 0 && errors.username} autoComplete="off" />
                            <TextField name="password" label="Password" type="password" fullWidth value={values.password} onChange={handleChange} onBlur={handleBlur}
                             error={submitCount > 0 && Boolean(errors.password)} helperText={submitCount > 0 && errors.password} autoComplete="new-password" />
                            <TextField name="confirmPassword" label="Confirm Password" type="password" fullWidth value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                             error={submitCount > 0 && Boolean(errors.confirmPassword)} helperText={submitCount > 0 && errors.confirmPassword} />
                            <Button type="submit" variant="contained" color="success" size="large" fullWidth sx={{ mt: 1, py: 1.5, fontWeight: "bold" }}>
                                Register
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default Register;