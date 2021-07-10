# MyProject - Frontend

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
|    |   |   |

```
# .env file example
```

## How To ##

* **Run tests**

`docker build . --target test -t myproject/frontend-tests`

* **Run application**

`docker build . -t myproject/frontend && docker run -p 3000:80 myproject/frontend`

Then the application will be available on http://localhost:3000
