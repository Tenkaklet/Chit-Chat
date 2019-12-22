import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { PubNubAngular } from 'pubnub-angular2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  channel: any;
  channelName: '';
  user: string;
  leave: boolean;
  enter: boolean;
  alerts: any[];
  messages: any[];
  message: string;
  numOfOccupants: number;
  occupants: any[];




  constructor(private aRoute: ActivatedRoute, private afAuth: AngularFireAuth, private pubnub: PubNubAngular) {
    this.afAuth.authState.subscribe(user => {
      this.user = user.displayName;
    });
    this.pubnub.init({
      publishKey: 'pub-c-e5e73710-65c9-4686-af6a-fe5afd373de3',
      subscribeKey: 'sub-c-be32685e-1e61-11ea-b278-86076a99d5da',
      uuid: this.user
    })
    this.aRoute.params.subscribe(param => {
      this.channelName = param.room;
    });

    this.pubnub.subscribe({
      channels: [this.channelName],
      withPresence: true,
      triggerEvents: ['message', 'presence', 'status']
    });
  }

  ngOnInit() {
    this.pubnub.getMessage(this.channelName, (msg) => {
      // console.log(msg); // this is the message history
      const newMessage = {
        entry: {
          sender: msg.message.sender,
        text: msg.message.text
        }
      };
      this.messages.push(newMessage);
    });
    this.showPresence();
    this.updateChatHistory();
    this.hereNow();
  }

  hereNow() {
    this.pubnub.hereNow({
      channels: [this.channelName],
      includeUUIDs: true,
      includeState: true
    }, (status, res) => {
      this.numOfOccupants = res.totalOccupancy;
      const b = {
        res,
        channelName: this.channelName,
        occupants: res.channels[this.channelName].occupants
      };
      this.occupants = b.occupants;
    });
  }

  publishMsg() {
    this.pubnub.publish({
      message: {
        text: this.message,
        sender: this.user
      },
      channel: this.channelName
    }, (status, res) => {
      if (status.error) {
    } else {
    }
    })

  }

  updateChatHistory() {
    this.pubnub.history({
      channel: this.channelName,
      count: 100
    }, (status, response) => {
      this.messages = response.messages; // this is the history of the msgs
    });
  }

  showPresence() {
    // shows when people join or leave a channel
    this.pubnub.getPresence(this.channelName, (ps) => {
      console.log(ps);
      if(ps.action === 'leave') {
        this.alerts = [{
          type: 'danger',
          msg: `${ps.uuid} has left the chat!`,
          timeout: 4000
        }];
      } else if (ps.action === 'join') {
        this.alerts = [{
          type: 'success',
          msg: `${ps.uuid} has entered the chat!`,
          timeout: 4000
        }];
        this.occupants.push(ps);
      }
    });
  }




}
