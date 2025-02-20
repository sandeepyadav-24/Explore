"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser, FiHeart, FiGlobe } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Close sidebar on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuOpen && !(event.target as HTMLElement).closest("#sidebar")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  return (
    <nav className="bg-[#05203C] text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold flex items-center gap-2">
          ✈️ <span className="text-blue-400">Explr</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg">
          <Link href="#" className="hover:text-blue-400 transition">
            Flights
          </Link>
          <Link href="#" className="hover:text-blue-400 transition">
            Hotels
          </Link>
          <Link href="#" className="hover:text-blue-400 transition">
            Car Hire
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          <FiGlobe className="text-xl cursor-pointer hover:text-blue-400 transition" />
          <FiHeart className="text-xl cursor-pointer hover:text-blue-400 transition" />

          {session ? (
            <>
              <span className="text-sm font-semibold">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="hover:text-blue-400 transition"
            >
              Login
            </button>
          )}

          <FiUser className="text-xl cursor-pointer hover:text-blue-400 transition" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar Menu for Mobile */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-[#05203C] shadow-lg transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50 p-5`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          <FiX />
        </button>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-6 text-lg mt-10">
          <Link href="#" className="hover:text-blue-400 transition">
            Flights
          </Link>
          <Link href="#" className="hover:text-blue-400 transition">
            Hotels
          </Link>
          <Link href="#" className="hover:text-blue-400 transition">
            Car Hire
          </Link>

          <FiGlobe className="text-xl cursor-pointer hover:text-blue-400 transition" />
          <FiHeart className="text-xl cursor-pointer hover:text-blue-400 transition" />

          {session ? (
            <>
              <span className="text-sm font-semibold">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="hover:text-blue-400 transition"
            >
              Login
            </button>
          )}

          <FiUser className="text-xl cursor-pointer hover:text-blue-400 transition" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
