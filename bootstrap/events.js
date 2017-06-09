'use strict'

/*
|--------------------------------------------------------------------------
| Events
|--------------------------------------------------------------------------
|
| Here you register events and define their listeners, which can be inline
| closures or reference to a Listener inside app/Listeners. Also your
| listeners can be async.
|
| Listeners are saved in app/Listeners directory.
|
| @example
| Event.when('login', 'User.login')
|
*/
const Event = use('Event');

Event.when('file.upload', 'FileUpload.store');
Event.when('file.uploaded', 'FileUpload.insert');
Event.when('file.uploaded', 'FileUpload.addReceivers');

Event.when('friendship.new', 'Friendship.new');
Event.when('friendship.delete', 'Friendship.delete');

Event.when('Http.error.*', 'Http.handleError');
Event.when('Http.start', 'Http.onStart');
