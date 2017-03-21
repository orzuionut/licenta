class Helper {
    static guid()
    {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    static blobToFile(blob, fileName)
    {
        blob.lastModifiedDate = new Date();
        blob.name = fileName;
        return blob;
    }


    static flash(message)
    {
        Materialize.toast(message, 4000, 'flash-message');
    }

    static ArrayBufferToString(buffer)
    {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }

    static StringToArrayBuffer(string)
    {
        var buf = new ArrayBuffer(string.length); // 2 bytes for each char
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = string.length; i < strLen; i++)
        {
            bufView[i] = string.charCodeAt(i);
        }
        return buf;
    }

    static getIDfromURL()
    {
        let current_url = $(location).attr("href");
        return current_url.substring(current_url.lastIndexOf("/") + 1);
    }
}

export {Helper}