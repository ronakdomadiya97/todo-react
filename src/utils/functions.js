import * as Yup from "yup";
import { employeesKey, validationMessage } from "./constant";

export const employeeValidationSchema = () => Yup.object().shape({
    name: Yup.string()
      .required(validationMessage?.name)
      .matches(/^\S.*$/, validationMessage?.noWhiteSpace),
    email: Yup.string()
      .required(validationMessage?.email)
      .email(validationMessage?.inValidEmail)
      .matches(/^\S.*$/, validationMessage?.noWhiteSpaceEmail),
    department: Yup.string().required(validationMessage?.department),
    gender: Yup.string().required(validationMessage?.gender),
    phone: Yup.string()
      .required(validationMessage?.phone)
      .matches(/^\d{10}$/, validationMessage?.tenDigit)
  });

export const getEmployee = () => JSON.parse(localStorage.getItem(employeesKey)) || [];

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}