# FROM postgres:9.3
# RUN localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8
# ENV LANG ja_JP.UTF-8
# COPY ./script/init/*.sql /docker-entrypoint-initdb.d/

# FROM openjdk:18
# RUN microdnf install findutils
# RUN apk update && apk add findutils

# FROM openjdk:17-jdk-slim
# # RUN microdnf install findutils
# ARG JAR_FILE=./build/libs/*.jar
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]