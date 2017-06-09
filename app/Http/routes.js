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

	Route.get('conference/:id', 'ConferenceController.show');

	Route.get('videocall/:id', 'VideocallController.show');

	// Conversation
	Route.resource('conversation', 'ConversationController');
	Route.get('conversation/voice/:id', 'ConversationController.voice');
	Route.get('conversation/call/:id', 'ConversationController.call');
	Route.get('conversation/cinema/:id', 'ConversationController.cinema');
	Route.get('conversation/get/friends', 'ConversationController.friends');

	// Cinema
	Route.get('cinema/:id', 'CinemaController.show');

	// Voice call
	Route.get('voice/v/:id', 'VoiceCallController.twoPeers');
	Route.get('voice/c/:id', 'VoiceCallController.conference');

}).middleware('auth');





