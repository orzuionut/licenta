# Instant

Web messenger app, allowing users to make video calls, conferences and transfer files directly in the browser.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Ubuntu 14.04

* mysql-server-5.5

* Kurento Media Server 6.0
```
sudo apt-get install mysql-server-5.5
sudo apt-get install -y aptitude
sudo apitude install kurento-media-server
```

* NodeJS, npm

### Installing

* sudo apt-get update
* sudo apt-get install libcurl3 libnspr4-0d libxss1

* npm install (inside project folder)


### Running

* sudo service nginx start
* sudo service kurento-media-server-6.0 start
* npm run serve:dev (inside project folder)

## Built with
* [AdonisJS](https://adonisjs.com/) - The web framework used
* [npm](https://www.npmjs.com/) - Package manager
* [Socket.io](https://socket.io/) - Library that makes it easy to work with WebSockets in NodeJS
* [WebRTC](https://webrtc.org/) - WebRTC is a free, open project that provides browsers and mobile applications with Real-Time Communications (RTC) capabilities
* [Kurento Media Server](https://github.com/Kurento/kurento-media-server) - WebRTC media server that provides routing of audiovisual flows
* [WebTorrent](https://webtorrent.io/) - Torrents on the web (used for file transfer between users)
* [Webpack](https://webpack.js.org/) - Module Bundler for JavaScript
* [Babel](https://babeljs.io/) - JavaScript compiler (to use ES2015)
* [Gulp Sass](http://gulpjs.com/) - Compile SASS to CSS

## Authors
* **Orzu Ionut** [Github](https://github.com/orzuionut)