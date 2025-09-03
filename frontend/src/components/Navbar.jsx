import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { useContext, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:text-indigo-400 transition"
        >
          Task Management
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 top-0">
          {user ? (
            <>
              {/* User Badge with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-indigo-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-indigo-500 transition"
                >
                  {user.name} <ChevronDown size={25} />
                </button>
                {/* Dropdown */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20"
                    >
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-300">{user.role}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition text-sm font-semibold"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-indigo-500"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-indigo-500"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800 px-6 py-4 space-y-4 overflow-hidden"
          >
            {user ? (
              <>
                <p
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="bg-indigo-600 px-3 py-1 rounded-full text-sm font-medium cursor-pointer inline-block"
                >
                  {user.name}
                </p>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gray-700 rounded-lg shadow-lg p-4 space-y-2"
                    >
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-300">{user.role}</p>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition text-sm font-semibold"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-indigo-400 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-indigo-500"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
