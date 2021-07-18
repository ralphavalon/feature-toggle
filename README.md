# FeatureToggle

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

`docker build backend/ --target test -t feature-toggle/backend-tests`

* **Run applications**

* You **need to have** `.env` file in `frontend/` directory with its variables. Check `frontend/README.md` for more information.

* After that, you just need to run:

`docker-compose up --build`

Backend will be available on: http://localhost:8080
Frontend will be available on: http://localhost:3000

## Considerations and Assumptions ##

### Assumptions

* From my understanding, I got a bit confused about that example API. If it was a request to add a customer to some features or if it was some sort of search, so I went with the first option and then realized it should be the second one.
* Since that's a POST to `features` resource, it will be not RESTful, although it will be REST.
* `technicalName` will be the id.
* `technicalName` and `customerIds` will be mandatory, according to the document. (`inverted` is as well but it evaluates to false if it's not given)
* Archiving a feature gives the idea of logical delete, but in order to ease things up, I used a hard delete.

### Considerations

* In order to just show the code features, I skipped confirmation of archiving features.
* It was a fun challenge.
