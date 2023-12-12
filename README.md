# Api-tpo

El sistema es un marketplace que propociona a los usuarios la posibilidad de contratar y ofrecer servicios educativos.

[Documentación](https://docs.google.com/document/d/1gk4NeYf6Lw4caDGj3H_iyG0MdfR04zzBexzLsVH_PEQ/edit?usp=sharing)
## Como levantar el front
* En la carpeta api-tpo ejecuta `npm start`

## Como ejecutar el back
* Dirigirse a la carpeta api-tpo-backend
* ejecutar `node index.js`

### Endpoints disponibles 
https://documenter.getpostman.com/view/17393998/2s9YkhgPNY

## Base de datos
La base de datos que se utilizó es un postgresql para crearla se puede usar [esté script](https://docs.google.com/document/d/1NVkDXOSYkGA7clsDKPRk8rQ7hgpaCvHYzFpsaBsEXnM/edit?usp=sharing)

## Endpoints disponibles
Una vez levantado el server se puede acceder a /api-docs para ver los endpoints 
o desde https://editor.swagger.io/ pegando el contenido de [este archivo](./api-tpo-backend/swagger.json)
### /auth/login

#### POST

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 401 | Unauthorized |

### /auth/signup

#### POST
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 400 | Error - credenciales incorrectas |

### /auth/recover

#### POST

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 500 | Error |

### /auth/changePassword

#### POST

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 401 | Unauthorized |
| 500 | Error |

### /users

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 401 | Unauthorized |
| 404 | Usuario no encontrado |
| 500 | Error |

### /users/{userId}/contacts

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | ID del usuario | Yes | long |
| Authorization | header |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 401 | Unauthorized |
| 500 | Error |

### /users/{userId}/services

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | ID del usuario | Yes | long |
| Authorization | header |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 401 | Unauthorized |
| 500 | Error |

### /users/{userId}/comments

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | ID del usuario | Yes | long |
| Authorization | header |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 401 | Unauthorized |
| 500 | Error |

### /services

#### GET

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 404 | Not found |
| 500 | Error |

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 400 | Bad request |
| 401 | Unauthorized |
| 500 | Error |

### /services/{serviceId}

#### PUT

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceId | path | ID del servicio | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Error |

#### DELETE

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header |  | No | string |
| serviceId | path | ID del servicio | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 401 | Unauthorized |
| 500 | Error |

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceId | path | ID del servicio | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 404 | Not found |
| 500 | Error |

### /services/{serviceId}/contacts

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceId | path | ID del servicio | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 500 | Error |

### /contacts/{contactId}

#### PUT

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header |  | No | string |
| contactId | path | ID del contacto | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 401 | Unauthorized |
| 404 | Not found |
| 500 | Error |

### /services/{serviceId}/comments

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceId | path | ID del servicio | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 500 | Error |

### /comments/{commentId}

#### PUT

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header |  | No | string |
| commentId | path | ID del comentario | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
| 404 | Not found |
| 500 | Error |

