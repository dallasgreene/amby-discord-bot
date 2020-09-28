FROM mongo:4.2.6-bionic

COPY ./startup /docker-entrypoint-initdb.d

RUN mkdir -p /home/mongodb; \
        touch /home/mongodb/.dbshell; \
        chown -R 999:999 /home/mongodb; \
        chown -R 999:999 /docker-entrypoint-initdb.d