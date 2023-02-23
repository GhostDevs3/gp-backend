# [**JOBS PORTAL - BACKEND**](/)

_Breve descripción del backend haciendo uso de Express_

- [**JOBS PORTAL - BACKEND**](#jobs-portal---backend)
  - [**Definición de los endpoints**](#definición-de-los-endpoints)
    - [**/api**](#api)
    - [**/api/users**](#apiusers)
      - [**GET:**](#get)
      - [**POST:**](#post)
      - [**DELETE:**](#delete)
    - [**/api/users/:id**](#apiusersid)
      - [**GET:**](#get-1)
      - [**POST:**](#post-1)
        - [Body](#body)
        - [Response](#response)
        - [Errors](#errors)
      - [**DELETE:**](#delete-1)
    - [**/api/jobs**](#apijobs)
      - [**GET:**](#get-2)
      - [**POST:**](#post-2)
      - [**DELETE:**](#delete-2)

## [**Definición de los endpoints**](/)

_Breve descripción de los endpoints_

### [**/api**](/)

---

### [**/api/users**](/)

#### [**GET:**](/)

_Breve descripción del medotod GET: dentro del endpoint /api/users_

#### [**POST:**](/)

_Breve descripción del medotod POST: dentro del endpoint /api/users_

#### [**DELETE:**](/)

_Breve descripción del medotod DELETE: dentro del endpoint /api/users_

### [**/api/users/:id**](/)

#### [**GET:**](/)

Obtiene los datos del usuario a través del parametro `:id`.

#### [**POST:**](/)

Actualiza los datos del usuario a través del parametro `:id` y recibe como body el siguiente `.json`:

##### [Body](/)

```json
{
  "userId": "XXXXXXXXXXXXXXXX",
  "userName": "Rafa",
  "job": "Null",
  "currentSalary" : "-5000$",
  "experience" : "undefined",
  ...
}
```

##### [Response](/)

```json
{
  ...
}
```

##### [Errors](/)

| **Código** | **Mensaje**  | Implementado |
| :--------: | :----------- | :----------: |
|    400     | BAD REQUEST  |   &cross;    |
|    401     | UNAUTHORIZED |   &cross;    |
|    403     | FORBIDDEN    |   &cross;    |
|    404     | NOT FOUND    |   &check;    |

#### [**DELETE:**](/)

Elimina al usuario de la base de datos a través del parametro `:id`.

---

### [**/api/jobs**](/)

#### [**GET:**](/)

_Breve descripción del medotod GET: dentro del endpoint /api/jobs_

#### [**POST:**](/)

_Breve descripción del medotod POST: dentro del endpoint /api/jobs_

#### [**DELETE:**](/)

_Breve descripción del medotod DELETE: dentro del endpoint /api/jobs_

---
