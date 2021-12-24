import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Textfield from "@mui/material/TextField";
import Button from "@mui/material/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is a required field"),
  fullname: yup.string().required("Name is a required field"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is a required field"),
});

const Signup = () => {
  // const [values, setValues] = useState({
  //   email: "",
  //   fullname: "",
  //   password: "",
  // });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
  });
  // const changeValue = (name, value) => {
  //   setValues({ ...values, [name]: value });
  // };
  const history = useHistory();
  // const checkValue = () => {
  //   return Object.keys(values)
  //     .map((key) => {
  //       if (!values[key]) {
  //         setErrorMsg((prevState) => ({
  //           ...prevState,
  //           [key]: `${key} field must not be empty`,
  //         }));
  //       } else {
  //         setErrorMsg((prevState) => ({ ...prevState, [key]: `` }));
  //       }
  //       return key;
  //     })
  //     .every((key) => values[key]);
  // };
  // const submit = async (e) => {
  //   e.preventDefault();
  //   if (checkValue()) {
  //     try {
  //       const res = await fetch(
  //         "https://forum-fullstack.herokuapp.com/api/signup",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(values),
  //         }
  //       );
  //       // const res = await fetch('/api/signup', {
  //       //     method: 'POST',
  //       //     headers: {'Content-Type': 'application/json'},
  //       //     body: JSON.stringify(values)
  //       // })
  //       const data = await res.json();
  //       if (data.result) {
  //         setValues({ email: "", fullname: "", password: "" });
  //         history.push("/login");
  //       } else {
  //         setErrorMsg({ ...errorMsg, email: "This email has been taken" });
  //         setValues({ ...values, password: "" });
  //         console.log(data.error);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  return (
    <div className="container auth signup">
      <Formik
        initialValues={{ email: "", fullname: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values) => {
          const res = await fetch(
            "https://forum-fullstack.herokuapp.com/api/signup",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            }
          );
          // const res = await fetch("/api/signup", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(values),
          // });
          const data = await res.json();
          if (data.result) {
            history.push("/login");
          } else {
            setErrorMsg({ ...errorMsg, email: "Email has been taken" });
          }
        }}
      >
        {({
          errors,
          values,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
        }) => (
          <form onSubmit={handleSubmit}>
            <h1>Signup</h1> <br />
            <Textfield
              label="Email"
              name="email"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                (errors.email && touched.email) || errorMsg.email ? true : false
              }
              helperText={
                errors.email && touched.email ? errors.email : errorMsg.email
              }
              fullWidth
              required
            />{" "}
            <br /> <br />
            <Textfield
              label="Name"
              name="fullname"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                (errors.fullname && touched.fullname) || errorMsg.fullname
                  ? true
                  : false
              }
              helperText={
                errors.fullname && touched.fullname
                  ? errors.fullname
                  : errorMsg.fullname
              }
              fullWidth
              required
            />{" "}
            <br /> <br />
            <Textfield
              label="Password"
              name="password"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                (errors.password && touched.password) || errorMsg.password
                  ? true
                  : false
              }
              helperText={
                errors.password && touched.password
                  ? errors.password
                  : errorMsg.password
              }
              type="password"
              fullWidth
              required
            />{" "}
            <br /> <br />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </form>
        )}
      </Formik>
      {/* <form onSubmit={(e) => submit(e)}>
        <h1>Signup</h1>
        <div className={`input-container ${errors.email ? "error" : ""}`}>
          <label>Email</label>
          <input
            className="input"
            value={values.email}
            onChange={(e) => changeValue("email", e.target.value)}
          ></input>
          <div>{errors.email}</div>
        </div>
        <div className={`input-container ${errors.fullname ? "error" : ""}`}>
          <label>Name</label>
          <input
            className="input"
            value={values.fullname}
            onChange={(e) => changeValue("fullname", e.target.value)}
          ></input>
          <div>{errors.fullname}</div>
        </div>
        <div className={`input-container ${errors.password ? "error" : ""}`}>
          <label>Password</label>
          <input
            className="input"
            value={values.password}
            type="password"
            onChange={(e) => changeValue("password", e.target.value)}
          ></input>
          <div>{errors.password}</div>
        </div>
        <button type="submit" className="submit">
          Login
        </button>
      </form> */}
    </div>
  );
};

export default Signup;
