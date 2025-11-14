import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { AnalysisInput } from "@/components/AnalysisInput";
import { SentimentChart } from "@/components/SentimentChart";
import { AnalysisList } from "@/components/AnalysisList";
import { TrendingUp, Smile, Frown, Activity } from "lucide-react";

type SentimentType = "positive" | "negative" | "neutral";

interface Analysis {
  id: string;
  text: string;
  sentiment: SentimentType;
  score: number;
  timestamp: Date;
}

// Mock data for demo
const initialAnalyses: Analysis[] = [
  {
    id: "1",
    text: "This product exceeded my expectations! The quality is outstanding and customer service was excellent.",
    sentiment: "positive",
    score: 0.92,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    text: "Terrible experience. The item arrived damaged and customer support was unhelpful.",
    sentiment: "negative",
    score: 0.88,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "3",
    text: "The product is okay. It does what it's supposed to do, nothing special.",
    sentiment: "neutral",
    score: 0.65,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "4",
    text: "Amazing! I love this so much, will definitely recommend to friends.",
    sentiment: "positive",
    score: 0.95,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: "5",
    text: "Not worth the price. Very disappointing quality for what you pay.",
    sentiment: "negative",
    score: 0.82,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
];

const chartData = [
  { date: "Mon", positive: 65, negative: 20, neutral: 15 },
  { date: "Tue", positive: 70, negative: 15, neutral: 15 },
  { date: "Wed", positive: 55, negative: 30, neutral: 15 },
  { date: "Thu", positive: 75, negative: 10, neutral: 15 },
  { date: "Fri", positive: 80, negative: 12, neutral: 8 },
  { date: "Sat", positive: 85, negative: 8, neutral: 7 },
  { date: "Sun", positive: 78, negative: 15, neutral: 7 },
];

const Index = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>(initialAnalyses);

  // Simple sentiment analysis function (for demo)
  const analyzeSentiment = (text: string): { sentiment: SentimentType; score: number } => {
    const positiveWords = ["good", "great", "excellent", "amazing", "love", "wonderful", "fantastic", "outstanding"];
    const negativeWords = ["bad", "terrible", "awful", "hate", "disappointing", "poor", "horrible", "worst"];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      return { sentiment: "positive", score: 0.7 + (Math.random() * 0.25) };
    } else if (negativeCount > positiveCount) {
      return { sentiment: "negative", score: 0.7 + (Math.random() * 0.25) };
    } else {
      return { sentiment: "neutral", score: 0.5 + (Math.random() * 0.25) };
    }
  };

  const handleAnalyze = (text: string) => {
    const { sentiment, score } = analyzeSentiment(text);
    
    const newAnalysis: Analysis = {
      id: Date.now().toString(),
      text,
      sentiment,
      score,
      timestamp: new Date(),
    };

    setAnalyses([newAnalysis, ...analyses]);
  };

  const positiveCount = analyses.filter(a => a.sentiment === "positive").length;
  const negativeCount = analyses.filter(a => a.sentiment === "negative").length;
  const neutralCount = analyses.filter(a => a.sentiment === "neutral").length;
  const totalCount = analyses.length;

  const overallSentiment = positiveCount > negativeCount ? "Positive" : 
                          negativeCount > positiveCount ? "Negative" : "Neutral";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border/50 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Que Sentiment Analysis
            </h1>
            <p className="text-lg text-muted-foreground">
              Analyze text sentiment in real-time with AI-powered insights and beautiful visualizations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Overall Sentiment"
              value={overallSentiment}
              subtitle={`Based on ${totalCount} analyses`}
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
            />
            <MetricCard
              title="Positive"
              value={`${Math.round((positiveCount / totalCount) * 100)}%`}
              subtitle={`${positiveCount} entries`}
              icon={Smile}
              className="border-positive/20"
            />
            <MetricCard
              title="Negative"
              value={`${Math.round((negativeCount / totalCount) * 100)}%`}
              subtitle={`${negativeCount} entries`}
              icon={Frown}
              className="border-negative/20"
            />
            <MetricCard
              title="Neutral"
              value={`${Math.round((neutralCount / totalCount) * 100)}%`}
              subtitle={`${neutralCount} entries`}
              icon={Activity}
              className="border-neutral/20"
            />
          </div>

          {/* Analysis Input */}
          <AnalysisInput onAnalyze={handleAnalyze} />

          {/* Chart and List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SentimentChart data={chartData} />
            <AnalysisList analyses={analyses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
