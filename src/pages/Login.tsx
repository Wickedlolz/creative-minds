import { useFirebaseContext } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

const Login = () => {
  const { user, signInWithGoogle } = useFirebaseContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    navigate("/");
  };

  return (
    <section className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          onClick={handleGoogleLogin}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </section>
  );
};

export default Login;
