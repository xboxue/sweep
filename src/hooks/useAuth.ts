import { getAuth, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

const useAuth = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
  }, [auth, dispatch]);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
      }
    });

    return unsubscribe;
  }, [auth]);
};

export default useAuth;
