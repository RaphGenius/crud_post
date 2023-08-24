import { useState, FormEvent, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createOneUser } from "../utils/fetchUsers";
import Input from "./Input";
import UserContainer from "./UserContainer";

export type UserFormData = {
  username: string;
  email: string;
  password: string;
};

function UserForm() {
  const [userForm, setUserForm] = useState<UserFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState("");
  const { mutate, data, isLoading } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data: UserFormData) => createOneUser(data),
  });

  useEffect(() => {
    setIsError(data?.message);
    setTimeout(() => {
      setIsError("");
    }, 2000);
  }, [data]);

  const handleUsername = (username: string) =>
    setUserForm({ ...userForm, username });

  const handleEmail = (email: string) => setUserForm({ ...userForm, email });

  const handlePassword = (password: string) =>
    setUserForm({ ...userForm, password });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(userForm);
  };
  console.log(data?.message);

  return (
    <div className="flex gap-4 px-8 mb-44 ">
      <div className="w-1/2 border border-teal-800 p-4 rounded-xl  ">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4 w-2/3 mx-auto "
        >
          <Input
            placeholder="username"
            handleChange={handleUsername}
            value={userForm.username}
          />
          <Input
            type="email"
            placeholder="email"
            handleChange={handleEmail}
            value={userForm.email}
          />
          <Input
            type="password"
            placeholder="password"
            handleChange={handlePassword}
            value={userForm.password}
          />
          <button
            disabled={isLoading}
            className={`p-2 bg-teal-800 rounded-lg hover:bg-teal-600  ${
              isLoading && "grayscale animate-pulse "
            } `}
            type="submit"
          >
            S'inscrire
          </button>
        </form>
      </div>
      <div className="w-1/2  ">
        {isError && isError}
        <h2
          className={`text-center capitalize font-bold bg-teal-50 bg-clip-text text-transparent text-xl`}
        >
          liste des utilisateurs
        </h2>
        <UserContainer />
      </div>
    </div>
  );
}

export default UserForm;
