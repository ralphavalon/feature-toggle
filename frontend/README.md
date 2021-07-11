# FeatureToggle - Frontend

## About the project ##

### Concepts ###

* This project uses:

- 

### Technologies ###

* It mainly uses:
```
```

* It has this environment variable(s) (you need to create a file called `.env` on root directory):

| Environment Variable | Description                  | Default Value          |
|----------------------|------------------------------|------------------------|
|  REACT_APP_FEATURE_TOGGLE_URL  | Endpoint for feature toggle API  | http://localhost:8080/api/v1/features  |

```
# .env file example
REACT_APP_FEATURE_TOGGLE_URL=http://localhost:8080/api/v1/features
```

## How To ##

* **Run application**

`docker build . -t feature-toggle/frontend && docker run -p 3000:80 feature-toggle/frontend`

Then the application will be available on http://localhost:3000
