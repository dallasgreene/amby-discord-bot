docker run -e "MONGO_INITDB_ROOT_USERNAME=${1}" -e "MONGO_INITDB_ROOT_PASSWORD=${2}" -p 27017:27017 -d --name amby-db amby-mongo
