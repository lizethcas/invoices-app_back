import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Invoice App API",
            version: "1.3.0",
            description: "Gestion de facturas de clientes",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de desarrollo"
            }
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "token",
                    description: "Token de autenticación almacenado en una cookie HTTPOnly"
                }
            }
        },
        tags: [
            {
                name: "Users",
                description: "Gestion de usuarios"
            },
            {
                name: "Invoices",
                description: "Gestion de facturas"
            },
            {
                name: "Auth",
                description: "Gestion de autenticacion"
            },
        ]
    },
    apis: [
        "./docs/errorResponses.js",
        "./docs/invoices.docs.js",
        "./docs/users.docs.js",
        "./docs/auth.docs.js",
        "./src/components/**/*.js",
    ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs , swaggerUi };

