import { useEffect, useRef, useState } from 'react';

function App() {
    const [playing, setPlaying] = useState(false);
    const [firstAudioPlayed, setFirstAudioPlayed] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);
    const backgroundVideoRef = useRef<HTMLVideoElement>(null);
    const audio1Ref = useRef<HTMLAudioElement | null>(null);
    const audio2Ref = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (playing && !firstAudioPlayed) {
            audio1Ref.current = new Audio('/first.mp3');
            audio2Ref.current = new Audio('/second.mp3');

            const playSecondAudioAndVideos = () => {
                backgroundVideoRef.current?.play();
                videoRef.current?.play();
                audio2Ref.current?.play();
            };

            audio1Ref.current.addEventListener('ended', () => {
                setFirstAudioPlayed(true);
                setOverlayVisible(false);
                playSecondAudioAndVideos();
            });

            audio1Ref.current.play();

            return () => {
                audio1Ref.current?.removeEventListener('ended', playSecondAudioAndVideos);
            };
        } else if (playing && firstAudioPlayed) {
            playSecondAudioAndVideos();
        }
    }, [playing, firstAudioPlayed]);

    const playSecondAudioAndVideos = () => {
        backgroundVideoRef.current?.play();
        videoRef.current?.play();
        if (audio2Ref.current) {
            audio2Ref.current.loop = true;
            audio2Ref.current.play();
        }
    };

    const handleClick = () => {
        if (!playing) {
            setPlaying(true);
        }
    };

    return (
        <>
            <div style={{ overflow: 'hidden' }}>
                <video ref={backgroundVideoRef} muted controls={false} loop playsInline onClick={handleClick}>
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                <video
                    ref={videoRef}
                    muted
                    controls={false}
                    playsInline
                    loop
                    onClick={handleClick}
                    style={{
                        width: '100%',
                        cursor: playing ? undefined : 'pointer',
                    }}
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                {overlayVisible && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 24,
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            zIndex: 1,
                            backdropFilter: 'blur(14px)',
                        }}
                        onClick={handleClick}
                    ></div>
                )}
            </div>
        </>
    );
}

export default App;
