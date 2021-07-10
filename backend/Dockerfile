# ========================= DEPENDENCY RESOLVER =========================
# Download the dependencies on container
# =======================================================================
FROM maven:3-jdk-15-slim AS dependency_resolver

# Download all library dependencies
COPY ./pom.xml /app/pom.xml
# If you have m2 folder on the project:
#COPY ./m2/ /app/m2/
WORKDIR /app
RUN mvn dependency:copy-dependencies $MAVEN_CLI_OPTS

# ========================= TESTER ======================================
# Run tests on container
# =======================================================================
FROM dependency_resolver AS tester

# Create user for tests
RUN mkdir -p /home/test_user/.m2/repository
ARG UID
RUN groupadd -g 1000 test_user
RUN useradd -r -u 1000 -g test_user test_user
RUN chown -R test_user:test_user /home/test_user
COPY --from=dependency_resolver --chown=test_user:test_user /root/.m2 /home/test_user/.m2

USER test_user
VOLUME /app
WORKDIR /app

CMD mvn clean test $MAVEN_CLI_OPTS

# ========================= BUILDER =====================================
# Build the artifact on container
# =======================================================================
FROM dependency_resolver as builder
# Build application
COPY . /app
RUN mvn package $MAVEN_CLI_OPTS -Dmaven.test.skip=true

# ========================= DOCKER IMAGE ================================
# Prepare container image with application artifacts and runtime environment
# =======================================================================
FROM openjdk:15-jre-slim

VOLUME /tmp

COPY --from=builder /app/target/*.jar app.jar

# RUN apt-get update && apt-get install -y curl

ENTRYPOINT [ "sh", "-c", "java -jar /app.jar" ]
