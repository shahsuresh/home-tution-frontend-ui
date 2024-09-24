import * as Yup from "yup";

//?=====Register teacher validation schema==========

export const registerTeacherValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .trim()
    .max(35, "First name must be at max 35 characters."),
  lastName: Yup.string()
    .max(35, "Last name must be at max 35 characters.")
    .trim()
    .required("Last name is required."),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Must be a valid email.")
    .required("Email is required.")
    .trim()
    .max(65, "Email must be at max 65 characters.")
    .lowercase(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at max 20 characters.")
    .required("Password is required."),
  degree: Yup.string()
    .required("Your Degree is required.")
    .oneOf(
      ["+2", "Bachelor", "Master", "PHD"],
      "Degree must be +2,Bachelor,Master or PHD."
    ),
  subjects: Yup.string().required("Subject is required"),
  level: Yup.string()
    .required("For which level of student you want to teach")
    .oneOf(["SEE", "+2", "Bachelor"], "Level must be SEE or +2 or Bachelor")
    .default("SEE"),
  city: Yup.string()
    .required("Your City is Required")
    .max(60, "City Name must be of max 60 characters")
    .default("Kathmandu")
    .trim(),
  area: Yup.string()
    .required("local address area of your city is Required")
    .max(100, "City Name must be of max 100 characters")
    .default("Koteshwor")
    .trim(),
});

//?=====Login teacher validation schema==========

export const teacherLoginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is Required")
    .lowercase()
    .trim()
    .email("Must be a valid email"),
  password: Yup.string().required("Password is required"),
});

//?============== update admin password validation=====================

export const updateTeacherPasswordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .required("your current password is required")
    .trim()
    .max(20, "your current password must be at max 20 characters."),
  newPassword: Yup.string()
    .required("your new password is required")
    .min(6, "password must be of min 6 characters")
    .max(20, "password must be at max 20 characters.")
    .trim(),
  conformNewPassword: Yup.string()
    .required("Please confirm your password")
    .min(6, "password must be of min 6 characters")
    .max(20, "password must be at max 20 characters.")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
