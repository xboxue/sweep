import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

const useAuth = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
        dispatch(setUser(user));
      } else {
        localStorage.removeItem("token");
        dispatch(setUser(null));
      }
    });

    return unsubscribe;
  }, [auth, dispatch]);
};

export default useAuth;
