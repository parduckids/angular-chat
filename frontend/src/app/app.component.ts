import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public roomId: string;
  public messageText: string;
  public messageArray: { user: string; message: string }[] = [];

  public phone: string;
  public currentUser;
  public selectedUser;

  public userList = [
    {
      id: 1,
      name: 'Alex Carter',
      phone: '9876598765',
      image: 'assets/user/user-1.jpg',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3',
      },
    },
    {
      id: 2,
      name: 'Jordan Blake',
      phone: '9876543210',
      image: 'assets/user/user-2.jpg',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5',
      },
    },
    {
      id: 3,
      name: 'Morgan Reid',
      phone: '9876543211',
      image: 'assets/user/user-3.jpg',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6',
      },
    },
    {
      id: 4,
      name: 'Taylor Monroe',
      phone: '9876543212',
      image: 'assets/user/user-4.jpg',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6',
      },
    },
  ];

  constructor(private chatService: ChatService) {
    this.chatService
      .getMessage()
      .subscribe((data: { user: string; message: string }) => {
        this.messageArray.push(data);
      });
  }

  ngOnInit(): void {
    this.currentUser = this.userList[0];
  }
  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find((user) => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.selectedUser.id];
    this.messageArray = [];
    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({ user: username, roomId: roomId });
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      data: this.currentUser.name,
      room: this.roomId,
      message: this.messageText,
    });
    this.messageText = '';
  }
}
