# API REST con Node.js y PostgreSQL

## Descripción
Este proyecto es una API REST básica desarrollada con Node.js, Express y PostgreSQL. También incluye una página web simple con HTML y TailwindCSS para probar las funciones de la API.

## Características
- API REST organizada.
- Respuestas codificadas en JSON.
- Códigos de respuesta HTTP estándar.
- Página web para probar las funciones de la API.
- Estilos con TailwindCSS.
- Configuración de CI con GitHub Actions.

## Endpoints
- `POST /api/v1/auth`: Iniciar sesión.
- `POST /api/v1/users`: Crear un nuevo usuario.
- `DELETE /api/v1/users/:id`: Eliminar un usuario.

## Requisitos
- Node.js
- PostgreSQL

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Kembec/simple-node-api.git
    cd simple-node-api
    ```

2. Instala las dependencias:
    ```bash
    pnpm install o npm install
    ```

3. Configura las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
    ```env
    DB_NAME=nombre_de_tu_base_de_datos
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_HOST=localhost
    DB_DIALECT=postgres
    DB_PORT=3000
    ```

4. Configura la base de datos:
    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```

## Scripts de NPM

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo con observación de archivos.
- `npm run build`: Compila los estilos de TailwindCSS.
- `npm run watch:tailwind`: Observa los cambios en los estilos de TailwindCSS y los recompila.
- `npm test`: Ejecuta las pruebas con Jest.
- `npm run migrate`: Ejecuta las migraciones de la base de datos.
- `npm run seed`: Ejecuta los seeds de la base de datos.

## Uso

1. Inicia el servidor en modo desarrollo:
    ```bash
    npm run dev
    ```

2. Abre tu navegador y navega a `http://localhost:3001` para ver la página web de prueba.

## Estructura del Proyecto
```bash
├── Readme.md
├── __tests__
│   ├── controllers
│   │   └── userController.test.ts
│   └── routes
│       └── userRoutes.test.ts
├── bs-config.json
├── jest.config.js
├── nodemon.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── index.html
│   ├── scripts.js
│   └── styles.css
├── src
│   ├── app.ts
│   ├── config
│   │   └── database.ts
│   ├── controllers
│   │   └── userController.ts
│   ├── models
│   │   └── user.ts
│   ├── routes
│   │   └── userRoutes.ts
│   ├── services
│   │   └── userService.ts
│   └── types.ts
├── tailwind.config.js
└── tsconfig.json
```


## Licencia

- MIT License

