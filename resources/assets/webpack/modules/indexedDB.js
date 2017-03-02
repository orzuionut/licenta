class DB
{
    constructor()
    {
        this.db = new Dexie("instant2");
        this.db.version(1).stores({
            files: '++id,data,*hash'
        });

        this.db.open();
    }

    insert(data)
    {
        return this.db.files.add(data);
    }

    get(id)
    {
        return this.db.files.where('id').equals(id).toArray();
    }

    getByHash(hash)
    {
        return this.db.files.where('hash').equals(hash).toArray();
    }

    getCollectionByHash(hash)
    {
        return this.db.files.where('hash').equals(hash);
    }

    deleteByHash(hash)
    {
        let collection = this.getCollectionByHash(hash);
        let self = this;

        this.db.transaction('rw', this.db.files, function() {

            collection.eachPrimaryKey(function (chunk) {
                self.db.files.delete(chunk);
            });

        }).then(function() { console.log("Transaction committed"); });

    }

    deleteAll()
    {
        return this.db.delete();
    }
}

export {DB};