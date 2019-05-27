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


window.Pusher = require('pusher-js');
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'CoolKey',
  wsHost: 'apicultor-22.nanoapp.io',
  wsPort: 6001,
  disableStats: true,
});

window.Echo.channel('test-channel')
.listen('.App\\SocketTesterEvent', (data) => {
    console.log('From laravel echo: ', data);
});

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
