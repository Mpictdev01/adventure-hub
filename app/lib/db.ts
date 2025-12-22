import { supabase } from './supabase';

// Types
export interface Trip {
  id: string;
  title: string;
  location: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Beginner" | "Intermediate" | "Expert";
  duration: string;
  price: string;
  imageUrl: string;
  rating?: number;
  badge?: "Open Trip" | "Private Trip";
  date?: string;
}

export interface ParticipantData {
  fullName: string;
  idNumber: string;
  phone?: string;
  email?: string;
}

export interface Booking {
  id: string;
  tripId: string;
  tripName: string;
  tripImage: string;
  tripLocation: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  totalPrice: number;
  pricePerPax: number;
  participants: ParticipantData[];
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  paymentStatus: 'Unpaid' | 'Paid';
  paymentMethod: string;
  proofOfPaymentUrl?: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  img: string;
  isFeatured: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  location?: string;
  activities?: string;
  size?: "Normal" | "Wide" | "Tall" | "Big";
}

// Helper function to convert snake_case to camelCase
const toCamelCase = (obj: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = obj[key];
  }
  return result;
};

// Helper function to convert camelCase to snake_case
const toSnakeCase = (obj: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    result[snakeKey] = obj[key];
  }
  return result;
};

// ==================== TRIPS ====================
export const getTrips = async (): Promise<Trip[]> => {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching trips:', error);
    return [];
  }
  
  return (data || []).map((row) => toCamelCase(row) as unknown as Trip);
};

export const getTripById = async (id: string): Promise<Trip | undefined> => {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching trip:', error);
    return undefined;
  }
  
  return data ? (toCamelCase(data) as unknown as Trip) : undefined;
};

export const saveTrip = async (trip: Trip): Promise<void> => {
  const snakeCaseTrip = toSnakeCase(trip as unknown as Record<string, unknown>);
  
  const { error } = await supabase
    .from('trips')
    .upsert(snakeCaseTrip, { onConflict: 'id' });
  
  if (error) {
    console.error('Error saving trip:', error);
    throw error;
  }
};

export const deleteTrip = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('trips')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting trip:', error);
    throw error;
  }
};

// ==================== BOOKINGS ====================
export const getBookings = async (): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
  
  return (data || []).map((row) => toCamelCase(row) as unknown as Booking);
};

export const getBookingById = async (id: string): Promise<Booking | undefined> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching booking:', error);
    return undefined;
  }
  
  return data ? (toCamelCase(data) as unknown as Booking) : undefined;
};

export const createBooking = async (booking: Booking): Promise<void> => {
  const snakeCaseBooking = toSnakeCase(booking as unknown as Record<string, unknown>);
  
  const { error } = await supabase
    .from('bookings')
    .insert(snakeCaseBooking);
  
  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const updateBookingStatus = async (id: string, status: Booking['status']): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

export const updateBooking = async (id: string, updates: Partial<Booking>): Promise<void> => {
  const snakeCaseUpdates = toSnakeCase(updates as unknown as Record<string, unknown>);
  
  const { error } = await supabase
    .from('bookings')
    .update(snakeCaseUpdates)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

export const deleteBooking = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};

// ==================== ARTICLES ====================
export const getArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  
  return (data || []).map((row) => toCamelCase(row) as unknown as Article);
};

export const getArticleById = async (id: string): Promise<Article | undefined> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching article:', error);
    return undefined;
  }
  
  return data ? (toCamelCase(data) as unknown as Article) : undefined;
};

export const saveArticle = async (article: Article): Promise<void> => {
  const snakeCaseArticle = toSnakeCase(article as unknown as Record<string, unknown>);
  
  const { error } = await supabase
    .from('articles')
    .upsert(snakeCaseArticle, { onConflict: 'id' });
  
  if (error) {
    console.error('Error saving article:', error);
    throw error;
  }
};

export const deleteArticle = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};

// ==================== GALLERY ====================
export const getGallery = async (): Promise<GalleryItem[]> => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
  
  return (data || []).map((row) => toCamelCase(row) as unknown as GalleryItem);
};

