import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../utils/fetchUsers";
import { UserType } from "../type/User";

export const UserItem = (data: UserType) => {
  return (
    <div className="border-b w-full border-teal-800 py-2 ">
      <p className="">Pseudo : {data.username} </p>
      <p className="whitespace-pre-wrap truncate">Email: {data.email} </p>
    </div>
  );
};

function UserContainer() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  if (isLoading) return <span className="animate-pulse">Chargement...</span>;
  if (isError) return <p>Erreur : {isError.valueOf()} </p>;
  if (users.length < 1 || users === undefined) return <p>Aucun utilisateur</p>;

  return (
    <div className="w-full flex flex-col overflow-x-hidden h-full overflow-y-scroll max-h-52  ">
      {users?.map((user) => (
        <UserItem key={user.id} {...user} />
      ))}
    </div>
  );
}

export default UserContainer;
