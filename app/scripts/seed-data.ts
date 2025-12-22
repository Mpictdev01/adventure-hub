// Migration script to seed initial data to Supabase
// Run with: npx tsx app/scripts/seed-data.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vydiimqwsyngeclutxun.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZGlpbXF3c3luZ2VjbHV0eHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMTU2MzcsImV4cCI6MjA4MTg5MTYzN30.JPKcHFk1Y62t6JIOd8md30auP41h5ovlUGVoXZTZoMY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Trips data
const trips = [
  {
    id: 'bromo-sunrise',
    title: 'Mt. Bromo Sunrise',
    location: 'East Java',
    difficulty: 'Easy',
    duration: '3 Days',
    price: 'IDR 1.2M',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8wCI9xFc-q5QZOmOOtHxtGtX9BTqtLdqNMcH78FyGrQJpvwKuxmvu7Z_QCSdiN-zdbR_x8O4KVxK0ETpYjbvgPFl0MplVCBYQtuHL5byRP1QRDThVSpow-s-SyC5ssJHdPAojgc79ggpgjsxEBM-FCCUDLZvMlK5vlUkEEDnosgU9dGZX2srkStcK1cuIus0vluohROmEP9xbDPxzUIMCuZ1v25RB4ZbF8cwTEKZKZ2zz1DM2OfirQ8hC6WQ6rdO0lAgOyklJvZk',
    rating: 4.8,
    badge: 'Open Trip',
    date: 'Aug 12-14'
  },
  {
    id: 'rinjani-summit',
    title: 'Mt. Rinjani Summit',
    location: 'Lombok',
    difficulty: 'Hard',
    duration: '4 Days',
    price: 'IDR 2.8M',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK-Ezx_fs_F6TayRto0S_xdtpYmRIGXy09tOsBwNtzT_N9FYrB4963KgLxrK0ukYlVf3fxg9YY6-mj6Wiy1U-lGcqCAAQnMKXPTeOwxpOWBll2xHX3zTIHdYTTgpNNdFljjx9OTT-yC7tRhbflwWwFycZcGNTP93dGvTQirEJjWSoy03O2JeY3XdK0tmmSDqGZEkH4WbwGOLtAuW4-REalvrFERr8D89pklzWOYrCBuvqz4vAoYHQLFjpWUdY_67VrMHZ10WEf_vU',
    rating: 4.9,
    badge: 'Open Trip',
    date: 'Sep 05-08'
  },
  {
    id: 'kerinci-trek',
    title: 'Mt. Kerinci Trek',
    location: 'Sumatra',
    difficulty: 'Medium',
    duration: '3 Days',
    price: 'IDR 2.1M',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW-wvEymSwAeo-SNe0khrCjvuM0y4REzSNJ4Sh8SPjUvCw5djbcnWWL38rTlrwKPkQ2b_XXvBGbjS96Ysq9hyPmBPepnWKDFWU-oPfY252JzZ9cAgbspC0qs-T42o_YrzlvJ2922RKXHZROs8TQ09CTvLU1ouFXf-j2vJlxY5xwDsAi16fh-qn56BZS7ki9eHEvzMaTf9UcBxnyQb-nuSlli7jeK4m42wvqMNQq22JEYLYxs3eX3Q5bSsU6yXXs_241hHJeKCrG6k',
    rating: 4.7,
    badge: 'Open Trip',
    date: 'Sep 20-22'
  },
  {
    id: 'prau',
    title: 'Mt. Prau',
    location: 'Central Java',
    difficulty: 'Easy',
    duration: '2 Days',
    price: 'IDR 850K',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr8zpipOAqYxfrMrPCj7xTW0SrxONQyE-6Wv-ZYEb8AKJnO80CdvxAPAfswROSIgQxic-Wz6qqU-pgklucF8WA4jyqLLpBtlpMW5Qe1fo3zmadFYBwbzM4AijqvIChqqSCtx18F2yxMiBj_fHEs-vXuMMrSqkdFRNSRMfZuhZ0fUa6CizE-5DwZX1mRxQFJldwNsOzzqaW3QmDtVpQjH9c_kiiHeEuE4sN5iXI_DUXjru7zWJv61T_taQwJEtlu_4oNko0BqkbBxg',
    rating: 4.6,
    badge: 'Open Trip',
    date: 'Oct 01-02'
  },
  {
    id: 'semeru-private',
    title: 'Mt. Semeru Private',
    location: 'East Java',
    difficulty: 'Hard',
    duration: '3 Days',
    price: 'IDR 3.5M',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8wCI9xFc-q5QZOmOOtHxtGtX9BTqtLdqNMcH78FyGrQJpvwKuxmvu7Z_QCSdiN-zdbR_x8O4KVxK0ETpYjbvgPFl0MplVCBYQtuHL5byRP1QRDThVSpow-s-SyC5ssJHdPAojgc79ggpgjsxEBM-FCCUDLZvMlK5vlUkEEDnosgU9dGZX2srkStcK1cuIus0vluohROmEP9xbDPxzUIMCuZ1v25RB4ZbF8cwTEKZKZ2zz1DM2OfirQ8hC6WQ6rdO0lAgOyklJvZk',
    rating: 4.9,
    badge: 'Private Trip',
    date: 'Anytime'
  },
  {
    id: 'merbabu-private',
    title: 'Mt. Merbabu Private',
    location: 'Central Java',
    difficulty: 'Medium',
    duration: '2 Days',
    price: 'IDR 2.2M',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr8zpipOAqYxfrMrPCj7xTW0SrxONQyE-6Wv-ZYEb8AKJnO80CdvxAPAfswROSIgQxic-Wz6qqU-pgklucF8WA4jyqLLpBtlpMW5Qe1fo3zmadFYBwbzM4AijqvIChqqSCtx18F2yxMiBj_fHEs-vXuMMrSqkdFRNSRMfZuhZ0fUa6CizE-5DwZX1mRxQFJldwNsOzzqaW3QmDtVpQjH9c_kiiHeEuE4sN5iXI_DUXjru7zWJv61T_taQwJEtlu_4oNko0BqkbBxg',
    rating: 4.7,
    badge: 'Private Trip',
    date: 'Anytime'
  },
  {
    id: 'ijen-private',
    title: 'Ijen Crater Private',
    location: 'East Java',
    difficulty: 'Easy',
    duration: '2 Days',
    price: 'IDR 1.8M',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLKHHweBA6LhzgFj4VzgDepwFcU5pErPdxtySiTgeKVzT6shZUq3GxqQudczMrN3sQJ16SXp4A_dvgDnbPdEyWXJOYca4s0uvcFvkQWfYQVCEIcWlnpan8CAhZnWgiFKwfFQUZTvNuqBBxsdjcbTxVfkM_w-fE08yQZ5ztZapsVF8L-wIIcrPZlkk3I2cGPf2mFgKkGhuJoH8lVFSNAX9Jt9qLXzdGQ_JBQxMIJ82mdtHFmb_m4LMV0rp8RiLS0GvVCDIwGOOrDb4',
    rating: 4.8,
    badge: 'Private Trip',
    date: 'Anytime'
  },
  {
    id: 'latimojong-private',
    title: 'Mt. Latimojong',
    location: 'Sulawesi',
    difficulty: 'Hard',
    duration: '5 Days',
    price: 'IDR 4.5M',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK-Ezx_fs_F6TayRto0S_xdtpYmRIGXy09tOsBwNtzT_N9FYrB4963KgLxrK0ukYlVf3fxg9YY6-mj6Wiy1U-lGcqCAAQnMKXPTeOwxpOWBll2xHX3zTIHdYTTgpNNdFljjx9OTT-yC7tRhbflwWwFycZcGNTP93dGvTQirEJjWSoy03O2JeY3XdK0tmmSDqGZEkH4WbwGOLtAuW4-REalvrFERr8D89pklzWOYrCBuvqz4vAoYHQLFjpWUdY_67VrMHZ10WEf_vU',
    rating: 4.9,
    badge: 'Private Trip',
    date: 'Anytime'
  }
];

