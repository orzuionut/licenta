'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

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

	Route.resource('conference', 'ConferenceController');

	Route.resource('videocall', 'VideocallController');

	Route.resource('conversation', 'ConversationController');
	Route.get('conversation/call/:id', 'ConversationController.call');

}).middleware('auth');





