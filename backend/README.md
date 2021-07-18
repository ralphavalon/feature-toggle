# FeatureToggle - Backend

## About the project ##

### Concepts ###

* This project uses:

- REST

### Technologies ###

* It mainly uses:
```
Java
Spring Boot
Spring Data JPA (currently with H2)
Swagger
```

## How To ##

* **Run tests**

`docker build . --target test -t feature-toggle/backend-tests`

* **Run application**

`docker build . -t feature-toggle/backend && docker run -p 8080:8080 feature-toggle/backend`

Then the application will be available on http://localhost:8080
