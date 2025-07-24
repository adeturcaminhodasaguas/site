# Etapa 1 - Build do projeto com Maven e Java 17
FROM maven:3.9.6-eclipse-temurin-17 AS build

COPY src /app/src
COPY pom.xml /app

WORKDIR /app
RUN mvn clean install

# Etapa 2 - Runtime com Java 17
FROM eclipse-temurin:17-jre-alpine

COPY --from=build /app/target/*.jar /app/app.jar

WORKDIR /app

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]