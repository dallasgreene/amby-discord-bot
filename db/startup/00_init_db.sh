"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    const MONGO_INITDB_ROOT_USERNAME = $(_js_escape "$MONGO_INITDB_ROOT_USERNAME");
    const MONGO_INITDB_ROOT_PASSWORD = $(_js_escape "$MONGO_INITDB_ROOT_PASSWORD");

    db = db.getSiblingDB('admin');

    db.auth(MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD);

    db.createUser({
        createUser: MONGO_INITDB_ROOT_USERNAME,
        pwd: MONGO_INITDB_ROOT_PASSWORD,
        roles: ['readWriteAnyDatabase', 'dbAdminAnyDatabase']
    });

    db.createDate.insertOne({ time: Date.now() });
EOJS
