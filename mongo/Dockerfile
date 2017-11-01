# start with a lightweight linux image
FROM node:alpine

# add necessary packages
RUN apk update && \
    apk upgrade && \
    apk add bash curl mongodb && \
    rm -rf /var/cache/apk/*

# persist db data
RUN mkdir -p /data/db
VOLUME /data/db

# configure database container for security
RUN rm -rf /usr/bin/mongoperf

# open ports
EXPOSE 27017 28017

# run the "mongod" command as the "mongodb" user (drop root privilege)
# COPY exec.sh /root
# ENTRYPOINT ["/root/exec.sh"]
CMD ["mongod"]