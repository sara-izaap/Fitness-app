import { Component } from '@angular/core';
import {NavController,FabContainer,ModalController} from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import * as moment from 'moment'
import { GlobalVars } from '../../providers/globalVars';
import { UserService } from '../../providers/userService';
import {SessionPage} from '../workout/session/sessionPage';

@Component({ selector:'page-calendar',templateUrl:'calendar.html'})

export class CalendarPage {
 
  user_id:any;
  responsedata:Array<any>;
  eventSource:any=[];
  lockSwipes:boolean=true;
  isEventsloaded:boolean=false;
  calendar:any = {
    mode: 'day',
    currentDate: new Date(),
    dateFormatter: {
        formatMonthViewDay: function(date:Date) {
            return date.getDate().toString();
        },
        formatMonthViewDayHeader: function() {
            return 'MonMH';
        },
        formatMonthViewTitle: function() {
            return 'testMT';
        },
        formatWeekViewDayHeader: function() {
            return 'MonWH';
        },
        formatWeekViewTitle: function() {
            return 'testWT';
        },
        formatWeekViewHourColumn: function() {
            return 'testWH';
        },
        formatDayViewHourColumn: function() {
            return 'testDH';
        },
        formatDayViewTitle: function() {
            return 'testDT';
        }
    }
  };
  
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private globalVar:GlobalVars,
    public userservice:UserService
  ) 
  {  }

  ngOnInit() {

    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;

      this.loadSessons();
    });

  }

  onCurrentDateChanged(event:Date) {
    this.calendar.currentDate = event;
    this.loadSessons();
  }

  loadSessons() {

    let date:any = this.calendar.currentDate;

    let pardate:any = moment(date).local().format('YYYY-MM-DD');

    this.userservice.getSessions(this.user_id,pardate).then(res =>{

      let events:any = [];

      if(res.data.length > 0){

        for(let row of res.data) {

          var timespl = row['time'].split(":");

          var startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(),timespl[0],timespl[1]);
                   
          var endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(),timespl[0],timespl[1]);
          
          startTime = moment(startTime).local().toDate();
          endTime = moment(endTime).local().toDate();

          events.push({
            startTime: startTime,
            endTime: endTime,
            allDay: false
          });

        }

      }
      this.eventSource = events;
      
      this.isEventsloaded = true;

    })
    .catch(error => console.log(error));
  }

  onEventSelected(event:any) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  StartSession(fab:FabContainer){
    fab.close(); 
    this.navCtrl.push(SessionPage);
  }

  openCalendar(){

    let backdate:any = new Date();
    backdate.setFullYear(backdate.getFullYear()-5, '01','01');

    const options: CalendarModalOptions = {  
      pickMode: 'single',      
      canBackwardsSelected:true,
      from: backdate,
      defaultScrollTo:this.calendar.currentDate,
      defaultDate: this.calendar.currentDate,
      closeIcon:true,
      autoDone: true
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });
 
    myCalendar.present();
 
    myCalendar.onDidDismiss((data: CalendarResult, type: string) => {

      if(type=='done' && moment(this.calendar.currentDate).format('YYYY-MM-DD') != moment(data.string).format('YYYY-MM-DD')){
        this.calendar.currentDate = new Date(data.string);
        this.loadSessons();
      }   
      console.log(data);
    })

  }

  
}
