import * as bcrypt from 'bcrypt';

export async function comparePassword(
  password: string,
  dbPassword = '',
): Promise<boolean> {
  return bcrypt.compare(password, dbPassword);
}

export function hashPassword(password = 'admin@123'): string {
  return bcrypt.hashSync(password, 10);
}
