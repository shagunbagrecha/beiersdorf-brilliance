import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface VirtualMeetingChallengeProps {
  onComplete: (score: "best" | "mid" | "poor") => void;
}

interface Persona {
  name: string;
  role: string;
  trait: string;
  color: string;
  initials: string;
}

interface Scenario {
  id: number;
  situation: string;
  speaker: string;
  options: {
    text: string;
    value: "best" | "mid" | "poor";
  }[];
}

export const VirtualMeetingChallenge = ({ onComplete }: VirtualMeetingChallengeProps) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [responses, setResponses] = useState<Array<"best" | "mid" | "poor">>([]);

  const personas: Persona[] = [
    { name: "Sarah", role: "Team Lead", trait: "Direct & Results-focused", color: "bg-blue-500", initials: "SL" },
    { name: "Marcus", role: "Creative Director", trait: "Expressive & Emotional", color: "bg-purple-500", initials: "MD" },
    { name: "Aisha", role: "Data Analyst", trait: "Reserved & Detail-oriented", color: "bg-green-500", initials: "AA" },
    { name: "Tom", role: "Client Manager", trait: "Diplomatic & Cautious", color: "bg-orange-500", initials: "TM" },
  ];

  const scenarios: Scenario[] = [
    {
      id: 1,
      situation: "Sarah expresses frustration that deadlines are being missed repeatedly",
      speaker: "Sarah",
      options: [
        { text: "Acknowledge her concern and suggest process improvements for the team", value: "best" },
        { text: "Defend the team and point out external factors causing delays", value: "mid" },
        { text: "Minimize the issue and say everything will be fine", value: "poor" },
      ],
    },
    {
      id: 2,
      situation: "Marcus becomes visibly upset when his creative concept is critiqued",
      speaker: "Marcus",
      options: [
        { text: "Validate his creative vision while explaining strategic constraints", value: "best" },
        { text: "Move on quickly to avoid further conflict", value: "poor" },
        { text: "Suggest taking the discussion offline to discuss further", value: "mid" },
      ],
    },
    {
      id: 3,
      situation: "Aisha hasn't spoken during the meeting despite having relevant insights",
      speaker: "Aisha",
      options: [
        { text: "Directly invite her perspective on the data analysis", value: "best" },
        { text: "Continue the meeting without addressing it", value: "poor" },
        { text: "Ask if anyone else has thoughts to share", value: "mid" },
      ],
    },
  ];

  const handleResponse = (value: "best" | "mid" | "poor") => {
    const newResponses = [...responses, value];
    setResponses(newResponses);

    if (currentScenario < scenarios.length - 1) {
      setTimeout(() => setCurrentScenario(currentScenario + 1), 1000);
    } else {
      const bestCount = newResponses.filter(r => r === "best").length;
      const finalScore = bestCount >= 2 ? "best" : bestCount === 1 ? "mid" : "poor";
      setTimeout(() => onComplete(finalScore), 1500);
    }
  };

  const scenario = scenarios[currentScenario];

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Virtual Meeting Room
          </h2>
          <p className="text-xl text-muted-foreground">
            Navigate team dynamics with empathy and social awareness
          </p>
        </div>

        {/* Video Conference Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {personas.map((persona) => (
            <Card
              key={persona.name}
              className={`p-6 transition-all duration-smooth
                ${scenario.speaker === persona.name ? 'border-2 border-accent shadow-glow-accent' : 'border border-border'}
              `}
            >
              <div className="flex items-start gap-4">
                <Avatar className={`${persona.color} w-16 h-16`}>
                  <AvatarFallback className="text-white text-lg font-bold">
                    {persona.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {persona.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">{persona.role}</p>
                  <p className="text-xs text-muted-foreground italic">{persona.trait}</p>
                </div>
                {scenario.speaker === persona.name && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-3 h-3 bg-accent rounded-full"
                  />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Scenario */}
        <Card className="border-2 border-accent mb-8 shadow-premium">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-bold">
                Scenario {currentScenario + 1} of {scenarios.length}
              </span>
            </div>
            <p className="text-xl text-foreground mb-8">
              <span className="font-semibold">{scenario.speaker}:</span> {scenario.situation}
            </p>

            <div className="space-y-4">
              {scenario.options.map((option, index) => (
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
    </div>
  );
};
