import { useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function AudioPlayer({ setCurrentTime, setDuration }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLaded] = useState(false);
  const audioPlayer = useRef();

  const updateTime = () => {
    setCurrentTime(audioPlayer.current.currentTime);
  };

  function loadAudio(params) {
    audioPlayer.current.src = 'files/interstellar.mp3';
    audioPlayer.current.load();
  }

  function handlePlay(params) {
    setIsPlaying((s) => !s);
    if (!isLoaded) loadAudio();
    setIsLaded(true);

    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
  }
  return (
    <>
      <button
        onClick={handlePlay}
        className='fixed overflow-hidden flex items-center border-2 border-blue-600 justify-center
                     bottom-14 sm:bottom-6 right-4 sm:right-5 aspect-square rounded-full z-0
                     text-blue-100 bg-blue-800/60 backdrop-blur-sm w-10 sm:w-12 text-sm'
      >
        <FaPlay
          className={
            (isPlaying ? '-translate-y-[250%]' : '') +
            ' ' +
            `absolute center  transition-transform duration-300 ease-in`
          }
        />
        <FaPause
          className={
            (isPlaying ? '!-translate-y-0' : '') +
            ' ' +
            `absolute center translate-y-[250%] transition-transform duration-300 ease-in`
          }
        />
      </button>
      <audio
        onTimeUpdate={updateTime}
        onLoadedMetadata={() => setDuration(audioPlayer.current.duration)}
        className='hidden'
        ref={audioPlayer}
        id='audioPlayer'
        controls
      >
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
