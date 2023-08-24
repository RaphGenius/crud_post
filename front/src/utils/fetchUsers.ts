import { UserFormData } from "../components/UserForm";
import { UserType } from "../type/User";

const BASE_URL = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
};
export const getAllUsers = async (): Promise<UserType[]> => {
  const data = await fetch(`${BASE_URL}/user`, {
    headers,
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return await data;
};

export const createOneUser = async (user: UserFormData) => {
  const newUser = await fetch(`${BASE_URL}/user/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));

  const { access_token } = newUser;

  localStorage.setItem("token", JSON.stringify(access_token));
  return await newUser;
};
