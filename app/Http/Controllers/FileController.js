'use strict';

const Storage = use('Storage');
const File = use('App/Model/File');

class FileController {

    * downloadFile(request, response)
    {
        let user_id = request.input('user_id');
        let file_id = request.input('file_id');

        let file = yield File.find(file_id);

        const json = JSON.stringify(file);
        file = JSON.parse(json);

        let path = file.user_sender_id + '/' + file.name;

        let blob = yield Storage.get(path);

        response.send(blob);
    }

    * index(request, response)
    {

    }

    * create(request, response) {
        //
    }

    * store(request, response)
    {

    }

    * show(request, response) {
        //
    }

    * edit(request, response) {
        //
    }

    * update(request, response) {
        //
    }

    * destroy(request, response) {
        //
    }

}

module.exports = FileController
