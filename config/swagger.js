const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Book API",
      version: "1.0.0",
      description: "Book App Backend with JWT Authentication"
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT}`
      }
    ],

    tags: [
      { name: "Users" },
      { name: "Books" },
      { name: "Admin" },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      // 🔹 ONLY REQUIRED SCHEMAS (no examples)
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" }
          }
        },

        Book: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            content: { type: "string" },
            Author: { type: "string" }
          }
        },

        SuccessResponse: {
          type: "object",
          properties: {
            status: { type: "string" }
          }
        },

        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string" },
            message: { type: "string" }
          }
        }
      }
    }
  },

  apis: ["./docs/*.js"]
};

module.exports = swaggerJsDoc(swaggerOptions);
