FROM eclipse-temurin:17-jdk-focal AS builder

WORKDIR /app

COPY . /app
RUN ./gradlew bootJar

FROM eclipse-temurin:17-jre-alpine

COPY --from=builder --chmod=777 /app/build/libs/juice-app-backend.jar /app/
ENTRYPOINT [ "java", "-jar", "/app/juice-app-backend.jar" ]
