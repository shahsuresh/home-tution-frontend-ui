import * as Yup from "yup";

export const studentDataValidationSchema = Yup.object({
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
    .nullable()
    .trim()
    .max(65, "Email must be at max 65 characters.")
    .lowercase(),

  class: Yup.string()
    .required("Your class is required.")
    .oneOf(
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "Bachelor",
      ],
      "class must be from 1 to 10,11,12 or Bachelor."
    ),
  subjects: Yup.string().required("Subject is required"),
  timing: Yup.string()
    .required("At what timing you want your tution classes?")
    .oneOf(
      ["Morning", "Day", "Evening"],
      "Timing must be Morning, Day or Evening"
    )
    .default("Morning"),
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
  status: Yup.string()
    .required()
    .default("Pending")
    .oneOf(["Pending", "Completed"]),
});
