import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import Textfield from "@mui/material/TextField";
import Button from "@mui/material/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is a required field"),
});

const Login = () => {
  // const [login, setLogin] = useState("");
  const history = useHistory();
  // const [values, setValues] = useState({
  //   email: "",
  //   password: "",
  // });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });
  // const changeValue = (name, value) => {
  //   setValues({ ...values, [name]: value });
  // };
  const dispatch = useDispatch();
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
  //     .every((prop) => values[prop]);
  // };
  // const submit = async (e, values) => {
  //   e.preventDefault();
  //   if (checkValue()) {
  //     try {
  //       const res = await fetch(
  //         "https://forum-fullstack.herokuapp.com/api/login",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(values),
  //         }
  //       );
  //       // const res = await fetch('/api/login', {
  //       //     method: 'POST',
  //       //     headers: {'Content-Type': 'application/json'},
  //       //     body: JSON.stringify(values)
  //       // })
  //       const data = await res.json();
  //       if (data.result) {
  //         dispatch({
  //           type: "login",
  //           payload: {
  //             email: data.result.email,
  //             username: data.result.fullname,
  //           },
  //         });
  //         history.push("/discussions");
  //       } else {
  //         setLogin(data.error);
  //         setValues({ ...values, password: "" });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  return (
    <div className="container auth login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values) => {
          const res = await fetch(
            "https://forum-fullstack.herokuapp.com/api/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            }
          );
          // const res = await fetch("/api/login", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(values),
          // });
          const data = await res.json();
          if (data.result) {
            dispatch({
              type: "login",
              payload: {
                email: data.result.email,
                username: data.result.fullname,
              },
            });
            history.push("/discussions");
          } else {
            setErrorMsg({
              ...errorMsg,
              email: data.error.email,
              password: data.error.password,
            });
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
            <h1>Login</h1> <br />
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
      {/* <form onSubmit={(e) => submit(e, values)}>
        <h1>Login</h1>
        <div className={`input-container ${errors.email ? "error" : ""}`}>
          <label>Email</label>
          <input
            className="input"
            value={values.email}
            onChange={(e) => changeValue("email", e.target.value)}
          ></input>
          <div>{errors.email}</div>
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
        <div style={{ color: "red" }}>{login}</div>
      </form> */}
    </div>
  );
};

export default Login;
