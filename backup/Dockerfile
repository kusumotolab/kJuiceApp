FROM alpine
RUn apk --no-cache add openssh rsync
RUN apk --no-cache add postgresql-client
RUN mkdir /root/data
CMD ["crond", "-f"]
