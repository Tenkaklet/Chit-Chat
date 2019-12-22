import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ChatroomsComponent } from './chatrooms/chatrooms.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ChatroomComponent } from './chatroom/chatroom.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'authenticate', component: AuthenticateComponent},
  {path: 'chatrooms', component: ChatroomsComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'chatroom/:room', component: ChatroomComponent, canActivate: [AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
