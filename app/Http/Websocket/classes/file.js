
class FileManager
{
    constructor()
    {
        this.filesBeingSeed = {};
    }

    addConversation(conversation_id)
    {
        this.filesBeingSeed[conversation_id] = [];
    }



}