'use strict';

const Lucid = use('Lucid');

class File extends Lucid
{
    users()
    {
        return this.belongsToMany('App/Model/User', 'file_receivers', 'file_id', 'user_id');
    }
}

module.exports = File;
