import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true"
  },
  modules: {
    file: {
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            resolve: "@ridoy_sarker/medusa-cloudinary/providers/cloudinary",
            id: "cloudinary",
            options: {
              cloudName: process.env.CLOUDINARY_CLOUD_NAME || "dwe3qjw0v",
              apiKey: process.env.CLOUDINARY_API_KEY || "443559325679963",
              apiSecret: process.env.CLOUDINARY_API_SECRET || "uKD9saxZxLmylZk9MeQJ2A1otjk",
            },
          },
        ],
      },
    },
  }
})
