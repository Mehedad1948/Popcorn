import React, { useRef, useEffect, useContext, memo } from 'react';
import { appContext } from '../ContextPeovider';
import { FaPause, FaPlay } from 'react-icons/fa';

const MusicPlayer = memo(function MusicPlayer({ setCurrentTime, setDuration }) {
  const { isPlaying, togglePlay, musics, currentMusic, setAudioElement } =
    useContext(appContext);

  const audioRef = useRef(null);

  useEffect(() => {
    setAudioElement(audioRef.current);
  }, [audioRef]);

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <div>
      <button
        onClick={togglePlay}
        className='fixed overflow-hidden flex items-center border-2 border-blue-600 justify-center
                     bottom-14  sm:bottom-6 right-4 sm:right-5 aspect-square rounded-full z-0
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
            `absolute center  translate-y-[250%] transition-transform duration-300 ease-in`
          }
        />
      </button>
      <div className='music-controls'>
        <audio
          onTimeUpdate={updateTime}
          onLoadedMetadata={() => setDuration(audioRef.current.duration)}
          ref={audioRef}
          preload='auto'
        >
          <source
            preload='auto'
            type='audio/mpeg'
          />
        </audio>
      </div>
    </div>
  );
});
export default MusicPlayer;
