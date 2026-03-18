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
      },
      {
        name: 'Rural Students Assistance',
        amount: '₹25,000',
        category: ['Need-based'],
        course: ['Undergraduate'],
        gender: 'Any',
        documents_required: ['Residency proof', 'Income certificate'],
        apply_link: 'https://example.com/apply/4',
        eligibilityDetails: { state: 'All', passedClass: '12', annualIncomeLimit: 100000 }
      },
      {
        name: 'International Exchange Grant',
        amount: '$2,000',
        category: ['International'],
        course: ['Postgraduate'],
        gender: 'Any',
        documents_required: ['Passport', 'Letter of acceptance'],
        apply_link: 'https://example.com/apply/5',
        eligibilityDetails: { state: 'All', passedClass: 'UG', minimumMarks: 70 }
      },
      {
        name: 'Arts & Culture Fellowship',
        amount: '₹40,000',
        category: ['Merit'],
        course: ['Undergraduate', 'Postgraduate'],
        gender: 'Any',
        documents_required: ['Portfolio', 'Recommendation letter'],
        apply_link: 'https://example.com/apply/6',
        eligibilityDetails: { state: 'All' }
      },
      {
        name: 'Sports Excellence Award',
        amount: '₹30,000',
        category: ['Sports'],
        course: ['Undergraduate'],
        gender: 'Any',
        documents_required: ['Achievement certificates'],
        apply_link: 'https://example.com/apply/7',
        eligibilityDetails: { state: 'All' }
      },
      {
        name: 'Tech Startup Scholarship',
        amount: '₹75,000',
        category: ['Merit', 'Innovation'],
        course: ['Postgraduate'],
        gender: 'Any',
        documents_required: ['Project summary', 'Pitch deck'],
        apply_link: 'https://example.com/apply/8',
        eligibilityDetails: { state: 'All', passedClass: 'UG', minimumMarks: 65 }
      },
      {
        name: 'Minority Community Support',
        amount: '₹20,000',
        category: ['Need-based'],
        course: ['Undergraduate'],
        gender: 'Any',
        documents_required: ['Community certificate', 'Income certificate'],
        apply_link: 'https://example.com/apply/9',
        eligibilityDetails: { state: 'All', annualIncomeLimit: 150000 }
      },
      {
        name: 'Single Parent Scholarship',
        amount: '₹35,000',
        category: ['Need-based'],
        course: ['Undergraduate'],
        gender: 'Any',
        documents_required: ['Proof of guardianship', 'Income certificate'],
        apply_link: 'https://example.com/apply/10',
        eligibilityDetails: { state: 'All', annualIncomeLimit: 120000 }
      },
      {
        name: 'R&D PhD Grant',
        amount: '₹2,00,000',
        category: ['Research'],
        course: ['PhD'],
        gender: 'Any',
        documents_required: ['Research proposal', 'Supervisor letter'],
        apply_link: 'https://example.com/apply/11',
        eligibilityDetails: { state: 'All' }
      },
      {
        name: 'Scholarship for differently-abled',
        amount: '₹45,000',
        category: ['Need-based'],
        course: ['Undergraduate', 'Postgraduate'],
        gender: 'Any',
        documents_required: ['Disability certificate', 'ID proof'],
        apply_link: 'https://example.com/apply/12',
        eligibilityDetails: { state: 'All' }
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
