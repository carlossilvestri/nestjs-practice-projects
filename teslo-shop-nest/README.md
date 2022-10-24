<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API
1. Clonar el proyecto
2. ```npm i```
3. Clonar el archivo ```.env.template``` y renombrarlo ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```
6. Levantar la API en modo de desarrollo
```
npm run start:dev
```
7. Hacer una peticion GET para obtener datos de prueba
```
GET http://localhost:3000/api/seed
```
