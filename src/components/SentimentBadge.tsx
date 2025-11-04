import { Badge } from "@/components/ui/badge";
import { Smile, Frown, Minus } from "lucide-react";

type SentimentType = "positive" | "negative" | "neutral";

interface SentimentBadgeProps {
  sentiment: SentimentType;
  score?: number;
  className?: string;
}

export const SentimentBadge = ({ sentiment, score, className }: SentimentBadgeProps) => {
  const getIcon = () => {
    switch (sentiment) {
      case "positive":
        return <Smile className="w-3.5 h-3.5" />;
      case "negative":
        return <Frown className="w-3.5 h-3.5" />;
      case "neutral":
        return <Minus className="w-3.5 h-3.5" />;
    }
  };

  const getVariant = () => {
    switch (sentiment) {
      case "positive":
        return "default";
      case "negative":
        return "destructive";
      case "neutral":
        return "secondary";
    }
  };

  const getBgClass = () => {
    switch (sentiment) {
      case "positive":
        return "bg-positive/10 text-positive hover:bg-positive/20 border-positive/20";
      case "negative":
        return "bg-negative/10 text-negative hover:bg-negative/20 border-negative/20";
      case "neutral":
        return "bg-neutral/10 text-neutral hover:bg-neutral/20 border-neutral/20";
    }
  };

  return (
    <Badge className={`gap-1.5 font-medium capitalize ${getBgClass()} ${className}`}>
      {getIcon()}
      {sentiment}
      {score !== undefined && (
        <span className="ml-1 opacity-80">({Math.round(score * 100)}%)</span>
      )}
    </Badge>
  );
};
