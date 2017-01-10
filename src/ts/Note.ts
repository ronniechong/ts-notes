import {TimeStamp,GenerateId} from './Util';

interface NoteOptions {
  id?:string,
  colourSet?:Array<Object>
}
class Note {
  noteId:string;
  colourSet:Array<Object>;

  constructor(obj:NoteOptions){
    this.noteId = '';
    this.colourSet = obj.colourSet;
  }

  createNote(obj:NoteOptions){
    let container:HTMLElement = document.createElement('div');
    let button:HTMLElement = document.createElement('a');
    let title:HTMLElement = document.createElement('div');
    let header:HTMLElement = document.createElement('header');
    let footer:HTMLElement = document.createElement('footer');
    let body:HTMLElement = document.createElement('div');
    let content:HTMLElement = document.createElement('div');
    let select:HTMLElement = document.createElement('select');
    let id:string = obj.id || GenerateId();
    let _this:Note = this;

    this.noteId = id;
    container.id = id;
    container.classList.add('note__container');
    content.classList.add('note__content');
    body.classList.add('note__body');
    header.classList.add('note__header');
    footer.classList.add('note__footer');
    title.classList.add('note__title');
    button.classList.add('note__delete');
    select.classList.add('note__label');

    for (let colour of this.colourSet) {
      let option:HTMLElement = document.createElement('a');
      option.classList.add('note__colour-picker');
      option.setAttribute('data-colour', colour['value']);
      option.setAttribute('data-note', this.noteId);
      option.setAttribute('href', '#colour');
      option.setAttribute('title', colour['label']);
      option.setAttribute('style',`background-color: ${colour['value']}`);
      option.innerHTML = colour['label'];
      option.addEventListener('click', _this.updateNoteLabel.bind(this), false);
      footer.appendChild(option);
    }

    let firstOption:HTMLElement = footer.getElementsByTagName('a')[0];
    firstOption.classList.add('is--active');
    container.setAttribute('style',`background-color:${firstOption.getAttribute('data-colour')}`);

    button.setAttribute('data-note', id);
    button.setAttribute('href', '#delete');
    button.innerHTML = '&#45;';
    title.innerHTML = TimeStamp();
    content.setAttribute('contenteditable', 'true')
    button.addEventListener('click', this.deleteNote.bind(container), false);

    //Build markup
    body.appendChild(content);
    header.appendChild(title);
    header.appendChild(button);
    container.appendChild(header);
    container.appendChild(body);
    container.appendChild(footer);
    return container;
  }

  updateNoteLabel(event:Event){
    let selectedElement = <HTMLElement> event.target;
    let parent:HTMLElement = <HTMLScriptElement> selectedElement.parentNode;
    let elements:Array<HTMLElement> = <any> parent.getElementsByTagName('a');
    let colour:string = selectedElement.getAttribute('data-colour');
    let note:HTMLElement = document.getElementById(this.noteId);
    note.setAttribute('style',`background-color:${colour}`);
    for (let element of elements){
      element.classList.toggle('is--active', false);
    }
    selectedElement.classList.add('is--active');
    event.preventDefault();
    return false;
  }

  deleteNote(event:Event){
    event.target.removeEventListener('click', this.deleteNote);
    let elem:any = this;
    if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
    }
    event.preventDefault();
    return false;
  }
}
export default Note;
