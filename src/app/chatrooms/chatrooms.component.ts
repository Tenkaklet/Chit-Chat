import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.scss']
})
export class ChatroomsComponent implements OnInit {
  channels = [
    {name: 'Common Room'},
    {name: 'Off Topic'},
    {name: 'Development'},
  ];
  constructor(private router: Router) {}

  ngOnInit() {
  }

  goToChannel(channel: string) {
    this.router.navigate(['chatroom', channel]);
  }

}
