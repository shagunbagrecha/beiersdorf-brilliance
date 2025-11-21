import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIAvatar } from "@/components/AIAvatar";
import { CampusView } from "@/components/CampusView";
import { InformationAnalysisChallenge } from "@/components/challenges/InformationAnalysisChallenge";
import { MarketingCampaignChallenge } from "@/components/challenges/MarketingCampaignChallenge";
import { CrisisResponseChallenge } from "@/components/challenges/CrisisResponseChallenge";
import { VirtualMeetingChallenge } from "@/components/challenges/VirtualMeetingChallenge";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {gameState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-8"
          >
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-bold text-foreground mb-8 text-center"
            >
              Beiersdorf Campus
            </motion.h1>
            
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
          >
            <CampusView 
              onBuildingSelect={handleBuildingSelect}
              completedBuildings={completedBuildings}
            />
          </motion.div>
        )}

        {gameState === "challenge" && selectedBuilding && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
        )}

        {gameState === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-8"
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
