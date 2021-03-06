import React from 'react';
import PropTypes from 'prop-types';


const VideoStream = ({ title, url, allowFullScreen }) => {
  return (
    <iframe 
        title={title} 
        id={`fp_embed_player_${title}`} 
        src={`https://wcs5-eu.flashphoner.com:8888/embed_player?urlServer=&streamName=${url}&mediaProviders=WebRTC,Flash,MSE,WSPlayer`}
        frameBorder='4'
        scrolling='no'
        width='285'
        height='240'
        allowFullScreen={allowFullScreen}>
    </iframe>
  )
};

VideoStream.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    allowFullScreen: PropTypes.string
};

export default VideoStream;
