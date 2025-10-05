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
      // Simulate audio levels
      if (isAISpeaking) {
        setAudioLevel(Math.random() * 100);
      } else if (!isMuted) {
        setAudioLevel(Math.random() * 80);
      } else {
        setAudioLevel(0);
      }
    }, 100);

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

  const circleScale = 1 + (audioLevel / 100) * 0.5;

  return (
    <div className="fixed inset-0 z-50 bg-white animate-fade-in">

      <div className="relative h-full flex flex-col items-center justify-center px-4">
        {/* Status indicator */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">
              {isAISpeaking ? "AI is speaking..." : "Listening..."}
            </span>
          </div>
        </div>

        {/* Main sound wave circle */}
        <div className="relative flex items-center justify-center mb-12">
          {/* Main circle with gradient */}
          <div
            className="relative z-10 rounded-full bg-gradient-to-br from-primary via-primary/80 to-accent shadow-2xl transition-all duration-200 flex items-center justify-center"
            style={{
              width: "280px",
              height: "280px",
              transform: `scale(${circleScale})`,
            }}
          >

            {/* Sound bars around the circle */}
            {audioLevel > 20 && (
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 origin-left"
                    style={{
                      transform: `rotate(${i * 30}deg) translateX(-140px)`,
                    }}
                  >
                    <div
                      className="w-1 bg-primary-foreground/60 rounded-full transition-all duration-100"
                      style={{
                        height: `${10 + Math.random() * audioLevel / 2}px`,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Call duration */}
        <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-muted-foreground">
            Voice call active • Ask me anything about finance
          </p>
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Button
            size="icon"
            variant={isMuted ? "destructive" : "secondary"}
            onClick={() => setIsMuted(!isMuted)}
            className="h-16 w-16 rounded-full shadow-xl hover-lift"
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
            <PhoneOff className="h-7 w-7" />
          </Button>
        </div>

        {/* Tips */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-xs text-muted-foreground max-w-md">
            💡 Tip: Speak naturally and ask questions about credit, taxes, mortgages, or any financial topic
          </p>
        </div>
      </div>
    </div>
  );
};
