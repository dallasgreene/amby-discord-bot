case "$(uname -s)" in
    Darwin)
        DOCK_DIR=$(cd "$(dirname "$0")" || exit; pwd -P)
        ;;

   Linux)
        DOCK_DIR=$(dirname "$(readlink -f "$0")")
        ;;
esac

docker build "${DOCK_DIR}" -t amby-mongo

docker run -e "MONGO_INITDB_ROOT_USERNAME=${1}" -e "MONGO_INITDB_ROOT_PASSWORD=${2}" \
    -p 27017:27017 -d --name amby-db amby-mongo
