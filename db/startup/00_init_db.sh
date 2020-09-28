"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    const MONGO_INITDB_ROOT_USERNAME = $(_js_escape "$MONGO_INITDB_ROOT_USERNAME");
    const MONGO_INITDB_ROOT_PASSWORD = $(_js_escape "$MONGO_INITDB_ROOT_PASSWORD");

    db.auth(MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD);

    db = db.getSiblingDB('amby-db');

    db.createUser({
        user: MONGO_INITDB_ROOT_USERNAME,
        pwd: MONGO_INITDB_ROOT_PASSWORD,
        roles: [ 'readWrite' ],
        authenticationRestrictions: [
            {
                clientSource: [ '127.0.0.1' ],
                serverAddress: [ '127.0.0.1' ]
            }
        ]
    });

    db.createDate.insertOne({ time: Date.now() });
EOJS
