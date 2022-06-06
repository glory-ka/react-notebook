import React from 'react';
import './TextArea.css';


class TextArea extends React.Component
{
    render () {
        return (
            <textarea 
                className='textarea' 
                value={this.props.textAreaData[this.props.currentNoteName]
                    ? this.props.textAreaData[this.props.currentNoteName] : ''}
                onChange={(event)=> this.props.onUserChange(event)}
                readOnly={this.props.currentNoteName.length > 0 ? false : true}
            ></textarea>
        );
    }
}

export default TextArea;