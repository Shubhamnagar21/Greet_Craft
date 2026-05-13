const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const Template = require('../models/Template');

const templates = [
  {
    title: 'Happy Birthday Balloons',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    category: 'Birthday',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.72, size: 0.16 },
      text: { x: 0.5, y: 0.9, color: '#ffffff', fontSize: 0.04 },
    },
  },
  {
    title: 'Birthday Cake Celebration',
    imageUrl: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80',
    category: 'Birthday',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.68, size: 0.14 },
      text: { x: 0.5, y: 0.88, color: '#fff5e6', fontSize: 0.04 },
    },
  },
  {
    title: 'Golden Birthday Wish',
    imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    category: 'Birthday',
    isPremium: true,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.65, size: 0.18 },
      text: { x: 0.5, y: 0.87, color: '#ffd700', fontSize: 0.045 },
    },
  },
  {
    title: 'Anniversary Hearts',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    category: 'Anniversary',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.7, size: 0.15 },
      text: { x: 0.5, y: 0.9, color: '#ffe0ec', fontSize: 0.04 },
    },
  },
  {
    title: 'Elegant Anniversary',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    category: 'Anniversary',
    isPremium: true,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.65, size: 0.16 },
      text: { x: 0.5, y: 0.86, color: '#ffffff', fontSize: 0.04 },
    },
  },
  {
    title: 'Diwali Lights',
    imageUrl: 'https://images.unsplash.com/photo-1545048702-79362596cde5?w=800&q=80',
    category: 'Festivals',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.7, size: 0.14 },
      text: { x: 0.5, y: 0.88, color: '#ffd700', fontSize: 0.04 },
    },
  },
  {
    title: 'Festival of Colors',
    imageUrl: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800&q=80',
    category: 'Festivals',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.72, size: 0.15 },
      text: { x: 0.5, y: 0.92, color: '#ffffff', fontSize: 0.04 },
    },
  },
  {
    title: 'Christmas Joy',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=800&q=80',
    category: 'Festivals',
    isPremium: true,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.68, size: 0.16 },
      text: { x: 0.5, y: 0.88, color: '#c8102e', fontSize: 0.045 },
    },
  },
  {
    title: 'Romantic Shayari',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
    category: 'Shayari',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.7, size: 0.14 },
      text: { x: 0.5, y: 0.9, color: '#ff6b9d', fontSize: 0.04 },
    },
  },
  {
    title: 'Dosti Shayari',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    category: 'Shayari',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.72, size: 0.15 },
      text: { x: 0.5, y: 0.91, color: '#ffffff', fontSize: 0.04 },
    },
  },
  {
    title: 'Funny Jokes Card',
    imageUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&q=80',
    category: 'Joke',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.68, size: 0.16 },
      text: { x: 0.5, y: 0.88, color: '#ffeb3b', fontSize: 0.04 },
    },
  },
  {
    title: 'LOL Moments',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    category: 'Joke',
    isPremium: true,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.7, size: 0.15 },
      text: { x: 0.5, y: 0.9, color: '#ffffff', fontSize: 0.04 },
    },
  },
  {
    title: 'Words of Wisdom',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    category: 'Updesh',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.7, size: 0.14 },
      text: { x: 0.5, y: 0.89, color: '#e0f7fa', fontSize: 0.04 },
    },
  },
  {
    title: 'Inspirational Quote',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    category: 'Updesh',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.72, size: 0.15 },
      text: { x: 0.5, y: 0.92, color: '#ffffff', fontSize: 0.04 },
    },
  },
  {
    title: 'Love Forever',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
    category: 'Love',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.68, size: 0.16 },
      text: { x: 0.5, y: 0.88, color: '#ff1744', fontSize: 0.045 },
    },
  },
  {
    title: 'Valentine Special',
    imageUrl: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&q=80',
    category: 'Love',
    isPremium: true,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.7, size: 0.15 },
      text: { x: 0.5, y: 0.9, color: '#ffcdd2', fontSize: 0.04 },
    },
  },
  {
    title: 'Trending Vibes',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    category: 'Trending',
    isPremium: false,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.72, size: 0.15 },
      text: { x: 0.5, y: 0.91, color: '#ffffff', fontSize: 0.04 },
    },
  },
  {
    title: 'Viral Greeting',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    category: 'Trending',
    isPremium: true,
    overlayConfig: {
      profileImage: { x: 0.5, y: 0.68, size: 0.16 },
      text: { x: 0.5, y: 0.88, color: '#e040fb', fontSize: 0.045 },
    },
  },
];

const seedTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/greetings_app');
    console.log('MongoDB connected for seeding');

    await Template.deleteMany({});
    console.log('Cleared existing templates');

    const created = await Template.insertMany(templates);
    console.log(`Seeded ${created.length} templates successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedTemplates();
