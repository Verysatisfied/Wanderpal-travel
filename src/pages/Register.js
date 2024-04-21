import React, { useState } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    if (isMember) {
      dispatch(registerUser({ name, email, password }))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
          toast.success("Login successful!");
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      dispatch(registerUser({ name, email, password }))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
          toast.success("Registration successful!");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleDemoLogin = () => {
    const demoCredentials = {
      name: "test user",
      email: "demo@user.com",
      password: "password",
    };
    dispatch(registerUser(demoCredentials))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
        toast.success("Demo login successful!");
      })
      .catch((error) => {
        toast.error("Demo login failed");
      });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        {/* <Logo style={{ width: "50px", height: "auto" }} /> */}
        <h2>JourneyMate</h2>
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={handleDemoLogin}
        >
          Demo
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
