FROM alpine
RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata
RUN apk --no-cache add openssh rsync
RUN apk --no-cache add postgresql-client
RUN mkdir /root/data
CMD ["crond", "-f"]
