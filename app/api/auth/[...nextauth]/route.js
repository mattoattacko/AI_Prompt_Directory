// This is an API route with a dynamic next auth
// Includes all our providers eg: google auth
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// import User from '@models/user';
// import { connectToDB } from "@utils/database";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   async session({ session }) {
//     // we want to be able to get our data about the user every time to keep an existing and running session.
//     const sessionUser = await User.findOne({
//       email: session.user.email //get the user from the session
//     })

//     session.user.id = sessionUser._id.toString(); //update the session with the user's id

//     return session;
//   },

//   async signIn({ profile }) {
//     try {
//       await connectToDB();

//       // check if user exists in our DB
//       const userExists = await User.findOne({
//         email: profile.email
//       });

//       // if not, create user in our DB
//       if (!userExists) {
//         await User.create({
//           email: profile.email,
//           username: profile.name.replace(" ", "").toLowerCase(), // remove spaces and make lowercase
//           image: profile.picture,
//         });
//       }
//       // return true to sign in the user
//       return true;
//     } catch (error) {
//       console.log(error);
//     }
//   },
// })

// // new style of export for Next.
// export { handler as GET, handler as POST };

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }