require('dotenv').config();
const mongoose = require('mongoose');
const Scholarship = require('./models/Scholarship');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/scholarshipdb';

async function seed() {
  try {
    await mongoose.connect(MONGO);
    console.log('Connected to Mongo for seeding');

    await Scholarship.deleteMany({});

    const docs = [
      {
        name: 'Future Leaders Merit Scholarship',
        amount: '₹50,000',
        category: ['Merit'],
        course: ['Undergraduate'],
        gender: 'Any',
        documents_required: ['ID proof', 'Marksheets'],
        apply_link: 'https://example.com/apply/1',
        eligibilityDetails: { state: 'All', passedClass: '12', minimumMarks: 75, annualIncomeLimit: 0 }
      },
      {
        name: 'Women in STEM Scholarship',
        amount: '₹1,00,000',
        category: ['Need-based', 'Merit'],
        course: ['Undergraduate', 'Postgraduate'],
        gender: 'Female',
        documents_required: ['ID proof', 'Statement of purpose'],
        apply_link: 'https://example.com/apply/2',
        eligibilityDetails: { state: 'All', passedClass: '12', minimumMarks: 70 }
      },
      {
        name: 'State Development Scholarship',
        amount: 'Variable',
        category: ['Government'],
        course: ['Undergraduate'],
        gender: 'Any',
        documents_required: ['Residency proof', 'Income certificate'],
        apply_link: 'https://example.com/apply/3',
        eligibilityDetails: { state: 'Tamil Nadu', annualIncomeLimit: 200000 }
      }
    ];

    const inserted = await Scholarship.insertMany(docs);
    console.log('Inserted scholarships:', inserted.length);
    await mongoose.disconnect();
    console.log('Disconnected after seeding');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
