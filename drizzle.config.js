/** import { defineConfig } from "drizzle-kit"; */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_rjHlBLvOe76E@ep-empty-math-a1mi2qyp-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
  }
};