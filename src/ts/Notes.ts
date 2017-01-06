import Note from './Note';

interface NotesOptions {
  startingId?: number,
  idPrefix?: string,
  colourSet?:Array<Object>
}

class Notes {
  notesContainer:HTMLElement;
  btnAdd:HTMLElement;
  id:number;
  idPrefix:string;
  colourSet:Array<Object>;
  constructor(obj:NotesOptions = {} as NotesOptions){
    let {
      startingId = 1,
      idPrefix = 'note',
      colourSet = [
        {'label': 'pale', 'value':'#FEFEFF'},
        {'label': 'blue', 'value':'#eef6fb'},
        {'label': 'beige', 'value':'#FED99B'},
        {'label': 'red', 'value':'#fbd5d0'}
      ]
    }:NotesOptions = obj as NotesOptions

    this.id = startingId;
    this.colourSet = colourSet;
    this.idPrefix = idPrefix;
    this.notesContainer  = document.getElementById('notes');
    this.btnAdd  = document.getElementById('btnAdd');
    this.btnAdd.addEventListener('click', this.addNote.bind(this), false);
    this.addNote();
  }

  addNote(event:Event = null){
    let note:any = new Note({idPrefix:this.idPrefix,colourSet:this.colourSet});
    this.notesContainer.insertBefore(note.createNote({id:this.id}), this.notesContainer.childNodes[0]);
    this.id += 1;
    if (event) event.preventDefault();
    return false;
  }
}

export default Notes;
