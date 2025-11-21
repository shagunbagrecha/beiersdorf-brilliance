import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIAvatar } from "@/components/AIAvatar";
import { CampusView } from "@/components/CampusView";
import { InformationAnalysisChallenge } from "@/components/challenges/InformationAnalysisChallenge";
import { MarketingCampaignChallenge } from "@/components/challenges/MarketingCampaignChallenge";
import { CrisisResponseChallenge } from "@/components/challenges/CrisisResponseChallenge";
import { VirtualMeetingChallenge } from "@/components/challenges/VirtualMeetingChallenge";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import beiersdorfLogo from "@/assets/beiersdorf-logo.png";

type GameState = "intro" | "campus" | "challenge" | "complete";
type Score = "best" | "mid" | "poor";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);
  const [completedBuildings, setCompletedBuildings] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<number, Score>>({});

  const handleStart = () => {
    setGameState("campus");
  };

  const handleBuildingSelect = (buildingId: number) => {
    if (completedBuildings.includes(buildingId)) return;
    setSelectedBuilding(buildingId);
    setGameState("challenge");
  };

  const handleChallengeComplete = (score: Score) => {
    if (selectedBuilding) {
      setScores({ ...scores, [selectedBuilding]: score });
      setCompletedBuildings([...completedBuildings, selectedBuilding]);
      
      if (completedBuildings.length + 1 === 4) {
        setGameState("complete");
      } else {
        setSelectedBuilding(null);
        setGameState("campus");
      }
    }
  };

  const calculateFinalCharacter = () => {
    const scoreValues = Object.values(scores);
    const bestCount = scoreValues.filter(s => s === "best").length;
    
    if (bestCount >= 3) return "Strategic Visionary";
    if (bestCount >= 2) return "Adaptive Leader";
    return "Emerging Talent";
  };

  const getBuildingName = (id: number) => {
    const names = { 1: "Roots", 2: "Action", 3: "Connect", 4: "Empower" };
    return names[id as keyof typeof names];
  };

  const handleBackToCampus = () => {
    setSelectedBuilding(null);
    setGameState("campus");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnimatePresence mode="wait">
        {gameState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-8 pt-24"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <img 
                src={beiersdorfLogo} 
                alt="Beiersdorf" 
                className="h-16 mx-auto mb-4 object-contain"
              />
              <h1 className="text-6xl font-bold text-foreground text-center">
                Beiersdorf Campus
              </h1>
            </motion.div>
            
            <AIAvatar 
              message="Welcome to the Beiersdorf Campus. A valuable formula has been stolen and divided into four fragments. Each fragment is hidden in one of our campus buildings. Are you ready to recover them?"
              gesture="greeting"
            />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Button 
                onClick={handleStart}
                size="lg"
                className="px-12 py-6 text-xl shadow-glow-accent"
              >
                Begin Mission
              </Button>
            </motion.div>
          </motion.div>
        )}

        {gameState === "campus" && (
          <motion.div
            key="campus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-16"
          >
            <div className="fixed top-20 left-6 z-50">
              <Breadcrumb>
                <BreadcrumbList className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-border shadow-premium">
                  <BreadcrumbItem>
                    <BreadcrumbLink className="flex items-center gap-2 text-foreground">
                      <Home className="w-4 h-4" />
                      Campus
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <CampusView 
              onBuildingSelect={handleBuildingSelect}
              completedBuildings={completedBuildings}
            />
          </motion.div>
        )}

        {gameState === "challenge" && selectedBuilding && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="pt-16"
          >
            <div className="fixed top-20 left-6 z-50">
              <Breadcrumb>
                <BreadcrumbList className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-border shadow-premium">
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={handleBackToCampus}
                      className="flex items-center gap-2 text-foreground cursor-pointer hover:text-accent transition-colors"
                    >
                      <Home className="w-4 h-4" />
                      Campus
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-accent font-semibold">
                      {getBuildingName(selectedBuilding)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {selectedBuilding === 1 && (
                <InformationAnalysisChallenge onComplete={handleChallengeComplete} />
              )}
              {selectedBuilding === 2 && (
                <MarketingCampaignChallenge onComplete={handleChallengeComplete} />
              )}
              {selectedBuilding === 3 && (
                <CrisisResponseChallenge onComplete={handleChallengeComplete} />
              )}
              {selectedBuilding === 4 && (
                <VirtualMeetingChallenge onComplete={handleChallengeComplete} />
              )}
            </motion.div>
          </motion.div>
        )}

        {gameState === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-8 pt-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="absolute inset-0 bg-gradient-accent rounded-3xl shadow-glow-accent"
                  />
                  <div className="absolute inset-4 bg-card rounded-2xl flex items-center justify-center">
                    <span className="text-6xl">✨</span>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl font-bold text-foreground mb-4">
                Mission Complete!
              </h1>
              <p className="text-2xl text-accent mb-8">
                You are a: {calculateFinalCharacter()}
              </p>
              
              <AIAvatar
                message="Excellent work! You've successfully recovered all four fragments of the formula. Your unique combination of skills makes you a valuable asset to the Beiersdorf team."
                gesture="celebrating"
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12"
              >
                <Button
                  onClick={() => {
                    setGameState("intro");
                    setCompletedBuildings([]);
                    setScores({});
                    setSelectedBuilding(null);
                  }}
                  size="lg"
                  className="px-12"
                >
                  Start New Assessment
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
