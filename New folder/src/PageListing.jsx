import React from 'react';
import './PageListing.css';


class NoteBookButton extends React.Component 
{
    render()
    {
        return (<button 
                className='listButton'
                data-name={this.props.noteBookName}
                onClick = {this.props.onButtonClick}
                >{this.props.noteBookName}</button>
        );
    };
}

class PageListing extends React.Component 
{

    render()
    {
        return (
            this.props.noteBookList.map( (noteBook, index) =>
                <NoteBookButton 
                    key={index} 
                    noteBookName={noteBook}
                    onButtonClick={this.props.onButtonClick}
                ></NoteBookButton>)
        );
    }
}


export default PageListing;