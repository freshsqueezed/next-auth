'use server';

import * as z from 'zod';
import { genSalt, hash } from 'bcryptjs';
import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/lib/db/queries/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, email, password } = validateFields.data;
  const salt = await genSalt();
  const hashed = await hash(password, salt);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email taken' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  });

  // TODO: Sent verification token email

  return {
    success: 'Email sent!',
  };
};
