import { motion } from "framer-motion";
import { Database, Megaphone, AlertTriangle, Users } from "lucide-react";
import { Button } from "./ui/button";
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
      name: "Information Analysis",
      icon: <Database className="w-8 h-8" />,
      description: "Pattern Recognition & Data Filtering",
      position: { x: "20%", y: "30%" },
      completed: completedBuildings.includes(1),
    },
    {
      id: 2,
      name: "Marketing Campaign",
      icon: <Megaphone className="w-8 h-8" />,
      description: "Budget Allocation & Strategy",
      position: { x: "70%", y: "25%" },
      completed: completedBuildings.includes(2),
    },
    {
      id: 3,
      name: "Crisis Response",
      icon: <AlertTriangle className="w-8 h-8" />,
      description: "Breaking News Management",
      position: { x: "25%", y: "65%" },
      completed: completedBuildings.includes(3),
    },
    {
      id: 4,
      name: "Virtual Meeting",
      icon: <Users className="w-8 h-8" />,
      description: "Team Dynamics & Empathy",
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
            className="absolute"
            style={{ 
              left: building.position.x, 
              top: building.position.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Button
              onClick={() => onBuildingSelect(building.id)}
              className="relative group"
              variant="outline"
              size="lg"
            >
              <div className="flex flex-col items-center gap-3 p-6">
                {/* Icon Container */}
                <motion.div
                  className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-smooth
                    ${building.completed 
                      ? 'bg-accent text-accent-foreground shadow-glow-accent' 
                      : 'bg-card text-foreground border-2 border-border group-hover:border-accent'
                    }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {building.icon}
                  {building.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>

                {/* Building Info */}
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-foreground">
                    {building.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="bg-card border border-border rounded-full px-8 py-4 shadow-premium">
          <p className="text-foreground text-center">
            <span className="font-bold text-accent text-2xl">{completedBuildings.length}</span>
            <span className="text-muted-foreground mx-2">/</span>
            <span className="text-muted-foreground text-xl">4</span>
            <span className="text-muted-foreground ml-3">Fragments Recovered</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
