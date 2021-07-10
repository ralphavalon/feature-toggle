# MyProject

## About the project ##

### Technologies ###

* It mainly uses:
```
Docker
Docker Compose
```

* And if you need/want to develop too:
```
Visual Studio Code
VS Code Remote Development Extensions
```

Then you need to open `backend` project in container using Remote Development. Then open `frontend` project using the same extension. Both projects should be in different windows.

## How To ##

* **Run tests**

`docker build backend/ --target test -t myproject/backend-tests`
`docker build frontend/ --target test -t myproject/frontend-tests`

* **Run applications**

`docker-compose up --build`

Backend will be available on: http://localhost:8080
Frontend will be available on: http://localhost:3000
