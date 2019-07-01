import { Component } from '@angular/core';
import Echo from 'laravel-echo';

// At the top of the file
declare global {
    interface Window { io: any; }
    interface Window { Echo: any; }
    interface Window { Pusher: any; }
}

// declare var Echo: any;

window.io = window.io || require('socket.io-client');
window.Echo = window.Echo || {};

const user = {
  id: 1,
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIwMjQ5MWE3OTAyOWRlNThiMGQwY2U2ZDE3ZjFmMjcxM2JmOGYxZGU4OWI1MzI3MTg0YmM2YzhiZTJmYmJmMjk1MDViNzM0OTdjMWRhOWM1In0.eyJhdWQiOiIxIiwianRpIjoiYjAyNDkxYTc5MDI5ZGU1OGIwZDBjZTZkMTdmMWYyNzEzYmY4ZjFkZTg5YjUzMjcxODRiYzZjOGJlMmZiYmYyOTUwNWI3MzQ5N2MxZGE5YzUiLCJpYXQiOjE1NjE3NjgwNTUsIm5iZiI6MTU2MTc2ODA1NSwiZXhwIjoxNTYxNzY4OTU1LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXSwiZGF0YSI6eyJkIjp7InVpZCI6MSwiY29tcGFuaWVzX2FkbWluIjpbMV0sImNvbXBhbmllc19yb2xlcyI6WzFdLCJmaXJzdF9uYW1lIjoiUGFibG8iLCJsYXN0X25hbWUiOiJSZXllcyJ9LCJrYWlvc2FtYSI6dHJ1ZSwiZGVidWciOnRydWV9fQ.LfITz1_PIGg-pMN6HYXWCTtbiYK7ibiY0PSFC-Q_bJBmMWfkhMM4BhUEeZKigAXe9YZnyxysJiYkOoGYQTu72vpXGL6gPMyjm2iUzYWpw0QT-DNr_Zg7cbcEKCjSx-MgPj3lP4NjltBtRk6j77t2LIInEtKvgulajBsdBADJQYsIEp-RAA2B3V-lfVtyo6oZ-xUGW1-8tEtXkl5yH-WWhKnLJcCsolE7wTUUtEfMLI1NiJA4zEbzt-wyNootV7iEIXaFSfZ0ckkmKmh2CR4-NBiRr8AAXCsGy9cLVO10MkFoEg8egTa-qGDZ3Yx8bxYkg-ElXaLMMzhoCOhloNcQKweigYN1So9QCDfbW27PH3t-ohRMvQL1dx-DAEwmHOKvNUOBzm2hOA0ubAFgmn0XPHAKoSGWtKKs0Vb556fZekTq6g7ODIxxlMXvv7ahPusIQkVQjtJ7MnG5kpRRUg6D-3xeySq4nYwy14094QfmMBEKRZIIyzLOXbofnFwxPbJPb0ZfegXaQNeUaNRDb3CM9jiH6EsxVlcJT9VXVguxhb5aEtG3LzxvbcmnH68m8m4l-d2BGCEaDWF0J2td0AwqULV3rEjXaRs2SUh0XYEYuXjpjRR29D5G3L1mNk3WM4Pq5FW4D8Cmj4FnNjgYpNHshtZ6t4nRnVD_O5QCRjCdmX8'
}

window.Pusher = require('pusher-js');
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'PusherAppKey',
  wsHost: 'apicultor-22.nanoapp.io',
  wsPort: 6001,
  disableStats: true,
  httpHost: 'apicultor-22.nanoapp.io',
  authEndpoint: 'http://apicultor-22.nanoapp.io/broadcasting/auth',
  auth:        {
    headers: {
        Authorization: 'Bearer ' + user.token,
    },
  },
});

window.Echo.channel('public')
  .listen('.public-event', (data) => {
    console.log('From PUBLIC laravel echo: ', data);
  }
);

window.Echo.private('user.' + user.id)
  .listen('.jsonapi-created', (data) => {
    console.log('jsonapi-created from user PRIVATE channel: ', data);
  })
  .listen('.jsonapi-updated', (data) => {
    console.log('jsonapi-updated from user PRIVATE channel: ', data);
  })
  .listen('.jsonapi-deleted', (data) => {
    console.log('jsonapi-deleted from user PRIVATE channel: ', data);
  });

// this route fail authorization
window.Echo.private('user.2')
  .listen('.jsonapi-created', (data) => {
    console.log('Event from user PRIVATE channel: ', data);
  }
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-laravel-echo';

    public constructor() {
        console.log('will call window.Echo');

        // window.Echo = new Echo({
        //     broadcaster: 'socket.io',
        //     host: 'https://host-address.com:6001'
        // });
    }

}
