'use strict'

const Route = use('Route');

Route.group('guest', function () 
{
	Route.on('/').render('pages/landing');

	Route.resource('login', 'SessionController').except('create', 'edit', 'update', 'show');

	Route.resource('register', 'RegisterController').except('create', 'edit', 'update', 'show');

}).middleware('guest');


/**
 *	Authentification required
 *
 */
Route.group('auth', function()
{	
	Route.on('home').render('pages/homepage');

	Route.get('logout', 'SessionController.destroy');

	Route.get('profile/:id', 'ProfileController.show');
	// TODO: add routes for edit and update on ProfileController

	Route.resource('friends', 'FriendController');
	Route.get('people', 'FriendController.people');

	Route.resource('conference', 'ConferenceController');

	Route.resource('videocall', 'VideocallController');

	Route.resource('conversation', 'ConversationController');
	Route.get('conversation/call/:id', 'ConversationController.call');
	Route.get('conversation/get/friends', 'ConversationController.friends');

	Route.resource('files', 'FileController');
	Route.post('downloadFile', 'FileController.downloadFile');
	
}).middleware('auth');





