import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile, user, credentials }: any) {
      try {
        // serverless -> lambda -> dynamodb
        // every nextjs route is a serverless route. which means that this is a lambda function which opens up only when its gets called. So every-time its gets called it needs to spin up the server and make a connection to the database, which is no problem because we do not need to run a server constantly but we do have to make a connection to the database

        await connectToDB();

        // check if user already exist

        const user = await User.findOne({ email: profile.email });

        // if not create a new user

        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
