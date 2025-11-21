import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface DataPoint {
  id: number;
  content: string;
  relevant: boolean;
}

interface InformationAnalysisChallengeProps {
  onComplete: (score: "best" | "mid" | "poor") => void;
}

export const InformationAnalysisChallenge = ({ onComplete }: InformationAnalysisChallengeProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const dataPoints: DataPoint[] = [
    { id: 1, content: "Q3 sales increased 15% in European markets", relevant: true },
    { id: 2, content: "CEO attended charity gala last weekend", relevant: false },
    { id: 3, content: "New product line launches in 6 weeks", relevant: true },
    { id: 4, content: "Office cafeteria menu changed", relevant: false },
    { id: 5, content: "Customer satisfaction scores up 12%", relevant: true },
    { id: 6, content: "Competitor launched similar product yesterday", relevant: true },
    { id: 7, content: "Employee parking lot being renovated", relevant: false },
    { id: 8, content: "Supply chain delays expected next quarter", relevant: true },
  ];

  const toggleItem = (id: number) => {
    if (submitted) return;
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const relevant = dataPoints.filter(d => d.relevant).map(d => d.id);
    const selected = selectedItems;
    
    const correctSelections = selected.filter(id => relevant.includes(id)).length;
    const incorrectSelections = selected.filter(id => !relevant.includes(id)).length;
    const missedSelections = relevant.filter(id => !selected.includes(id)).length;

    let score: "best" | "mid" | "poor";
    if (correctSelections === relevant.length && incorrectSelections === 0) {
      score = "best";
    } else if (correctSelections >= 3 && incorrectSelections <= 1) {
      score = "mid";
    } else {
      score = "poor";
    }

    setSubmitted(true);
    setTimeout(() => onComplete(score), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Information Analysis
          </h2>
          <p className="text-xl text-muted-foreground">
            Select all relevant information for strategic decision-making
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {dataPoints.map((point) => (
            <motion.div
              key={point.id}
              whileHover={{ scale: submitted ? 1 : 1.02 }}
              whileTap={{ scale: submitted ? 1 : 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-smooth border-2
                  ${selectedItems.includes(point.id) 
                    ? 'border-accent bg-accent/10 shadow-glow-accent' 
                    : 'border-border hover:border-accent/50'
                  }
                  ${submitted && point.relevant && selectedItems.includes(point.id) 
                    ? 'border-green-500 bg-green-500/10' 
                    : ''
                  }
                  ${submitted && !point.relevant && selectedItems.includes(point.id) 
                    ? 'border-destructive bg-destructive/10' 
                    : ''
                  }
                  ${submitted && point.relevant && !selectedItems.includes(point.id) 
                    ? 'border-yellow-500 bg-yellow-500/10' 
                    : ''
                  }`}
                onClick={() => toggleItem(point.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${selectedItems.includes(point.id) 
                      ? 'border-accent bg-accent' 
                      : 'border-muted-foreground'
                    }`}
                  >
                    {selectedItems.includes(point.id) && (
                      <Check className="w-4 h-4 text-accent-foreground" />
                    )}
                  </div>
                  <p className="text-foreground">{point.content}</p>
                  {submitted && !point.relevant && selectedItems.includes(point.id) && (
                    <X className="w-5 h-5 text-destructive ml-auto flex-shrink-0" />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={selectedItems.length === 0 || submitted}
            size="lg"
            className="px-12 shadow-glow-accent"
          >
            {submitted ? "Analyzing..." : "Submit Analysis"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
