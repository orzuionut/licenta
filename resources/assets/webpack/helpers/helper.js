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

    // chunksObjects contains multiple objects that each contain data equal to an Array[62]
    static getArrayChunksFromObject(chunksObjects)
    {
        var chunksArray = [];

        for (let i = 0; i < chunksObjects.length; i++)
        {
            chunksArray.push(...chunksObjects[i].data);
        }

        return chunksArray;
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

    static measureBW()
    {
        var startTime, endTime, fileSize;
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {

            // we only need to know when the request has completed
            if (xhr.readyState === 4 && xhr.status === 200) {

                // Here we stop the timer & register end time
                endTime = (new Date()).getTime();

                // Also, calculate the file-size which has transferred
                fileSize = xhr.responseText.length;

                // Calculate the connection-speed
                var speed = (fileSize) / ((endTime - startTime)/1000) / 1024;

                // Report the result, or have fries with it...
                alert(speed + " KBps\n");
            }
        };
        
        startTime = (new Date()).getTime();
        
        xhr.open("GET", "/img/register_panel.jpg", true);
        xhr.send();
    }
}

export {Helper}