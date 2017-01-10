import * as Firebase from 'firebase';
import {Promise as FirebasePromise} from 'firebase';


let database:any;

export const getRef = (item?:string) => {
  return database.ref(item);
}

export const initStore = () => {
  let firebase = Firebase.initializeApp({
      authDomain: "localhost",
      databaseURL: "https://ts-notes.firebaseio.com",
  });
  database = firebase.database();
  return new FirebasePromise((resolve,reject)=>{
    database.ref().once("value", () => {
      resolve(true);
    },()=>{
      reject(false);
    });
  });
}

export const getData = () => {
  return database.ref().once('value').then((snapshot)=>{
    return snapshot.val();
  })
}

// class Store {
//   firebase:any;
//   database:any;
//   isReady:boolean;
//   constructor(){
//     this.isReady = false;
//   }

//   init(){
//     this.firebase = Firebase.initializeApp({
//       authDomain: "localhost",
//       databaseURL: "https://ts-notes.firebaseio.com",
//     });
//     this.database = this.firebase.database();
//   }

//   getNotes(){
//       let ref = this.database.ref();
//       ref.once('value', (snapshot) => {
//         this.isReady = true;
//         console.log('getNotes()');
//         console.log(snapshot.val());
//         return snapshot.val();
//       });
//   }

//   saveNote(obj:Object){
//     this.firebase.database().ref(Date.now()).set({
//       timestamp: Date.now(),
//       content: 'test test',
//       label : '#ff00000'
//     });
//   }

// }


// export default Store;
