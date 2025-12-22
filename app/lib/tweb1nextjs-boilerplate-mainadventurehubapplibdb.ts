
export const verifyAdminCredentials = async (username: string, passwordInput: string): Promise<AdminUser | null> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) return null;

  // WARNING: In production, always use bcrypt/argon2 hashing.
  // Assuming plain text for minimal migration as per user context.
  if (data.password === passwordInput) { 
      return toCamelCase(data) as unknown as AdminUser;
  }
  return null;
};
