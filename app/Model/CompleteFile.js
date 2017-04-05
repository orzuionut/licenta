'use strict'

const Lucid = use('Lucid')

class CompleteFile extends Lucid
{
    static get table ()
    {
        return 'complete_files';
    }

    conversation()
    {
        return this.belongsTo('App/Model/Conversation');
    }

    sender()
    {
        return this.belongsTo('App/Model/User');
    }
}

module.exports = CompleteFile
