import { createContext, useEffect, useRef, useState } from 'react';
import { useMusics } from './hooks/useMusics';
import useAudioThumbnail from './hooks/useAudioThumbnail';

export const appContext = createContext();

function ContextPeovider({ children }) {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const { data: musics, isLoading } = useMusics();
  const [currentMusic, setCurrentMusic] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState();

  function togglePlay() {
    if (!isPlaying) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      audioElement.pause();
    }
  }

  function setMetaData(music) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: `${music.name}`,
      artit: `${music.composer || 'Artist'}`,
      album: 'Cinema Paradiso',
      artwork: [
        {
          src: `${music.cover || './music-placeholder.jpg'}`,
          type: 'image/jpg',
          sizes: '192x192',
        },
      ],
    });
  }

  function handleToggleMusic(index) {
    setMetaData(musics[index]);
    if (index === currentMusic) {
      audioElement.src = musics[index].musicUrl;
      togglePlay();
    } else {
      audioElement.pause();
      setCurrentMusic(index);
      setIsPlaying(true);
      audioElement.src = musics[index].musicUrl;
      audioElement.play();
    }
  }

  useEffect(() => {
    const currentAudioElement = audioElement;

    if (currentAudioElement && musics) {
      // console.log('add event listener', musics?.length);
      currentAudioElement.addEventListener('ended', handleTrackEnd);
    }

    return () => {
      if (currentAudioElement) {
        // console.log('remove event listener');
        currentAudioElement.removeEventListener('ended', handleTrackEnd);
      }
    };
  }, [audioElement, musics]);

  function handleTrackEnd () {
    // Check if musics is available and not empty
    // console.log('cuurent before', currentMusic);
    // console.log('musics', musics);
    if (currentMusic === musics?.length - 1) {
      // console.log('end');
      setCurrentMusic(0);
      audioElement.pause();
      audioElement.src = musics[0].musicUrl;
      // audioElement.load()
      setMetaData(musics[0]);
      audioElement.play();

    } else {
      setCurrentMusic((current) => {
        // console.log('next');
        audioElement.pause();
        audioElement.src = musics[current + 1].musicUrl;
        audioElement.play();
        setMetaData(musics[current + 1]);
        return current + 1
      });
    }
    setIsPlaying(true);
  };

  return (
    <appContext.Provider
      value={{
        showSearchbar,
        setShowSearchbar,
        currentMusic,
        setCurrentMusic,
        isPlaying,
        setIsPlaying,
        musics,
        handleToggleMusic,
        setAudioElement,
        togglePlay,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export default ContextPeovider;
