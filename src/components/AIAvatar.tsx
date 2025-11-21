import { motion } from "framer-motion";
import avatarImage from "@/assets/ai-avatar.png";

interface AIAvatarProps {
  message?: string;
  gesture?: "greeting" | "pointing" | "thinking" | "celebrating";
}

export const AIAvatar = ({ message, gesture = "greeting" }: AIAvatarProps) => {
  const gestureAnimations = {
    greeting: {
      rotate: [0, 5, -5, 0],
      transition: { duration: 2, repeat: Infinity }
    },
    pointing: {
      x: [0, 10, 0],
      transition: { duration: 1.5, repeat: Infinity }
    },
    thinking: {
      rotate: [0, -3, 3, 0],
      transition: { duration: 3, repeat: Infinity }
    },
    celebrating: {
      y: [0, -10, 0],
      scale: [1, 1.05, 1],
      transition: { duration: 1, repeat: Infinity }
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-6">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...gestureAnimations[gesture]
        }}
      >
        {/* NIVEA Avatar */}
        <img 
          src={avatarImage} 
          alt="NIVEA AI Assistant" 
          className="w-64 h-64 object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Message bubble */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <p className="text-foreground text-center text-lg leading-relaxed">
              {message}
            </p>
          </div>
          {/* Speech bubble arrow */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-card border-l border-t border-border rotate-45" />
        </motion.div>
      )}
    </div>
  );
};
