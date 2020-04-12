import React from "react";
import * as Yup from "yup";
import Col from "react-bootstrap/Col";
import { Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import Lodash from "lodash";
import "../assets/css/register-restaurant-v2.css";

import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormRow from "react-bootstrap/Form";
import TablesInput from "../components/TablesInput";

import FormikInput from "../components/Formik";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passwordRegExp = /^(?=.*\d).{8,15}$/;

const RegisterSchema = Yup.object().shape({
  tables: Yup.array().min(1, "Se nececita al menos una mesa"),
  name: Yup.string()
    .max(40, "Please enter no more than 40 characters")
    .required("Please enter your  name"),

  lastname: Yup.string()
    .max(40, "Please enter no more than 40 characters")
    .required("Please enter a last name"),
  email: Yup.string().email("Email is invalid").required("Email is required"),

  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRegExp, "invalid Password")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterRestaurantV2 = (props) => {
  const getFieldError = (listErrors, fieldName) => {
    return Lodash.get(listErrors, `${fieldName}`, null);
  }
  return (
    <Formik
      initialValues={{
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        repeatPassword: "",
        restaurantName: "",
        direction: "",
        tables: [],
        layoutFile: null,
        profileFile: null,
      }}
      validationSchema={RegisterSchema}
      onSubmit={(fields) => {
        console.log({ VALUES: fields });
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields))
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
        setFieldValue,
      }) => (
        <div className="register-restaurant">
          <Form>
            {console.log({ ERRORS: errors, VALUES: values })}

            <h4>Sobre el Host</h4>
            <Form.Row>
              <Form.Group as={Col} controlId="formname">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="name"
                  placeholder="Nombre"
                />
                <div className="error-message">
                  {getFieldError(errors, "name")}
                </div>
              </Form.Group>

              <Form.Group as={Col} controlId="formlastname">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="lastname"
                  placeholder="Apellido"
                />
                <div className="error-message">
                  {getFieldError(errors, "lastname")}
                </div>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>E-mail</Form.Label>
                <div>
                  <Form.Control
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                  />
                </div>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridTel">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="phone"
                  placeholder="Telefono"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRepPassword">
                <Form.Label>Rep.Contraseña</Form.Label>
                <Form.Control
                  value={values.repeatPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  name="repeatPassword"
                  placeholder="Rep.Contraseña"
                />
              </Form.Group>
            </Form.Row>

            <h4>Sobre el Restaurante</h4>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridRestaurant">
                <Form.Label>Nombre del Restaurante</Form.Label>
                <Form.Control
                  value={values.restaurantName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="restaurantName"
                  placeholder="Nombre del Restaurante"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridAddress">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  value={values.direction}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="direction"
                  placeholder="Direccion"
                />
              </Form.Group>
            </Form.Row>
            <FormikInput type={"tablesInput"} name={"tables"} />
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Layout del Restaurante</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Perfil del Restaurante</Form.Label>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} id="formGridFile">
                <div className="LayoutUploader">
                  <input
                    id="inputGroupFile01"
                    name="layoutFile"
                    value={values.layoutFile}
                    type="file"
                    multiple
                    class="custom-file-input"
                  />
                  <label class="custom-file-label" for="inputGroupFile01">
                    {Lodash.get(
                      values,
                      ["layoutFile", "name"],
                      "Layout del Restaurante"
                    )}
                  </label>
                </div>
              </Form.Group>
              <Form.Group as={Col} id="formGridFile2">
                <div className="ImageUploader">
                  <input
                    value={values.profileFile}
                    name="profileFile"
                    id="inputGroupFile02"
                    type="file"
                    multiple
                    class="custom-file-input"
                  />
                  <label class="custom-file-label" for="inputGroupFile02">
                    {Lodash.get(
                      values,
                      ["profileFile", "name"],
                      "Imagen de Perfil"
                    )}
                  </label>
                </div>
              </Form.Group>
            </Form.Row>

            <Button
              disabled={!isValid}
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Crear Cuenta
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterRestaurantV2;
