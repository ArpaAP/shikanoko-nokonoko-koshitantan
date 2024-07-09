import { useEffect, useRef } from "react";

function App() {
  useEffect(() => {
    const audio = new Audio("/first.mp3");
    audio.play();

    const handleEnd = () => {
      audio.src = "/second.mp3";
      audio.loop = true;
      audio.play();
    };

    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("ended", handleEnd);
    };
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <div className="w-full h-full"></div>
    </>
  );
}

export default App;
