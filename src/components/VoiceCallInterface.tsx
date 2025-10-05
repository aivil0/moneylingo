import { Button } from "@/components/ui/button";
import { PhoneOff, Mic, MicOff } from "lucide-react";
import { useState, useEffect } from "react";

interface VoiceCallInterfaceProps {
  isActive: boolean;
  onEnd: () => void;
}

export const VoiceCallInterface = ({ isActive, onEnd }: VoiceCallInterfaceProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Simulate microphone input and AI speaking
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Simulate audio levels - slower updates for calming effect
      if (isAISpeaking) {
        setAudioLevel(Math.random() * 100);
      } else if (!isMuted) {
        setAudioLevel(Math.random() * 80);
      } else {
        setAudioLevel(0);
      }
    }, 300); // Slower update rate

    // Simulate AI speaking randomly
    const aiSpeakInterval = setInterval(() => {
      setIsAISpeaking((prev) => !prev);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(aiSpeakInterval);
    };
  }, [isActive, isMuted, isAISpeaking]);

  if (!isActive) return null;

  const circleScale = 1 + (audioLevel / 100) * 0.3; // Reduced scale range for calmer effect

  return (
    <div className="fixed inset-0 z-50 bg-white animate-fade-in">
      <div className="relative h-full flex flex-col items-center justify-between py-16 px-4">
        {/* Status indicator */}
        <div className="text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-base text-foreground font-medium">
              {isAISpeaking ? "AI is speaking..." : "Listening..."}
            </span>
          </div>
        </div>

        {/* Main sound wave circle - centered with proper spacing */}
        <div className="relative flex items-center justify-center flex-1">
          {/* Outer rings - no borders */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/5"
              style={{
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
                animation: `ping ${3 + i * 1.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                animationDelay: `${i * 0.5}s`,
                opacity: audioLevel > 10 ? 0.3 - i * 0.08 : 0.08,
              }}
            />
          ))}

          {/* Main circle with dynamic gradient */}
          <div
            className="relative z-10 rounded-full shadow-2xl ease-out"
            style={{
              width: "280px",
              height: "280px",
              transform: `scale(${circleScale})`,
              background: `linear-gradient(${audioLevel * 1.2}deg, hsl(180, 62%, ${35 + audioLevel / 8}%), hsl(192, 81%, ${50 + audioLevel / 12}%), hsl(25, 95%, ${63 + audioLevel / 15}%))`,
              transition: "all 800ms ease-in-out",
            }}
          >
          </div>
        </div>

        {/* Bottom section with buttons and info */}
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Call info */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-base text-foreground font-medium mb-2">
              Voice call active
            </p>
            <p className="text-sm text-muted-foreground">
              Ask me anything about finance
            </p>
          </div>

          {/* Control buttons */}
          <div className="flex items-center gap-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button
              size="icon"
              variant={isMuted ? "destructive" : "secondary"}
              onClick={() => setIsMuted(!isMuted)}
              className="h-20 w-20 rounded-full shadow-xl hover-lift"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>

            <Button
              size="icon"
              onClick={onEnd}
              className="h-20 w-20 rounded-full bg-destructive hover:bg-destructive/90 shadow-2xl hover-lift"
              aria-label="End call"
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>

          {/* Tips */}
          <div className="text-center animate-fade-in-up max-w-md" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-muted-foreground">
              💡 Speak naturally about credit, taxes, mortgages, or any financial topic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
