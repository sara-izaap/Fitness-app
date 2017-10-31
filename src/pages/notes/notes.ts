import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

import {NavController,NavParams, ModalController, ViewController, LoadingController} from 'ionic-angular';

import { GlobalVars } from '../../providers/globalVars';

import { NoteService } from '../../providers/noteService';

@Component({ selector:'page-notes',templateUrl:'notes.html'})
export class NotesPage {
 
  user_id:any;
  noteslist:any;
  gmtplus:any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private globalVar:GlobalVars,
    public noteservice:NoteService
  ) 
  {
    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;

      this.getNotesList();

    });

    this.gmtplus =  5*24*60*60;

  }

  getNotesList(){

      this.noteservice.getNotes(this.user_id).then(res =>{
            this.noteslist = res.data;
      })
      .catch(error => console.log(error));

  }

  Addnote(){

    let profileModal = this.modalCtrl.create(ModalAddItemPage, { userId: this.user_id });

     profileModal.onDidDismiss(data => {

        if(data)
          this.getNotesList();
     });
     profileModal.present();
  }
  
}



@Component({templateUrl: "note-add.html"})
export class ModalAddItemPage {
    myParam:any;
    submitted:boolean = false;
    formdata:any = {id:'',notes:''};

    constructor(public viewCtrl: ViewController,public params:NavParams,private loader:LoadingController,public noteservice:NoteService){
       
        this.formdata.id = params.get('userId');
    }

    saveNote(form: NgForm) {

    let loading = this.loader.create();

    this.submitted = true;

    if (form.valid) {

      loading.present(); 

       this.noteservice.SaveNote(this.formdata).then((result) => {

        loading.dismiss();
        console.log(result); 
        this.dismiss(true);        

      }, (err) => {
        console.log(err);
      });

    }
  }

  dismiss(flag:boolean) {

     this.viewCtrl.dismiss(flag);
  }
}
