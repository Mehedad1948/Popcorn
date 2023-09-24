import { useState, useEffect } from 'react';

function useAudioThumbnail(audioUrl) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    async function fetchAudioMetadata() {
      try {
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        console.log('blob', blob);
        // Use a library or method to extract the thumbnail from the audio file's metadata.
        // Replace this logic with the actual implementation based on your requirements.
        // For simplicity, we'll assume a static URL for the thumbnail in this example.
        const extractedThumbnailUrl =
          'https://example.com/your-thumbnail-url.jpg';

        setThumbnailUrl(extractedThumbnailUrl);
      } catch (error) {
        console.error('Error fetching audio metadata:', error);
      }
    }

    fetchAudioMetadata();
  }, [audioUrl]);

  return thumbnailUrl;
}

export default useAudioThumbnail;
