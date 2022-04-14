import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { onAuthStateChanged } from "../services/firebase";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      if (user) {
        const result = await user.getIdTokenResult();
        localStorage.setItem("token", result.token);

        dispatch(
          setUser({
            ...user,
            businessId: result.claims.businessId as number | undefined,
          })
        );
      } else {
        localStorage.removeItem("token");
        dispatch(setUser(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);
};

export default useAuth;
