export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: RoleType;
};

type RoleType = "USER" | "ADMIN";
