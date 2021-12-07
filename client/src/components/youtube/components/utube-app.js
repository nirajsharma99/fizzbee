import React, { useEffect } from 'react';
import youtube from '../youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import { useState } from 'react';
import '../style/utube.css';
import SwitchPlatform from '../youtube-switch';
function UtubeApp({ utubeMode, handleSwitch }) {
  const [{ current }, dispatch] = useDataHandlerValue();
  const [videos, setVideos] = useState();
  const [selectedVideo, setSelectedVideo] = useState();

  useEffect(() => {
    if (!current) return;
    fetchMyData();
  }, [current?.name]);

  async function fetchMyData() {
    const response = await youtube.get('/search', {
      params: {
        q: current.name,
      },
    });
    setVideos(response.data.items);
  }

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="utube-container">
      <div className="d-flex justify-content-end">
        <SwitchPlatform utubeMode={utubeMode} handleSwitch={handleSwitch} />
      </div>

      <div className="utube-results mt-3">
        <div className="w-100">
          <VideoDetail video={selectedVideo} />
        </div>
        <div>
          <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
        </div>
      </div>
    </div>
  );
}

export default UtubeApp;
