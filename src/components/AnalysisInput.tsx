import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AnalysisInputProps {
  onAnalyze: (text: string) => void;
}

export const AnalysisInput = ({ onAnalyze }: AnalysisInputProps) => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      onAnalyze(text);
      setText("");
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 1000);
  };

  return (
    <Card className="p-6 border-border/50">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Analyze New Text</h3>
          <p className="text-sm text-muted-foreground">
            Enter text to get instant sentiment analysis
          </p>
        </div>
        <Textarea
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px] resize-none"
        />
        <Button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing || !text.trim()}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
        </Button>
      </div>
    </Card>
  );
};
