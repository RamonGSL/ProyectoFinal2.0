import React, { useState } from "react";
import "./scss/SignInForm.scss";

import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { isEmailValid, isPasswordValid } from "./../../utils/validations";
import { size, values } from "lodash";
import { loginApi } from "./../../api/user";

export default function SignInForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [signInLoading, setsignInLoading] = useState(false);
  const requestServer = async (formData) => {
    let response = await loginApi(formData);
    return response;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (size(formData) !== validCount) {
      toast.warning("Complete all fields");
    } else {
      if (!isEmailValid(formData.Email)) {
        toast.warning("Invalid Email");
      } else if (!isPasswordValid(formData.Password)) {
        toast.warning("The password must be between 4 and 12 characters long");
      } else {
        setsignInLoading(true);

        try {
          let response = await requestServer(formData);
          if (response === "Correct Login") {
            toast.success(response);
            setRefreshCheckLogin(true);
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          } else if (response === null) {
            toast.error("Server error please try again later");
          } else {
            toast.error(response);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setsignInLoading(false);
        }
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(e.target.value);
  };

  return (
    <div className="sign-in-form">
      <h2>Login</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Form.Control
            type="email"
            name="Email"
            placeholder="The email of your account"
            defaultValue={formData.Email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            name="Password"
            placeholder="The password of your account"
            defaultValue={formData.Password}
          />
          <Button variant="primary" type="submit">
            {!signInLoading ? "Sign In" : <Spinner animation="border" />}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    Email: "",
    Password: "",
  };
}
