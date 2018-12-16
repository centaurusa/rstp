import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './HomePage.css';

 class HomePage extends Component {

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {
            inputUrlValue: '',
            valid: false
        }
    }

    static propTypes = {
        handleAddStream: PropTypes.func
    };  

    onInputChange(e) {
        const valid = this.validateInputUrl(e.target.value);
        
        this.setState({
            [e.target.name]: e.target.value,
            valid: valid
        });
    }
    /**
     * 
     * @param {input value} value
     * @description Validates url value 
     */
    validateInputUrl(value) {
        const regex = /rtsp:\/\/[0-9./A-Za-z:_]*/;
        return regex.test(value);
    }

    render() {
        const { handleAddStream } = this.props;

        return (
            <div className={'AddStream'}>
                <form onSubmit={(e) => handleAddStream(e, this.state.inputUrlValue)}> 
                    <input onChange={this.onInputChange} name={'inputUrlValue'} value={this.state.inputUrlValue} placeholder={'rtsp url'}/>
                    <button type="submit" disabled={!this.state.valid}>Add Stream</button>
                </form>
            </div>
        )
    }
}

export default HomePage;
