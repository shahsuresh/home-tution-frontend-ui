import * as Yup from "yup";

export const registerAdminValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .trim()
    .max(35, "First name must be at max 35 characters."),
  lastName: Yup.string()
    .max(35, "Last name must be at max 35 characters.")
    .trim()
    .required("Last name is required."),
  mobile: Yup.string().matches(
    /^\d{10}$/,
    "Mobile number must be exactly 10 digits"
  ),

  email: Yup.string()
    .email("Must be a valid email.")
    .required("Email is required")
    .trim()
    .max(65, "Email must be at max 65 characters.")
    .lowercase(),

  password: Yup.string()
    .required("Password is Required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long...")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .trim(),
  conformPassword: Yup.string("Confirm password is required").oneOf(
    [Yup.ref("password"), null],
    "Password and Conform Password must match"
  ),
  role: Yup.string()
    .required("role is required")
    .oneOf(["admin", "adminRolePending"])
    .default("adminRolePending"),
});

export const adminLoginDataValidationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email.")
    .required("Email is required")
    .trim()
    .max(65, "Email must be at max 65 characters.")
    .lowercase(),
  password: Yup.string()
    .required("Password Required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long...")
    .trim(),
});
