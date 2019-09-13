/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import VideoContext from 'videocontext';

const VideoContextViewer = (props) => {
  const canvasRef = useRef();
  const [ videoContext, setVideoContext ] = useState();

  const loadPlaylist = () => {
    props.playlist.forEach(({ type, sourceStart, start, duration, src }) => {
      const node = videoContext[type](src, sourceStart);
      node.startAt(start);
      node.stopAt(start + duration);
      node.connect(videoContext.destination);
    });
  };

  useEffect(() => {
    setVideoContext(() => new VideoContext(
      canvasRef.current,
      (err) => console.error(
        'There was problem instantiating the Video Context in Paper Cuts Player Viewer component',
        err,
      )
    ));

    if (videoContext) {
      loadPlaylist();
    }
  }, []);

  return (<canvas ref={ canvasRef } width={ props.width } height={ props.height } />);
};
VideoContextViewer.defaultProps = {
  width : 640,
  height : 360,
  playlist : [],
};

export default VideoContextViewer;
