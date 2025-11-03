import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    player_name: "",
    jersey_number: "",
    position: "",
  });

  useEffect(() => {
    fetchTeamData();
  }, [id]);

  const fetchTeamData = async () => {
    try {
      // Fetch team
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .select("*")
        .eq("id", id)
        .single();

      if (teamError) throw teamError;
      setTeam(teamData);

      // Fetch players
      const { data: playersData, error: playersError } = await supabase
        .from("team_players")
        .select("*")
        .eq("team_id", id)
        .order("jersey_number", { ascending: true });

      if (playersError) throw playersError;
      setPlayers(playersData || []);
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("team_players").insert({
        team_id: id,
        player_name: newPlayer.player_name,
        jersey_number: newPlayer.jersey_number || null,
        position: newPlayer.position || null,
      });

      if (error) throw error;

      setNewPlayer({ player_name: "", jersey_number: "", position: "" });
      setShowAddPlayer(false);
      fetchTeamData();
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player");
    }
  };

  const handleDeletePlayer = async (playerId) => {
    if (!confirm("Remove this player from the team?")) return;

    try {
      const { error } = await supabase
        .from("team_players")
        .delete()
        .eq("id", playerId);

      if (error) throw error;
      fetchTeamData();
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!team) return <div className="p-8">Team not found</div>;

  return (
    <div className="p-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/teams")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Teams
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
        <p className="text-gray-600">{team.age_division}</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            Roster ({players.length} players)
          </h2>
          <Button onClick={() => setShowAddPlayer(!showAddPlayer)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Player
          </Button>
        </div>

        {showAddPlayer && (
          <form
            onSubmit={handleAddPlayer}
            className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4"
          >
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="player_name">Player Name *</Label>
                <Input
                  id="player_name"
                  value={newPlayer.player_name}
                  onChange={(e) =>
                    setNewPlayer({ ...newPlayer, player_name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="jersey_number">Jersey #</Label>
                <Input
                  id="jersey_number"
                  type="number"
                  value={newPlayer.jersey_number}
                  onChange={(e) =>
                    setNewPlayer({
                      ...newPlayer,
                      jersey_number: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newPlayer.position}
                  onChange={(e) =>
                    setNewPlayer({ ...newPlayer, position: e.target.value })
                  }
                  placeholder="e.g., Handler, Cutter"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Player</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddPlayer(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {players.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No players yet. Add your first player!
          </p>
        ) : (
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex justify-between items-center p-4 border rounded hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  {player.jersey_number && (
                    <span className="font-bold text-lg w-8">
                      {player.jersey_number}
                    </span>
                  )}
                  <div>
                    <p className="font-medium">{player.player_name}</p>
                    {player.position && (
                      <p className="text-sm text-gray-500">{player.position}</p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePlayer(player.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
