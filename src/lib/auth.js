import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("hireloop");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
    emailAndPassword: { 
    enabled: true, 
  },
  user: {
    additionalFields: {
      role: {
        default: ""
      },
      plan: {
        default: "seeker_free"
      }
    }
  }
});