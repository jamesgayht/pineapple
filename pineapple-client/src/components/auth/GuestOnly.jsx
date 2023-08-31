import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export default function GuestOnly(props) {
  const { getUserFromToken } = useContext(AuthContext);
  const user = getUserFromToken();

  if (user) return <Navigate to={"/"} />;

  return <props.component></props.component>;
}
