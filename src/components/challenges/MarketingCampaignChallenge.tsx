import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface MarketingCampaignChallengeProps {
  onComplete: (score: "best" | "mid" | "poor") => void;
}

export const MarketingCampaignChallenge = ({ onComplete }: MarketingCampaignChallengeProps) => {
  const totalBudget = 100000;
  const [allocations, setAllocations] = useState({
    digital: 25,
    influencer: 25,
    traditional: 25,
    retail: 25,
  });

  const updateAllocation = (key: keyof typeof allocations, value: number) => {
    const total = Object.values(allocations).reduce((sum, v) => sum + v, 0);
    const remaining = 100 - (total - allocations[key]);
    const newValue = Math.min(value, remaining);
    setAllocations({ ...allocations, [key]: newValue });
  };

  const totalAllocated = Object.values(allocations).reduce((sum, v) => sum + v, 0);
  const remainingBudget = 100 - totalAllocated;

  const handleSubmit = () => {
    // Optimal allocation: digital-focused with influencer support
    const digitalWeight = allocations.digital;
    const influencerWeight = allocations.influencer;
    const traditionalWeight = allocations.traditional;

    let score: "best" | "mid" | "poor";
    if (digitalWeight >= 35 && influencerWeight >= 30 && traditionalWeight <= 20) {
      score = "best";
    } else if (digitalWeight >= 25 && influencerWeight >= 20) {
      score = "mid";
    } else {
      score = "poor";
    }

    onComplete(score);
  };

  const channels = [
    { 
      key: "digital" as const, 
      name: "Digital Marketing", 
      description: "Social media, SEO, online ads",
      icon: "📱"
    },
    { 
      key: "influencer" as const, 
      name: "Influencer Partnerships", 
      description: "Brand ambassadors, sponsored content",
      icon: "⭐"
    },
    { 
      key: "traditional" as const, 
      name: "Traditional Media", 
      description: "TV, radio, print advertising",
      icon: "📺"
    },
    { 
      key: "retail" as const, 
      name: "Retail Activation", 
      description: "In-store displays, promotions",
      icon: "🏪"
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Marketing Campaign Strategy
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Allocate your budget across channels to maximize impact
          </p>
          <div className="inline-block bg-card border border-border rounded-2xl px-8 py-4 shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Total Campaign Budget</p>
            <p className="text-3xl font-bold text-accent">
              ${totalBudget.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {channels.map((channel) => (
            <Card key={channel.key} className="p-8 border-2 border-border">
              <div className="flex items-start gap-6">
                <div className="text-5xl">{channel.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground mb-1">
                        {channel.name}
                      </h3>
                      <p className="text-muted-foreground">{channel.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-accent">
                        {allocations[channel.key]}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${((allocations[channel.key] / 100) * totalBudget).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Slider
                    value={[allocations[channel.key]]}
                    onValueChange={([value]) => updateAllocation(channel.key, value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="bg-card border border-border rounded-xl px-6 py-3">
            <p className="text-sm text-muted-foreground mb-1">Budget Remaining</p>
            <p className={`text-2xl font-bold ${remainingBudget === 0 ? 'text-accent' : 'text-foreground'}`}>
              {remainingBudget}%
            </p>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={totalAllocated !== 100}
            size="lg"
            className="px-12 shadow-glow-accent"
          >
            Launch Campaign
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
