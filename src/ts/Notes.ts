import Note from './Note';
import Store from './Store';
import {Promise} from 'es6-promise';

interface NotesOptions {
  colourSet?:Array<Object>
}

class Notes {
  notesContainer:HTMLElement;
  btnAdd:HTMLElement;
  colourSet:Array<Object>;
  store:any;
  constructor(obj:NotesOptions = {} as NotesOptions){
    let {
      colourSet = [
        {'label': 'pale', 'value':'#FEFEFF'},
        {'label': 'blue', 'value':'#eef6fb'},
        {'label': 'beige', 'value':'#FED99B'},
        {'label': 'red', 'value':'#fbd5d0'}
      ]
    }:NotesOptions = obj as NotesOptions

    this.colourSet = colourSet;
    this.notesContainer  = document.getElementById('notes');
    this.btnAdd  = document.getElementById('btnAdd');
    this.btnAdd.addEventListener('click', this.addNote.bind(this), false);
    this.store = new Store();
    this.store.init();
    Promise.all([this.store.getNotes()]).then((results)=>{
      let a = results;
      console.log('------');
      console.log(a);
    });
  }

  addNote(event:Event = null){
    let note:any = new Note({colourSet:this.colourSet});
    this.notesContainer.insertBefore(note.createNote(), this.notesContainer.childNodes[0]);
    if (event) event.preventDefault();
    return false;
  }
}

export default Notes;
