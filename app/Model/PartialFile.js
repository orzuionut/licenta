'use strict'

const Lucid = use('Lucid')

class PartialFile extends Lucid
{
    static get table ()
    {
        return 'partial_files';
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

module.exports = PartialFile
