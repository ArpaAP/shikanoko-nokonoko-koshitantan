import { useEffect, useRef, useState } from "react";

function App() {
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) {
      const audio1 = new Audio("/first.mp3");
      const audio2 = new Audio("/second.mp3");

      setTimeout(() => {
        backgroundVideoRef.current?.play();
        videoRef.current?.play();
      }, 440);
      audio1.play();

      const handleAudio1TimeUpdate = () => {
        const buffer = 0.44;
        if (audio1.currentTime > audio1.duration - buffer) {
          audio2.play();
        }
      };

      const handleAudio2TimeUpdate = () => {
        const buffer = 0.44;
        if (audio2.currentTime > audio2.duration - buffer) {
          audio2.currentTime = 0;
          audio2.play();
        }
      };

      audio1.addEventListener("timeupdate", handleAudio1TimeUpdate);
      audio2.addEventListener("timeupdate", handleAudio2TimeUpdate);

      return () => {
        audio1.pause();
        audio2.pause();
        audio1.removeEventListener("timeupdate", handleAudio1TimeUpdate);
        audio2.removeEventListener("timeupdate", handleAudio2TimeUpdate);
      };
    }
  }, [playing]);

  return (
    <>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <video
          ref={backgroundVideoRef}
          muted
          controls={false}
          loop
          playsinline
          onClick={() => {
            setPlaying(true);
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 24,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            zIndex: 1,
            backdropFilter: "blur(14px)",
          }}
        >
          <video
            ref={videoRef}
            muted
            controls={false}
            loop
            onClick={() => {
              setPlaying(true);
            }}
            style={{
              width: "100%",
              cursor: playing ? undefined : "pointer",
            }}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}

export default App;
