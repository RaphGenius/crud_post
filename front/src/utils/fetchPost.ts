import { FormData } from "../components/Form";
import { Post } from "../type/Post";

const BASE_URL = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
};
export const getAllPost = async (): Promise<Post[]> => {
  const data = await fetch(`${BASE_URL}/post`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return await data;
};

export const deleteOnePost = async (id: string) => {
  const deleteData = await fetch(`${BASE_URL}/post/${id}`, {
    method: "DELETE",
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return deleteData;
};

export const createOnePost = async (data: FormData) => {
  await fetch(`${BASE_URL}/post`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
