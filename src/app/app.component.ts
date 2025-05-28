import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ9B3Eh3_4qH5cVfpblo5rYbeWErUTcA8",
  authDomain: "pizzaapp-2d6fd.firebaseapp.com",
  databaseURL: "https://pizzaapp-2d6fd-default-rtdb.firebaseio.com",
  projectId: "pizzaapp-2d6fd",
  storageBucket: "pizzaapp-2d6fd.firebasestorage.app",
  messagingSenderId: "222606997961",
  appId: "1:222606997961:web:be44ef9bb369707eaa9018"
};


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    initializeApp(firebaseConfig);
  }
}
