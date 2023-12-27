import React, { useRef, useEffect, ReactNode } from 'react';

interface SharedProps {
  children: ReactNode;
}

const Shared: React.FC<SharedProps> = ({ children }) => {
  const heroVideo = '/assets/photos/heroVideo.mp4';

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set the playback rate to slow down the video
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Adjust this value to change the speed
    }
  }, []);

  return (
    <div className="relative">
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        // style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div
        className="absolute inset-0 bg-black bg-opacity-25"
        // style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
      ></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Shared;
