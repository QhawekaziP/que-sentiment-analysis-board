import { Card } from "@/components/ui/card";
import { SentimentBadge } from "./SentimentBadge";
import { ScrollArea } from "@/components/ui/scroll-area";

type SentimentType = "positive" | "negative" | "neutral";

interface Analysis {
  id: string;
  text: string;
  sentiment: SentimentType;
  score: number;
  timestamp: Date;
}

interface AnalysisListProps {
  analyses: Analysis[];
}

export const AnalysisList = ({ analyses }: AnalysisListProps) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="p-6 border-border/50">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Analyses</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div 
              key={analysis.id} 
              className="p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <SentimentBadge sentiment={analysis.sentiment} score={analysis.score} />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTime(analysis.timestamp)}
                </span>
              </div>
              <p className="text-sm text-foreground line-clamp-2">{analysis.text}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
