import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Users, Trophy, Home } from "lucide-react";
import { getRoleLabel } from "@/lib/roles";

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <img
                src="/logo.png"
                alt="Y-Ultimate"
                className="w-[5rem] h-auto object-contain"
              />
              <h1 className="text-xl font-bold text-gray-900">Y-Ultimate</h1>
            </div>

            {/* Navigation Links */}
            {user && (
              <nav className="hidden md:flex space-x-2">
                <Button
                  variant={
                    isActive("/dashboard") && location.pathname === "/dashboard"
                      ? "default"
                      : "ghost"
                  }
                  onClick={() => navigate("/dashboard")}
                  size="sm"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>

                {profile?.role === "team_manager" && (
                  <Button
                    variant={isActive("/teams") ? "default" : "ghost"}
                    onClick={() => navigate("/teams")}
                    size="sm"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    My Teams
                  </Button>
                )}

                {[
                  "tournament_director",
                  "team_manager",
                  "player",
                  "spectator",
                ].includes(profile?.role) && (
                  <Button
                    variant={isActive("/tournaments") ? "default" : "ghost"}
                    onClick={() => navigate("/tournaments")}
                    size="sm"
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Tournaments
                  </Button>
                )}
              </nav>
            )}
          </div>

          {/* User Info and Logout */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.name || user?.email}
                </p>
                <p className="text-xs text-gray-500">
                  {getRoleLabel(profile?.role)}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
