import { motion } from "framer-motion";
import { Database, Megaphone, AlertTriangle, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import campusBackground from "@/assets/campus-background.png";

interface Building {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  position: { x: string; y: string };
  completed: boolean;
}

interface CampusViewProps {
  onBuildingSelect: (buildingId: number) => void;
  completedBuildings: number[];
}

export const CampusView = ({ onBuildingSelect, completedBuildings }: CampusViewProps) => {
  const buildings: Building[] = [
    {
      id: 1,
      name: "Roots",
      icon: <Database className="w-8 h-8" />,
      description: "Foundation & Knowledge Base",
      position: { x: "20%", y: "30%" },
      completed: completedBuildings.includes(1),
    },
    {
      id: 2,
      name: "Action",
      icon: <Megaphone className="w-8 h-8" />,
      description: "Strategic Implementation",
      position: { x: "70%", y: "25%" },
      completed: completedBuildings.includes(2),
    },
    {
      id: 3,
      name: "Connect",
      icon: <AlertTriangle className="w-8 h-8" />,
      description: "Adaptive Response",
      position: { x: "25%", y: "65%" },
      completed: completedBuildings.includes(3),
    },
    {
      id: 4,
      name: "Empower",
      icon: <Users className="w-8 h-8" />,
      description: "Team Leadership",
      position: { x: "75%", y: "70%" },
      completed: completedBuildings.includes(4),
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Campus Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${campusBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

      {/* Campus Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center pt-12 px-4"
      >
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Beiersdorf Campus
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select a building to begin your challenge and recover the formula fragments
        </p>
      </motion.div>

      {/* Buildings */}
      <div className="relative z-10 w-full h-full">
        {buildings.map((building, index) => (
          <motion.div
            key={building.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="absolute flex flex-col items-center gap-6"
            style={{ 
              left: building.position.x, 
              top: building.position.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Building Name Label on Top */}
            <div className="bg-primary text-primary-foreground px-6 py-2 rounded-lg shadow-glow-accent font-bold text-lg -mt-8">
              {building.name}
            </div>

            <Button
              onClick={() => onBuildingSelect(building.id)}
              className="relative group bg-card hover:bg-card/90 border-border"
              variant="outline"
              size="lg"
            >
              <div className="flex flex-col items-center gap-3 p-6 min-w-[240px]">
                {/* Icon Container */}
                <motion.div
                  className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-smooth
                    ${building.completed 
                      ? 'bg-accent text-accent-foreground shadow-glow-accent' 
                      : 'bg-primary/10 text-primary border-2 border-primary group-hover:border-accent group-hover:bg-accent/10'
                    }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {building.icon}
                  {building.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold shadow-glow-accent"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>

                {/* Building Info */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {building.description}
                  </p>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg px-4"
      >
        <div className="bg-card border border-border rounded-2xl px-8 py-6 shadow-premium">
          <div className="flex items-center justify-between mb-3">
            <p className="text-foreground font-semibold">Mission Progress</p>
            <p className="text-accent font-bold text-lg">
              {completedBuildings.length} / 4 Fragments
            </p>
          </div>
          <Progress value={(completedBuildings.length / 4) * 100} className="h-3" />
        </div>
      </motion.div>
    </div>
  );
};
