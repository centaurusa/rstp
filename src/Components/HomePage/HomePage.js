import React, { Component } from 'react';
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

    onInputChange(e) {
        const valid = this.validateInputUrl(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
            valid: valid
        });
    }

    validateInputUrl(value) {
        return value.startsWith('rtsp://');
    }

    render() {
        const { handleAddStream } = this.props;

        return (
            <div className={'AddStream'}>
                <form onSubmit={handleAddStream}> 
                    <input onChange={this.onInputChange} name={'inputUrlValue'} value={this.state.inputUrlValue} placeholder={'rtsp url'}/>
                    <button type="submit" disabled={!this.state.valid}>Add Stream</button>
                </form>
            </div>
        )
    }
}

export default HomePage;