export const getGalleryItemById = async (id: string): Promise<GalleryItem | undefined> => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching gallery item:', error);
    return undefined;
  }
  
  return data ? (toCamelCase(data) as unknown as GalleryItem) : undefined;
};

export const saveGalleryItem = async (item: GalleryItem): Promise<void> => {
  const snakeCaseItem = toSnakeCase(item as unknown as Record<string, unknown>);
  
  const { error } = await supabase
    .from('gallery')
    .upsert(snakeCaseItem, { onConflict: 'id' });
  
  if (error) {
    console.error('Error saving gallery item:', error);
    throw error;
  }
};

export const deleteGalleryItem = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
};

// ==================== ADMIN USERS ====================
export interface AdminUser {
  id: string;
  username: string;
  passwordHash?: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  createdAt?: string;
}

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  console.log('DB: Memulai fetch admin_users...');
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, username, name, email, role, created_at')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('DB: Error fetching admin users:', error);
    return [];
  }
  
  console.log('DB: Berhasil fetch admin_users, jumlah:', data?.length);
  return (data || []).map((row) => toCamelCase(row) as unknown as AdminUser);
};

export const getAdminUserById = async (id: string): Promise<AdminUser | undefined> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, username, name, email, role, created_at')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching admin user:', error);
    return undefined;
  }
  
  return data ? (toCamelCase(data) as unknown as AdminUser) : undefined;
};

export const createAdminUser = async (user: Omit<AdminUser, 'id' | 'createdAt'> & { passwordHash: string }): Promise<void> => {
  const snakeCaseUser = toSnakeCase(user as unknown as Record<string, unknown>);
  
  const { error } = await supabase
    .from('admin_users')
    .insert(snakeCaseUser);
  
  if (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

export const updateAdminUser = async (id: string, updates: Partial<AdminUser>): Promise<void> => {
  const snakeCaseUpdates = toSnakeCase(updates as unknown as Record<string, unknown>);
  
  const { error } = await supabase
    .from('admin_users')
    .update(snakeCaseUpdates)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating admin user:', error);
    throw error;
  }
};

export const deleteAdminUser = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('admin_users')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting admin user:', error);
    throw error;
  }
};

export const verifyAdminCredentials = async (username: string, password: string): Promise<AdminUser | null> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  // Simple password comparison (for development - in production use bcrypt)
  if (data.password_hash === password) {
    return toCamelCase(data) as unknown as AdminUser;
  }
  
  return null;
};

// ==================== BANK ACCOUNTS ====================
export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  logo: string;
  isActive: boolean;
  createdAt?: string;
}

export const getBankAccounts = async (activeOnly: boolean = false): Promise<BankAccount[]> => {
  let query = supabase
    .from('bank_accounts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching bank accounts:', error);
    return [];
  }
  
  return (data || []).map((row) => toCamelCase(row) as unknown as BankAccount);
};

export const getBankAccountById = async (id: string): Promise<BankAccount | undefined> => {
  const { data, error } = await supabase
    .from('bank_accounts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching bank account:', error);
    return undefined;
  }
  
  return data ? (toCamelCase(data) as unknown as BankAccount) : undefined;
};

export const createBankAccount = async (account: Omit<BankAccount, 'id' | 'createdAt'>): Promise<BankAccount> => {
  const snakeCaseAccount = toSnakeCase(account as unknown as Record<string, unknown>);
  
  const { data, error } = await supabase
    .from('bank_accounts')
    .insert(snakeCaseAccount)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating bank account:', error);
    throw error;
  }
  
  return toCamelCase(data) as unknown as BankAccount;
};

export const updateBankAccount = async (id: string, updates: Partial<BankAccount>): Promise<void> => {
  const snakeCaseUpdates = toSnakeCase(updates as unknown as Record<string, unknown>);
  
  const { error } = await supabase
    .from('bank_accounts')
    .update(snakeCaseUpdates)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating bank account:', error);
    throw error;
  }
};

export const deleteBankAccount = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('bank_accounts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting bank account:', error);
    throw error;
  }
};
