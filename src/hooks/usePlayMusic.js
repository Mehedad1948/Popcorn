import { useEffect, useRef, useState } from 'react';

export function usePlayMusic({name, composer, coverImage}) {
    

const audioRef = useRef(null);
const [isPlaying, setIsPlaying] = useState(false);

 const togglePlayPause = () => {
  navigator.mediaSession.metadata = new MediaMetadata({
      title: `${name}`,
      artit: `${composer}`,
      album: 'Cinema',
      artwork: [{
        "src": `${coverImage}`,
        "type": "image/jpg",
        "sizes": "192x192"
      },]
    })

  if (audioRef.current.paused) {
    audioRef.current.play();
  } else {
    audioRef.current.pause();
  }
  setIsPlaying(!isPlaying);
};

useEffect(() => {
  audioRef.current.addEventListener('ended', handleTrackEnd);

  return () => {
    audioRef.current.removeEventListener('ended', handleTrackEnd);
  };
}, []);

const handleTrackEnd = () => {
  audioRef.current.pause();
  setIsPlaying(false);

  if (onTrackEnd) {
    onTrackEnd();
  }
};

function onTrackEnd(params) {
  
}

return audioRef

}