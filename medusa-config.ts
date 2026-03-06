import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
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
              cloudName: "dwe3qjw0v",
              apiKey: "443559325679963",
              apiSecret: "uKD9saxZxLmyIZk9MeQJ2A1otjk",
            },
          },
        ],
      },
    },
  }
})

console.log("Medusa Config loaded with Cloudinary provider.");
