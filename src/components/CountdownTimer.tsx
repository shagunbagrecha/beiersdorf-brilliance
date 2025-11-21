import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endDate: Date;
  className?: string;
}

export function CountdownTimer({ endDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = endDate.getTime();
      const difference = end - now;

      if (difference <= 0) {
        setExpired(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (expired) {
    return (
      <div className={`flex items-center gap-2 text-destructive font-semibold ${className}`}>
        <Clock className="w-4 h-4" />
        <span>Challenge Closed</span>
      </div>
    );
  }

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="w-4 h-4 text-primary" />
      <div className="flex gap-1 font-mono font-bold text-primary">
        <span>{pad(timeLeft.days)}</span>
        <span className="text-muted-foreground">:</span>
        <span>{pad(timeLeft.hours)}</span>
        <span className="text-muted-foreground">:</span>
        <span>{pad(timeLeft.minutes)}</span>
        <span className="text-muted-foreground">:</span>
        <span>{pad(timeLeft.seconds)}</span>
      </div>
    </div>
  );
}
