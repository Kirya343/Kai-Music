FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY gradlew settings.gradle.kts gradle.properties ./
COPY gradle ./gradle
COPY app ./app

RUN chmod +x gradlew \
    && ./gradlew :app:build --no-daemon

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]