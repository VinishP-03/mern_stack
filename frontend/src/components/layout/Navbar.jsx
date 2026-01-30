import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <Link to="/" className="font-bold">ExpenseTracker</Link>

      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.name}</span>
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-600">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
