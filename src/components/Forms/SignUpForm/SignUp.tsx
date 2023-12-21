import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./styles.module.css";
import Link from "next/link";
import Login from "../SignInForm/SignIn";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
}

const SignUpForm = () => {
  const [isSignedUp, setSignedUp] = useState(false);

  const initialValues: FormValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm password is required"),
    phone_number: Yup.string().required("Phone number is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    console.log(values);
    try {
      const response = await axios.post(
        "https://nikola-cucukovski.eu-1.sharedwithexpose.com/aircare/air-care/backend/singup.php",
        JSON.stringify(values)
      );
      console.log("API response:", response.data);
      resetForm();
      setSubmitting(false);
      setSignedUp(true); // Update the state to reflect that the user has signed up
    } catch (error) {
      console.error("API error:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server-side validation errors:", error.response.data);
      }
      setSubmitting(false);
    }
  };

  if (isSignedUp) {
    return <Login />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={`${styles.registerForm}`}>
          <h3>Креирај профил</h3>
          <div>
            <p className="mb-1">Внеси име</p>
            <Field
              style={{ height: "40px" }}
              placeholder="Name"
              type="text"
              name="first_name"
              className=" col-10 rounded border mb-4"
            />
            <ErrorMessage name="first_name" component="div" />
          </div>

          <div>
            <p className="mb-1">Внеси презиме</p>
            <Field
              style={{ height: "40px" }}
              placeholder="Surname"
              type="text"
              name="last_name"
              className="col-10 rounded border mb-4"
            />
            <ErrorMessage name="last_name" component="div" />
          </div>

          <div>
            <p className="mb-1">Внеси е-маил адреса</p>
            <Field
              style={{ height: "40px" }}
              placeholder="someone@email.com"
              type="email"
              name="email"
              className="col-10 rounded border mb-4"
            />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <p className="mb-1">Внеси лозинка</p>
            <Field
              style={{ height: "40px" }}
              placeholder="********"
              type="password"
              name="password"
              className="col-10 rounded border mb-4"
            />
            <ErrorMessage name="password" component="div" />
          </div>

          <div>
            <p className="mb-1">Потврди лозинка</p>
            <Field
              style={{ height: "40px" }}
              placeholder="********"
              type="password"
              name="confirm_password"
              className="col-10 rounded border mb-4"
            />
            <ErrorMessage name="confirm_password" component="div" />
          </div>

          <div>
            <p className="mb-1">Внеси телефонски број</p>
            <Field
              style={{ height: "40px" }}
              placeholder="Number"
              type="text"
              name="phone_number"
              className="col-10 rounded border mb-4"
            />
            <ErrorMessage name="phone_number" component="div" />
          </div>

          <div>
            {/* <Link href={"/sign-in"}> */}
            <button className={`${styles.registerBtn}`} type="submit" disabled={isSubmitting}>
              
              Регистрирај се
            </button>
            {/* </Link> */}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
