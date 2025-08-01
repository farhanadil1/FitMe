# Build stage
FROM maven:3.8.5-eclipse-temurin-17 as build
WORKDIR /app
COPY . .
WORKDIR /app/fitme-backend
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/fitme-backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