// Articles data
const articles = [
  {
    id: '1',
    title: 'The Ultimate Guide to Hiking Mt. Rinjani',
    excerpt: 'Discover the secrets of Lombok\'s majestic volcano. From packing tips to the best sunrise spots.',
    content: '<p>Mount Rinjani, rising 3,726 meters above sea level, is not just a mountain; it\'s a pilgrimage for trekkers worldwide.</p>',
    category: 'GUIDES',
    date: 'Oct 12, 2024',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK-Ezx_fs_F6TayRto0S_xdtpYmRIGXy09tOsBwNtzT_N9FYrB4963KgLxrK0ukYlVf3fxg9YY6-mj6Wiy1U-lGcqCAAQnMKXPTeOwxpOWBll2xHX3zTIHdYTTgpNNdFljjx9OTT-yC7tRhbflwWwFycZcGNTP93dGvTQirEJjWSoy03O2JeY3XdK0tmmSDqGZEkH4WbwGOLtAuW4-REalvrFERr8D89pklzWOYrCBuvqz4vAoYHQLFjpWUdY_67VrMHZ10WEf_vU',
    is_featured: true
  },
  {
    id: '2',
    title: '5 Hidden Gems in East Java You Must Visit',
    excerpt: 'Beyond Bromo and Ijen. Explore the untouched beauty of Java.',
    content: '<p>East Java is famous for Mount Bromo and Ijen Crater, but there is so much more to explore.</p>',
    category: 'DISCOVERY',
    date: 'Sep 28, 2024',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8wCI9xFc-q5QZOmOOtHxtGtX9BTqtLdqNMcH78FyGrQJpvwKuxmvu7Z_QCSdiN-zdbR_x8O4KVxK0ETpYjbvgPFl0MplVCBYQtuHL5byRP1QRDThVSpow-s-SyC5ssJHdPAojgc79ggpgjsxEBM-FCCUDLZvMlK5vlUkEEDnosgU9dGZX2srkStcK1cuIus0vluohROmEP9xbDPxzUIMCuZ1v25RB4ZbF8cwTEKZKZ2zz1DM2OfirQ8hC6WQ6rdO0lAgOyklJvZk',
    is_featured: false
  },
  {
    id: '3',
    title: 'Essential Gear for Tropical Trekking',
    excerpt: 'Don\'t let the humidity catch you off guard. Pack smart.',
    content: '<p>Trekking in Indonesia\'s tropical climate presents unique challenges.</p>',
    category: 'TIPS',
    date: 'Sep 15, 2024',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW-wvEymSwAeo-SNe0khrCjvuM0y4REzSNJ4Sh8SPjUvCw5djbcnWWL38rTlrwKPkQ2b_XXvBGbjS96Ysq9hyPmBPepnWKDFWU-oPfY252JzZ9cAgbspC0qs-T42o_YrzlvJ2922RKXHZROs8TQ09CTvLU1ouFXf-j2vJlxY5xwDsAi16fh-qn56BZS7ki9eHEvzMaTf9UcBxnyQb-nuSlli7jeK4m42wvqMNQq22JEYLYxs3eX3Q5bSsU6yXXs_241hHJeKCrG6k',
    is_featured: false
  },
  {
    id: '4',
    title: 'Why You Should Join an Open Trip',
    excerpt: 'Make new friends and share unforgettable memories.',
    content: '<p>Are you a solo traveler looking for an adventure? Join an Open Trip!</p>',
    category: 'COMMUNITY',
    date: 'Aug 30, 2024',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr8zpipOAqYxfrMrPCj7xTW0SrxONQyE-6Wv-ZYEb8AKJnO80CdvxAPAfswROSIgQxic-Wz6qqU-pgklucF8WA4jyqLLpBtlpMW5Qe1fo3zmadFYBwbzM4AijqvIChqqSCtx18F2yxMiBj_fHEs-vXuMMrSqkdFRNSRMfZuhZ0fUa6CizE-5DwZX1mRxQFJldwNsOzzqaW3QmDtVpQjH9c_kiiHeEuE4sN5iXI_DUXjru7zWJv61T_taQwJEtlu_4oNko0BqkbBxg',
    is_featured: false
  }
];

