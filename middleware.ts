import NextAuth from 'next-auth';

import authConfig from '@/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;

  console.log('IS LOGGEDIN', isLoggedIn);
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
