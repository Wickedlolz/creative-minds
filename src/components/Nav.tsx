import { Link } from "react-router-dom";
import { useFirebaseContext } from "../context/FirebaseContext";

const Nav = () => {
  const { user } = useFirebaseContext();

  return (
    <nav className="flex justify-between items-center py-3">
      <Link to="/">
        <h2 className="text-lg font-bold">Creative Minds</h2>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link to={"/auth/login"}>
            <p className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
              Join Now
            </p>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link to="/post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm hover:bg-cyan-400 duration-300">
                Post
              </button>
            </Link>
            <Link to="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL!}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
