
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, School, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = false; // Replace with actual auth state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b py-3">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <School className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">FairFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/fairs" className="text-gray-700 hover:text-primary transition-colors">
            Fairs
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
            Contact
          </Link>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-3 bg-white border-t animate-fade-in">
          <Link to="/" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/fairs" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>
            Fairs
          </Link>
          <Link to="/about" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/contact" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>
            Contact
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>
                Dashboard
              </Link>
              <Link to="/profile" className="block py-2 text-gray-700 hover:text-primary" onClick={toggleMenu}>
                Profile
              </Link>
              <Button variant="ghost" className="w-full justify-start">
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
