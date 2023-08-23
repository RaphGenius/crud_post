import { useState, useEffect } from "react";
import { Post } from "../type/Post";
import { deleteOnePost } from "../utils/fetchPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function PostITem(data: Post) {
  const queryClient = useQueryClient();
  const formatDate = new Date(data.createdAt).toLocaleString();
  const [isMounted, setIsMounted] = useState(false);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteOnePost(id),
    onSuccess: () => {
      setIsMounted(true), queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };
  console.log(isMounted);

  return (
    <div
      className={`p-2 font-mono border-teal-800 border rounded min-h-[200px] max-h-[200px] flex flex-col justify-between transition duration-200 ${
        isMounted && "scale-50 origin-center opacity-0"
      } `}
    >
      <h2 className="uppercase font-bold text-xl text-center">{data.title} </h2>
      <p className="text-justify w-full   ">{data.content} </p>
      <p className="text-sm italic">Creer le {formatDate} </p>
      <button
        onClick={() => handleDelete(data.id)}
        className=" border p-2 hover:bg-red-950 text-sm "
      >
        {mutation.isLoading ? "Suppression en cours..." : "Supprimer"}
      </button>
    </div>
  );
}

export default PostITem;
