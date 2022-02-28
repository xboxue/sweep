import { Avatar, AvatarProps } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";

const UserAvatar = (props: AvatarProps) => {
  const user = useSelector(selectUser);

  return <Avatar alt={user?.displayName} src={user?.photoURL} {...props} />;
};

export default UserAvatar;
