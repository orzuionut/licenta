'use strict';

const Storage = use('Storage');

const File = use('App/Model/File');
const FileReceiver = use('App/Model/FileReceiver');

const FileUpload = exports = module.exports = {};

FileUpload.insert = function*(data) {
    let file_data = new File;

    file_data.id = data.id;
    file_data.name = data.name;
    file_data.user_sender_id = data.user_sender_id;

    yield file_data.save();

};

FileUpload.store = function*(data) {
    yield Storage.put(data.path, data.file);
};

FileUpload.addReceivers = function*(data) {
    let file_receiver = new FileReceiver;

    file_receiver.file_id = data.id;
    file_receiver.user_id = data.user_receiver_id;

    yield file_receiver.save();
};