import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Users,
  Trophy,
  GraduationCap,
  Plus,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  // Sample stats - will be replaced with real data later
  const stats = [
    {
      title: "Active Tournaments",
      value: "0",
      description: "Ongoing and upcoming",
      icon: Trophy,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Coaching Programs",
      value: "0",
      description: "Currently running",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Participants",
      value: "0",
      description: "Kids enrolled",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Upcoming Events",
      value: "0",
      description: "Next 30 days",
      icon: CalendarDays,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const quickActions = [
    {
      label: "Create Tournament",
      icon: Trophy,
      action: () => navigate("/tournaments/create"),
    },
    {
      label: "Add Coaching Program",
      icon: GraduationCap,
      action: () => navigate("/coaching/create"),
    },
    {
      label: "Register Participant",
      icon: Users,
      action: () => navigate("/participants/register"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Y-Ultimate"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-xl font-bold text-gray-900">
                Y-Ultimate Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.name || user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {profile?.role || "User"}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.name?.split(" ")[0] || "Coach"}! 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your programs and tournaments today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-center justify-center space-y-2"
                    onClick={action.action}
                  >
                    <Icon className="w-8 h-8 text-purple-600" />
                    <span className="font-medium">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tournaments</CardTitle>
              <CardDescription>
                Your latest tournament activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No tournaments yet</p>
                <p className="text-sm mt-2">
                  Create your first tournament to get started
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Programs</CardTitle>
              <CardDescription>Your latest coaching activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No programs yet</p>
                <p className="text-sm mt-2">Add your first coaching program</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
