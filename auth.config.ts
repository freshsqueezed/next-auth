import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from './lib/db/queries/user';
import { compare } from 'bcryptjs';

export default {
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await compare(password, user.password);
          if (passwordMatch) return user;

          return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
