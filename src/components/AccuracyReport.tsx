import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, TrendingUp, Target, Activity } from "lucide-react";

type SentimentType = "positive" | "negative" | "neutral";

interface ComparisonEntry {
  id: string;
  text: string;
  manualLabel: SentimentType;
  modelPrediction: SentimentType;
  isCorrect: boolean;
}

// Mock comparison data
const comparisonData: ComparisonEntry[] = [
  {
    id: "1",
    text: "This product exceeded my expectations! Outstanding quality.",
    manualLabel: "positive",
    modelPrediction: "positive",
    isCorrect: true,
  },
  {
    id: "2",
    text: "Terrible experience. Item arrived damaged.",
    manualLabel: "negative",
    modelPrediction: "negative",
    isCorrect: true,
  },
  {
    id: "3",
    text: "The product is okay, nothing special.",
    manualLabel: "neutral",
    modelPrediction: "neutral",
    isCorrect: true,
  },
  {
    id: "4",
    text: "Not bad, but could be better for the price.",
    manualLabel: "neutral",
    modelPrediction: "negative",
    isCorrect: false,
  },
  {
    id: "5",
    text: "Amazing quality! Highly recommend.",
    manualLabel: "positive",
    modelPrediction: "positive",
    isCorrect: true,
  },
  {
    id: "6",
    text: "Disappointing. Expected more features.",
    manualLabel: "negative",
    modelPrediction: "neutral",
    isCorrect: false,
  },
  {
    id: "7",
    text: "Good value for money, does the job.",
    manualLabel: "positive",
    modelPrediction: "neutral",
    isCorrect: false,
  },
  {
    id: "8",
    text: "Absolute waste of money. Do not buy!",
    manualLabel: "negative",
    modelPrediction: "negative",
    isCorrect: true,
  },
];

export const AccuracyReport = () => {
  const totalSamples = comparisonData.length;
  const correctPredictions = comparisonData.filter(d => d.isCorrect).length;
  const accuracy = ((correctPredictions / totalSamples) * 100).toFixed(1);

  // Calculate per-class metrics
  const positive = { tp: 0, fp: 0, fn: 0 };
  const negative = { tp: 0, fp: 0, fn: 0 };
  const neutral = { tp: 0, fp: 0, fn: 0 };

  comparisonData.forEach(entry => {
    const { manualLabel, modelPrediction } = entry;
    
    if (manualLabel === "positive") {
      if (modelPrediction === "positive") positive.tp++;
      else positive.fn++;
    }
    if (modelPrediction === "positive" && manualLabel !== "positive") positive.fp++;
    
    if (manualLabel === "negative") {
      if (modelPrediction === "negative") negative.tp++;
      else negative.fn++;
    }
    if (modelPrediction === "negative" && manualLabel !== "negative") negative.fp++;
    
    if (manualLabel === "neutral") {
      if (modelPrediction === "neutral") neutral.tp++;
      else neutral.fn++;
    }
    if (modelPrediction === "neutral" && manualLabel !== "neutral") neutral.fp++;
  });

  const calcMetrics = (tp: number, fp: number, fn: number) => {
    const precision = tp + fp > 0 ? ((tp / (tp + fp)) * 100).toFixed(1) : "0.0";
    const recall = tp + fn > 0 ? ((tp / (tp + fn)) * 100).toFixed(1) : "0.0";
    const f1 = tp + fp + fn > 0 ? ((2 * tp / (2 * tp + fp + fn)) * 100).toFixed(1) : "0.0";
    return { precision, recall, f1 };
  };

  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "positive": return "bg-positive/10 text-positive border-positive/20";
      case "negative": return "bg-negative/10 text-negative border-negative/20";
      case "neutral": return "bg-neutral/10 text-neutral border-neutral/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Accuracy Comparison Report
            </h1>
            <p className="text-lg text-muted-foreground">
              Manual Labels vs Model Predictions Analysis
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overall Accuracy</p>
                  <p className="text-3xl font-bold text-foreground">{accuracy}%</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {correctPredictions} of {totalSamples} correct
                  </p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </Card>

            <Card className="p-6 border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Correct Predictions</p>
                  <p className="text-3xl font-bold text-positive">{correctPredictions}</p>
                  <p className="text-xs text-muted-foreground mt-2">Matching labels</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-positive" />
              </div>
            </Card>

            <Card className="p-6 border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Incorrect Predictions</p>
                  <p className="text-3xl font-bold text-negative">{totalSamples - correctPredictions}</p>
                  <p className="text-xs text-muted-foreground mt-2">Misclassified</p>
                </div>
                <XCircle className="h-8 w-8 text-negative" />
              </div>
            </Card>
          </div>

          {/* Per-Class Metrics */}
          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Per-Class Performance Metrics
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sentiment</TableHead>
                    <TableHead className="text-right">Precision</TableHead>
                    <TableHead className="text-right">Recall</TableHead>
                    <TableHead className="text-right">F1 Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge className={getSentimentColor("positive")}>Positive</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{calcMetrics(positive.tp, positive.fp, positive.fn).precision}%</TableCell>
                    <TableCell className="text-right font-medium">{calcMetrics(positive.tp, positive.fp, positive.fn).recall}%</TableCell>
                    <TableCell className="text-right font-medium">{calcMetrics(positive.tp, positive.fp, positive.fn).f1}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className={getSentimentColor("negative")}>Negative</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{calcMetrics(negative.tp, negative.fp, negative.fn).precision}%</TableCell>
                    <TableCell className="text-right font-medium">{calcMetrics(negative.tp, negative.fp, negative.fn).recall}%</TableCell>
                    <TableCell className="text-right font-medium">{calcMetrics(negative.tp, negative.fp, negative.fn).f1}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className={getSentimentColor("neutral")}>Neutral</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{calcMetrics(neutral.tp, neutral.fp, neutral.fn).precision}%</TableCell>
                    <TableCell className="text-right font-medium">{calcMetrics(neutral.tp, neutral.fp, neutral.fn).recall}%</TableCell>
                    <TableCell className="text-right font-medium">{calcMetrics(neutral.tp, neutral.fp, neutral.fn).f1}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Detailed Comparison Table */}
          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Detailed Comparison
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Text</TableHead>
                    <TableHead>Manual Label</TableHead>
                    <TableHead>Model Prediction</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="max-w-md">
                        <p className="text-sm text-foreground truncate">{entry.text}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSentimentColor(entry.manualLabel)}>
                          {entry.manualLabel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSentimentColor(entry.modelPrediction)}>
                          {entry.modelPrediction}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {entry.isCorrect ? (
                          <div className="flex items-center gap-1 text-positive">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-xs font-medium">Correct</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-negative">
                            <XCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">Incorrect</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
