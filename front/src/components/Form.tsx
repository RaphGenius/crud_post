import { FormEvent, useState } from "react";
import Input from "./Input";
import pyramide from "../assets/pyramide.svg";
import { createOnePost } from "../utils/fetchPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface FormData {
  title: string;
  content: string;
}

function Form() {
  const [isFormShown, setIsFormShown] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
  });
  const queryClient = useQueryClient();
  const changeTitle = (title: string) => setForm({ ...form, title });
  const changeContent = (content: string) => setForm({ ...form, content });

  const mutation = useMutation({
    mutationFn: (data: FormData) => createOnePost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div
      className={`p-2 absolute bottom-0 transition-transform duration-200 w-full min-h-[50px]  ${
        isFormShown ? "translate-y-16  " : "translate-y-0"
      } `}
    >
      <div
        onClick={() => setIsFormShown((prev) => !prev)}
        className={`cursor-pointer absolute left-1/2 -translate-x-1/3 -top-8  w-8 z-20 ${
          isFormShown && "hover:-translate-y-1 transition hover:scale-110  "
        } `}
      >
        <img src={pyramide} alt="pyramide" />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex overflow-hidden justify-around relative gap-2 flex-wrap "
      >
        <Input
          value={form.title}
          handleChange={changeTitle}
          placeholder="Mon titre..."
        />
        <Input
          value={form.content}
          handleChange={changeContent}
          placeholder="Mon contenu..."
        />
        <button
          disabled={mutation.isLoading}
          type="submit"
          className="p-2 rounded bg-teal-800 hover:bg-teal-600 border-teal-800 border"
        >
          {mutation.isLoading ? "Chargement.." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default Form;
