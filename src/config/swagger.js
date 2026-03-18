const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Money Tracker API",
      version: "1.0.0",
      description: "...",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Transaction: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            amount: { type: "integer" },
            type: { type: "string", enum: ["expense", "revenue"] },
            category_id: { type: "integer" },
            date: { type: "string", format: "date" },
            created_at: { type: "string", format: "date-time" },
          },
        },

        Category: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            user_id: { type: "integer" },
          },
        },

        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            token: { type: "string" },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },

    tags: [
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Transactions", description: "Transaction management" },
      { name: "Categories", description: "Category management" },
      { name: "Analytics", description: "Financial analytics endpoints" },
      { name: "Dashboard", description: "Dashboard summary endpoints" },
    ],
  },

  apis: ["./src/modules/**/*.routes.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
