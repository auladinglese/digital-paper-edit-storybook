/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import VideoContextViewer from './VideoContextViewer';
import VideoContextProgressBar from './VideoContextProgressBar';
import VideoContextControls from './VideoContextControls';
import Row from 'react-bootstrap/Row';

const PreviewCanvas = (props) => {
  const videoContextRef = useRef();
  const videoContext =
    videoContextRef
    && videoContextRef.current
    && videoContextRef.current.videoContext;

  return (
    <>
      <Row
        className={ 'justify-content-center' }
        style={ { backgroundColor: 'black' } }
      >
        <VideoContextViewer
          ref={ videoContextRef }
          playlist={ props.playlist }
          height={ props.height }
        />
      </Row>
      <Row
        className={ 'justify-content-center' }
        style={ { backgroundColor: 'lightgrey' } }
      >
        <VideoContextProgressBar
          videoContext={ videoContext }
        />
      </Row>
      <Row
        style={
          {
            marginTop: '0.4em'
          }
        }
      >
        <VideoContextControls
          videoContext={ videoContext && videoContext }
        />
      </Row>
    </>
  );
};

PreviewCanvas.defaultProps = {
  playlist: []
};

export default PreviewCanvas;
