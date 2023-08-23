import PostITem from "./Post";
import { getAllPost } from "../utils/fetchPost";
import { useQuery } from "@tanstack/react-query";
function Container() {
  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: getAllPost,
  });
  let content;
  if (isLoading) {
    content = <p className="text-center">Chargement...</p>;
  } else if (!data || data.length < 1)
    content = (
      <p className="text-center">Aucune poste de creer pour l'instant</p>
    );
  else {
    content = data?.map((post) => <PostITem key={post.id} {...post} />);
  }
  return (
    <div className=" w-full mx-auto mb-20 grid grid-cols-3 gap-2 py-4 px-8 transition-all h-[450px] border border-red-200 overflow-y-scroll  ">
      {content}
    </div>
  );
}

export default Container;
