

const DB_NAME = 'consents_db';
const TABLE_NAME = 'list';

class Repository
{
    constructor() {
        this.init();
    }

    init(callBack = null) {
        let request = window.indexedDB.open(DB_NAME, 1);

        // We setup our DB schema here
        request.onupgradeneeded = (e) => {
            let db = e.target.result;

            let store = db.createObjectStore(TABLE_NAME, { keyPath: 'id', autoIncrement:true });

            store.createIndex('name', 'name', { unique: false });
            store.createIndex('response', 'response', { unique: false });
            store.createIndex('language', 'language', { unique: false });
            store.createIndex('audio', 'audio', { unique: false });
        };
        
        request.onsuccess = () => {
            this.db = request.result;
            if(callBack)
                callBack(this.db);
        };
    }

    insert(consent, successCallBack, errorCallBack) {
        if(this.db) {
            let transaction = this.db.transaction([TABLE_NAME], 'readwrite');
            let store = transaction.objectStore(TABLE_NAME);
            let request = store.add(consent);
            request.onsuccess = successCallBack;
            request.onerror = errorCallBack;
        }
    }

    /*
     * @reinit - we need this flag to determine if we need to reinitialize our DB
    */
    load(callBack, reinit = false) {
        let result = [];
        if(this.db) {
            var store = this.db.transaction(TABLE_NAME).objectStore(TABLE_NAME);
            
            store.openCursor().onsuccess = function(event) {
               var cursor = event.target.result;
               if (cursor) {
                    result.push(cursor.value);
                    cursor.continue();
               } else {
                    callBack(result);
               }
            };
        } else if(reinit) {
            /*
             * sometimes we are calling this repository to early that it 
             * is still initializing. we need to reinit it with callback.
             * We should be doing this w/ other function but right now
             * only the load function is called to early on this app.
            */
            this.init(() => {
                this.load(callBack);
            });
        }
    }
}

export const ConsentsRepository = new Repository();
