import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {
  dismissible = true;
  error: string;
  invalid: boolean;
  username: string;
  email: string;
  password: string;
  defaultAlerts: any[] = [
    {
      type: 'danger',
      msg: `There is an account already associated, try logging in.`
    }
  ];
  alerts = this.defaultAlerts;

  private userDocument: AngularFirestoreDocument<any>;
  constructor(private router: Router, private afAuth: AngularFireAuth, private db: AngularFirestore) {

  }

  ngOnInit() {
  }


  signUpWithEmail() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(user => {
      this.db.collection('user').doc(user.user.uid).set({
        username: this.username,
        photo: `https://api.adorable.io/avatars/285/${this.email}.png`
      });
      this.router.navigate(['chatrooms']);
      window.localStorage.setItem('user', this.username);
      user.user.updateProfile({
        displayName: this.username,
        photoURL: `https://api.adorable.io/avatars/285/${this.email}.png`
      })
      .catch(err => {
        console.log(err);
      });
    });

  }

  signInWithEmail() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(done => {
      this.router.navigate(['chatrooms']);
      window.localStorage.setItem('user', done.user.displayName);
    })
    .catch(err => {
      console.log(err);
    })
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  signUpWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((done) => {
      const newUser = done.additionalUserInfo.isNewUser;
      if(newUser) {
        this.db.collection('user').doc(done.user.uid).set({
          username: done.user.displayName,
          photo: done.user.photoURL
        });
        window.localStorage.setItem('user', done.user.displayName);
        this.router.navigate(['chatrooms']);
      } else {
        this.invalid = true;
      }
    })
    .catch(fail => {
      console.log(fail);
    });
  }

  signInWithGoogle() {
    firebase.auth().signInWithPopup(new auth.GoogleAuthProvider())
    .then(result => {
      const newUser = result.additionalUserInfo.isNewUser;
      if (newUser) {
        window.localStorage.setItem('user', result.user.displayName);
        this.router.navigate(['chatrooms']);
      } else {
        result.user.delete();
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

}
