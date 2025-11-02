import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, MapPin, Plus } from "lucide-react";

export default function TournamentList() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const { data } = await supabase
      .from("tournaments")
      .select("*")
      .order("start_date", { ascending: false });

    setTournaments(data || []);
    setLoading(false);
  };

  const getStatusBadge = (status) => {
    const variants = {
      registration: "bg-blue-100 text-blue-800",
      ongoing: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
    };
    return variants[status] || variants.registration;
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tournaments</h1>
              <p className="text-gray-600 mt-1">Manage all your tournaments</p>
            </div>
            <Link to="/tournaments/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Tournament
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tournament Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <Card
              key={tournament.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Trophy className="h-8 w-8 text-purple-600" />
                  <Badge className={getStatusBadge(tournament.status)}>
                    {tournament.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{tournament.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(tournament.start_date).toLocaleDateString()} -{" "}
                  {new Date(tournament.end_date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {tournament.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {tournament.num_fields} fields
                </div>
                <Link to={`/tournaments/${tournament.id}`}>
                  <Button variant="outline" className="w-full mt-4">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {tournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tournaments yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first tournament
            </p>
            <Link to="/tournaments/create">
              <Button>Create Tournament</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
