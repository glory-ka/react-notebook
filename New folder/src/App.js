import './App.css';
import React from 'react';
import PageListing from './PageListing';
import TextArea from './TextArea';
import EditorNavBar from './EditorNavBar';


class App extends React.Component {
  
  state = 
  {
      noteBookList: [],
      noteBookData: {},
      currentNoteBookData: {},
      currentNoteName: '',
      newUpdateNoteName: {},
      showQuestion: false,
      showForm: false 
  };

  componentDidMount()
  {
    //set localStorage
    this.storeInlocalStorage();

    //update in 500ms unless user abort
    this.timer = setTimeout(this.updateDataInLocalStorage, 500);
  }

  componentDidUpdate()
  {
    /*if not executed yet abort */
    clearTimeout(this.timer);

    //set new delay of 500ms. Only execute after 500ms of inactivity
    this.timer = setTimeout(this.updateDataInLocalStorage, 500);
  }

  componentWillUnmount() 
  {
    clearTimeout(this.timer);
  }

  storeInlocalStorage = ()=>{

    if (localStorage.getItem('noteBookList') !== null)
    {
      let noteBookList = JSON.parse(localStorage.getItem('noteBookList'));

      this.setState({
        noteBookList: noteBookList,
        noteBookData: {}
      });

      if (noteBookList.length > 0)
      {
        let temp = {};
        noteBookList.forEach( item => {
          temp = {...temp, [item]: localStorage.getItem(item)}
        });

        this.setState({
          noteBookData: {...this.state.noteBookData, ...temp}
         })
      }
    }
  }

  updateDataInLocalStorage = () => {

    // if this.state.currentName is an empty string or undefined, local storage doesn't set anyting
    localStorage.setItem(this.state.currentNoteName || undefined, 
      this.state.noteBookData[this.state.currentNoteName]);

    localStorage.setItem('noteBookList', JSON.stringify(this.state.noteBookList));

    // Object.values return an array of the current values of the object
    // We expect this.state.currentNoteBookData to only have one [key, value] pair
    localStorage.setItem(this.state.currentNoteName, (()=> {
      return Object.values(this.state.currentNoteBookData)[0]
              ? Object.values(this.state.currentNoteBookData)[0]
              : '';
      })()
    )
     // JSON.stringify(Object.values(this.state.currentNoteBookData)[0]));  
  }

  onButtonClick = (event) => {
    this.setState({
        noteBookData: {...this.state.noteBookData, ...this.state.currentNoteBookData},
        currentNoteBookData: {[event.target.dataset.name]: this.state.noteBookData[event.target.dataset.name]},
        currentNoteName: event.target.dataset.name
    });
  };

  onUserChange = (event) => {
    this.setState(
      {
        currentNoteBookData:  {[this.state.currentNoteName]: event.target.value}
      });
  };

  addUpdateNoteToList = () => {
    if ('update' in this.state.newUpdateNoteName)
    {
      localStorage.removeItem(this.state.currentNoteName);
      this.setState({
        noteBookList: this.state.noteBookList.map(
          item => {
              if(item === this.state.currentNoteName) return this.state.newUpdateNoteName.update;
              else return item;
          }),
          showQuestion: !this.state.showQuestion,
          currentNoteName: this.state.newUpdateNoteName.update
      });
    }
    else
    {
      this.setState(
        {
          noteBookList: [...this.state.noteBookList, this.state.newUpdateNoteName.new],
          showQuestion: !this.state.showQuestion
        });
    }
  }

  handleTextInput = (event) => {
    if ('update' in this.state.newUpdateNoteName)
      this.setState({newUpdateNoteName :{update: event.target.value}, showQuestion: false});
    else
    this.setState({newUpdateNoteName :{new: event.target.value}, showQuestion: false});
  }

  toggleUserQuestion = (event) =>
  {
    this.setState({showQuestion: !this.state.showQuestion, showForm: false});
    event.preventDefault();
  }

  toggleUserForm = (event) => 
  {
    //Toggle user form to ass new note. editUserNoteName also does the same thing for update
    this.setState({showForm: !this.state.showForm, newUpdateNoteName: {new: 'Untitle'}});
    //Make button inside Form not submit
    event.preventDefault();
    event.stopPropagation();
  }

  // Toggle the user form to update.
  editUserNoteName = () =>
  {
    this.setState({showQuestion: false, showForm: true, newUpdateNoteName: {update: ''}});
  }
   
  deleteUserNote = () => 
  {
    let index = this.state.noteBookList.indexOf(this.state.currentNoteName);

    // Array.splice works with negative, null and undefined index. Crazzy!!!
    if (index < 0) return;

    localStorage.removeItem(this.state.currentNoteName);
    
    /**
      Could also Remove directly then use setState to trigger an event, 
      Might have race condition in bigger apps
      this.state.noteBookList.splice(index, 1); 
    */
    this.setState({
      noteBookList: [...this.state.noteBookList.slice(0, index), 
                    ...this.state.noteBookList.slice(index + 1)],
    });

    // Remove directly then use setState to trigger an event, 
    // Might have race condition in bigger apps
    delete this.state.noteBookData[this.state.currentNoteName];
    this.setState({noteBookData: {...this.state.noteBookData}, currentNoteName: ''});
  }


  render(){

    return (
    <div className="App">

      <EditorNavBar 
        currentNoteName = {this.state.currentNoteName}
        addUpdateNoteToList = {this.addUpdateNoteToList}
        handleTextInput = {this.handleTextInput}
        toggleUserQuestion = {this.toggleUserQuestion}
        showQuestion = {this.state.showQuestion}
        showForm = {this.state.showForm}
        toggleUserForm = {this.toggleUserForm}
        editUserNoteName = {this.editUserNoteName}
        deleteUserNote = {this.deleteUserNote}
        newUpdateNoteName = {this.state.newUpdateNoteName}
      ></EditorNavBar>

      <main className="main">
        <div className='listing-container'>
          <h3>NoteBooks</h3>
          <PageListing 
            noteBookList = {this.state.noteBookList} 
            onButtonClick = {this.onButtonClick} 
          ></PageListing>
        </div>
        <div className="textarea-container">
          <TextArea 
            textAreaData = {this.state.currentNoteBookData}
            onUserChange = {this.onUserChange}
            currentNoteName = {this.state.currentNoteName}
          ></TextArea>
        </div>
      </main>
    </div>
  );
}
}

export default App;