// Gallery data
const gallery = [
  {
    id: '1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8wCI9xFc-q5QZOmOOtHxtGtX9BTqtLdqNMcH78FyGrQJpvwKuxmvu7Z_QCSdiN-zdbR_x8O4KVxK0ETpYjbvgPFl0MplVCBYQtuHL5byRP1QRDThVSpow-s-SyC5ssJHdPAojgc79ggpgjsxEBM-FCCUDLZvMlK5vlUkEEDnosgU9dGZX2srkStcK1cuIus0vluohROmEP9xbDPxzUIMCuZ1v25RB4ZbF8cwTEKZKZ2zz1DM2OfirQ8hC6WQ6rdO0lAgOyklJvZk',
    caption: 'Mt. Bromo Sunrise',
    location: 'Mt. Bromo, East Java',
    activities: '2 Aktivitas',
    size: 'Tall'
  },
  {
    id: '2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr8zpipOAqYxfrMrPCj7xTW0SrxONQyE-6Wv-ZYEb8AKJnO80CdvxAPAfswROSIgQxic-Wz6qqU-pgklucF8WA4jyqLLpBtlpMW5Qe1fo3zmadFYBwbzM4AijqvIChqqSCtx18F2yxMiBj_fHEs-vXuMMrSqkdFRNSRMfZuhZ0fUa6CizE-5DwZX1mRxQFJldwNsOzzqaW3QmDtVpQjH9c_kiiHeEuE4sN5iXI_DUXjru7zWJv61T_taQwJEtlu_4oNko0BqkbBxg',
    caption: 'Mt. Prau View',
    location: 'Mt. Prau, Central Java',
    activities: '1 Aktivitas',
    size: 'Normal'
  },
  {
    id: '3',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8wCI9xFc-q5QZOmOOtHxtGtX9BTqtLdqNMcH78FyGrQJpvwKuxmvu7Z_QCSdiN-zdbR_x8O4KVxK0ETpYjbvgPFl0MplVCBYQtuHL5byRP1QRDThVSpow-s-SyC5ssJHdPAojgc79ggpgjsxEBM-FCCUDLZvMlK5vlUkEEDnosgU9dGZX2srkStcK1cuIus0vluohROmEP9xbDPxzUIMCuZ1v25RB4ZbF8cwTEKZKZ2zz1DM2OfirQ8hC6WQ6rdO0lAgOyklJvZk',
    caption: 'Mt. Semeru Peak',
    location: 'Mt. Semeru, East Java',
    activities: '3 Aktivitas',
    size: 'Wide'
  },
  {
    id: '4',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr8zpipOAqYxfrMrPCj7xTW0SrxONQyE-6Wv-ZYEb8AKJnO80CdvxAPAfswROSIgQxic-Wz6qqU-pgklucF8WA4jyqLLpBtlpMW5Qe1fo3zmadFYBwbzM4AijqvIChqqSCtx18F2yxMiBj_fHEs-vXuMMrSqkdFRNSRMfZuhZ0fUa6CizE-5DwZX1mRxQFJldwNsOzzqaW3QmDtVpQjH9c_kiiHeEuE4sN5iXI_DUXjru7zWJv61T_taQwJEtlu_4oNko0BqkbBxg',
    caption: 'Mt. Merbabu Trail',
    location: 'Mt. Merbabu, Central Java',
    activities: '2 Aktivitas',
    size: 'Normal'
  },
  {
    id: '5',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLKHHweBA6LhzgFj4VzgDepwFcU5pErPdxtySiTgeKVzT6shZUq3GxqQudczMrN3sQJ16SXp4A_dvgDnbPdEyWXJOYca4s0uvcFvkQWfYQVCEIcWlnpan8CAhZnWgiFKwfFQUZTvNuqBBxsdjcbTxVfkM_w-fE08yQZ5ztZapsVF8L-wIIcrPZlkk3I2cGPf2mFgKkGhuJoH8lVFSNAX9Jt9qLXzdGQ_JBQxMIJ82mdtHFmb_m4LMV0rp8RiLS0GvVCDIwGOOrDb4',
    caption: 'Kawah Ijen Blue Fire',
    location: 'Kawah Ijen, East Java',
    activities: '1 Aktivitas',
    size: 'Normal'
  },
  {
    id: '6',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK-Ezx_fs_F6TayRto0S_xdtpYmRIGXy09tOsBwNtzT_N9FYrB4963KgLxrK0ukYlVf3fxg9YY6-mj6Wiy1U-lGcqCAAQnMKXPTeOwxpOWBll2xHX3zTIHdYTTgpNNdFljjx9OTT-yC7tRhbflwWwFycZcGNTP93dGvTQirEJjWSoy03O2JeY3XdK0tmmSDqGZEkH4WbwGOLtAuW4-REalvrFERr8D89pklzWOYrCBuvqz4vAoYHQLFjpWUdY_67VrMHZ10WEf_vU',
    caption: 'Rinjani Crater Lake',
    location: 'Mt. Rinjani, Lombok',
    activities: '4 Aktivitas',
    size: 'Normal'
  }
];

async function seedData() {
  console.log('🌱 Starting data seeding...\n');

  // Seed Trips
  console.log('📍 Seeding trips...');
  const { error: tripsError } = await supabase
    .from('trips')
    .upsert(trips, { onConflict: 'id' });
  
  if (tripsError) {
    console.error('❌ Error seeding trips:', tripsError.message);
  } else {
    console.log(`✅ Seeded ${trips.length} trips`);
  }

  // Seed Articles
  console.log('\n📝 Seeding articles...');
  const { error: articlesError } = await supabase
    .from('articles')
    .upsert(articles, { onConflict: 'id' });
  
  if (articlesError) {
    console.error('❌ Error seeding articles:', articlesError.message);
  } else {
    console.log(`✅ Seeded ${articles.length} articles`);
  }

  // Seed Gallery
  console.log('\n🖼️ Seeding gallery...');
  const { error: galleryError } = await supabase
    .from('gallery')
    .upsert(gallery, { onConflict: 'id' });
  
  if (galleryError) {
    console.error('❌ Error seeding gallery:', galleryError.message);
  } else {
    console.log(`✅ Seeded ${gallery.length} gallery items`);
  }

  console.log('\n🎉 Data seeding completed!');
}

seedData();
