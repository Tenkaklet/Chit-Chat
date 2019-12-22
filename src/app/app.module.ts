import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AuthenticateComponent } from "./authenticate/authenticate.component";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChatroomsComponent } from "./chatrooms/chatrooms.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { FormsModule } from "@angular/forms";
import { ChatroomComponent } from './chatroom/chatroom.component';
import { PubNubAngular } from 'pubnub-angular2';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticateComponent,
    ChatroomsComponent,
    ChatroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AlertModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AngularFireAuthGuard, PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule {}
