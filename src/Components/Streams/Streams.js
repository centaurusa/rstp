import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoStream from './VideoStream/VideoStream';

class Streams extends Component {

    static defaultProps = {
        streams: []
    }

    static propTypes = {
        streams: PropTypes.array
    }

    render() {
        const { streams } = this.props;
        let streamLinks;

        if (streams.length > 0) {
            streamLinks = streams.map((stream, i) => {
                return <VideoStream 
                            title={stream._id}
                            key={stream._id}
                            url={stream.url}
                            allowFullScreen={'allowFullScreen'}
                        />
            });
        } else {
            streamLinks = <h4>No streams were added</h4>
        }


        return (
            <div className={'container'}>
                <div className={'row'}>
                    { streamLinks }
                </div>
            </div>
        )
    }
}

export default Streams;