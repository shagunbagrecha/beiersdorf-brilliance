import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface CrisisResponseChallengeProps {
  onComplete: (score: "best" | "mid" | "poor") => void;
}

interface NewsAlert {
  id: number;
  headline: string;
  severity: "high" | "medium" | "low";
  options: {
    text: string;
    value: "best" | "mid" | "poor";
  }[];
}

export const CrisisResponseChallenge = ({ onComplete }: CrisisResponseChallengeProps) => {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [responses, setResponses] = useState<Array<"best" | "mid" | "poor">>([]);

  const alerts: NewsAlert[] = [
    {
      id: 1,
      headline: "Breaking: Competitor launches aggressive pricing campaign",
      severity: "high",
      options: [
        { text: "Immediately match competitor prices across all products", value: "poor" },
        { text: "Analyze impact and adjust strategy for key markets only", value: "best" },
        { text: "Wait and see how market responds before acting", value: "mid" },
      ],
    },
    {
      id: 2,
      headline: "Social media trend questions ingredient sustainability",
      severity: "medium",
      options: [
        { text: "Issue detailed transparency report and engage directly", value: "best" },
        { text: "Ignore the trend and continue current messaging", value: "poor" },
        { text: "Post generic statement about commitment to quality", value: "mid" },
      ],
    },
    {
      id: 3,
      headline: "Celebrity endorser involved in minor controversy",
      severity: "low",
      options: [
        { text: "Terminate partnership immediately to protect brand", value: "poor" },
        { text: "Monitor situation and prepare contingency plans", value: "best" },
        { text: "Release supportive statement backing the celebrity", value: "mid" },
      ],
    },
  ];

  const handleResponse = (value: "best" | "mid" | "poor") => {
    const newResponses = [...responses, value];
    setResponses(newResponses);

    if (currentAlert < alerts.length - 1) {
      setTimeout(() => setCurrentAlert(currentAlert + 1), 1000);
    } else {
      // Calculate overall score
      const bestCount = newResponses.filter(r => r === "best").length;
      const finalScore = bestCount >= 2 ? "best" : bestCount === 1 ? "mid" : "poor";
      setTimeout(() => onComplete(finalScore), 1500);
    }
  };

  const alert = alerts[currentAlert];

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Crisis Response Center
          </h2>
          <p className="text-xl text-muted-foreground">
            React quickly and strategically to emerging situations
          </p>
        </div>

        <div className="mb-8 flex justify-center gap-3">
          {alerts.map((_, index) => (
            <div
              key={index}
              className={`w-16 h-2 rounded-full transition-all duration-smooth
                ${index < currentAlert ? 'bg-accent' : ''}
                ${index === currentAlert ? 'bg-accent shadow-glow-accent' : ''}
                ${index > currentAlert ? 'bg-muted' : ''}
              `}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentAlert}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-2 border-destructive mb-8 shadow-premium">
              <div className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className={`p-4 rounded-xl
                    ${alert.severity === "high" ? 'bg-destructive/20 text-destructive' : ''}
                    ${alert.severity === "medium" ? 'bg-yellow-500/20 text-yellow-500' : ''}
                    ${alert.severity === "low" ? 'bg-blue-500/20 text-blue-500' : ''}
                  `}>
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                        ${alert.severity === "high" ? 'bg-destructive text-destructive-foreground' : ''}
                        ${alert.severity === "medium" ? 'bg-yellow-500 text-white' : ''}
                        ${alert.severity === "low" ? 'bg-blue-500 text-white' : ''}
                      `}>
                        {alert.severity} Priority
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Alert {currentAlert + 1} of {alerts.length}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {alert.headline}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {alert.options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleResponse(option.value)}
                        variant="outline"
                        className="w-full h-auto p-6 text-left justify-start hover:border-accent hover:shadow-glow-accent transition-all"
                      >
                        <span className="text-lg">{option.text}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
