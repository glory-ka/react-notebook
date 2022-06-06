import React from 'react';
import './EditorNavBar.css';
import SvgPlusLogo from './SvgPlusLogo';
import SvgCrossLogo from './SvgCrossLogo';



class NavBarRightButtons extends React.Component 
{
    render()
    {
        return (
            <div className='notebook-option-container'>
                <button className="button-option" 
                        onClick={this.props.editUserNoteName}>Edit</button>
                <button className="button-option"
                        onClick={this.props.deleteUserNote}
                >Delete</button>
                <button className="button-option" 
                        style={{background:'transparent', border: 'none', textAlign: 'center'}}
                        onClick={this.props.toggleUserForm}
                >
                    <SvgCrossLogo showForm={this.props.showForm}></SvgCrossLogo>
                    <SvgPlusLogo showForm={this.props.showForm}></SvgPlusLogo>
                </button> 
            </div>
        );
    };
}


class NavBarMiddleHiddenButtons extends React.Component 
{
    render()
    {
        return (
            <div className='confirmation' 
                 style={this.props.showQuestion? {display:'block'} : {}}>
                <span className='confirmation-message'>Do you want to continue?</span>
                <button className='confirmation-ok button-option' 
                        onClick={this.props.addUpdateNoteToList}>OK</button>
                <button className='confirmation-cancel button-option'
                        onClick={this.props.toggleUserQuestion}>Cancel</button>
            </div>
        );
    };
}

class NavBarMiddleHiddenForm extends React.Component
{
    render()
    {
        //const newUpdateNoteName = this.props.newUpdateNoteName && Object.values(this.props.newUpdateNoteName);

        return(
            <form 
                className='userForm'
                onSubmit={this.props.toggleUserQuestion} 
                style={this.props.showForm? {display:'block'} : {}}>
            <label style={{display:'flex', justifyContent:'space-between'}}>
                New Note Name
                <button onClick={this.props.toggleUserForm}>X</button>
            </label>
            <input  type="text" 
                    placeholder='Enter new name here...' 
                    onChange={this.props.handleTextInput}
                    value={this.props.newUpdateNoteName && Object.values(this.props.newUpdateNoteName)[0]}
            />
            <input type="submit" value="Submit" />
          </form>
        );
    };
}

class EditorNavBar extends React.Component 
{
    render()
    {
        return (
            <div className='navbar-container'>
                <nav className='editor-navbar'>
                    <div className='notebook-name-container'>
                        <span className='notebook-name'>{this.props.currentNoteName}</span>
                    </div>
                    <NavBarMiddleHiddenButtons
                        showQuestion = {this.props.showQuestion}
                        addUpdateNoteToList = {this.props.addUpdateNoteToList}
                        toggleUserQuestion = {this.props.toggleUserQuestion}
                    ></NavBarMiddleHiddenButtons>
                    <NavBarMiddleHiddenForm 
                        toggleUserQuestion = {this.props.toggleUserQuestion}
                        toggleUserForm = {this.props.toggleUserForm}
                        handleTextInput = {this.props.handleTextInput}
                        showForm = {this.props.showForm}
                        newUpdateNoteName = {this.props.newUpdateNoteName}
                    ></NavBarMiddleHiddenForm>
                    <NavBarRightButtons
                        toggleUserForm = {this.props.toggleUserForm}
                        editUserNoteName = {this.props.editUserNoteName}
                        newUpdateNoteName = {this.props.newUpdateNoteName}
                        deleteUserNote = {this.props.deleteUserNote}
                        showForm = {this.props.showForm}
                    ></NavBarRightButtons>
                </nav>
            </div>
        );
    }
}

export default EditorNavBar;

