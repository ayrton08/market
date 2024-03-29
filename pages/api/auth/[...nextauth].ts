import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { createToken, findOrCreateAuth } from 'controllers/auth-controller';

export default NextAuth({
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Correo',
          type: 'email',
          placeholder: 'correo@google.com',
        },
        code: {
          label: 'Code',
          type: 'text',
          placeholder: '****',
        },
      },
      async authorize(credentials) {
        const { email, id, image, name } = await createToken(
          credentials?.email!,
          Number(credentials?.code!)
        );

        return {
          id,
          email,
          image,
          fullname: name,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/signIn',
    newUser: '/signIn',
  },

  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },

  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            const data = await findOrCreateAuth(user);
            const userData = {
              id: data.userId,
              email: data.email,
              image: user.image,
              fullname: user.name,
            };
            token.user = { ...userData };

            break;
          case 'credentials':
            token.user = user;

            break;
        }
      }

      return token;
    },
    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  },
});

// export default NextAuth(authOptions);
