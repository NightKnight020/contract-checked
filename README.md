# Contract Checked 🚀

AI-powered contract analysis made simple. Upload any contract and get instant insights into key clauses, potential risks, and recommendations.

![Contract Checked](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Contract+Checked)

## 🌟 Features

- **Drag & Drop Upload**: Support for PDF, Word (.docx), and text files
- **AI-Powered Analysis**: Advanced contract analysis using OpenAI GPT-4
- **Risk Assessment**: Identify high-impact clauses and potential advantages/disadvantages
- **Clean UI/UX**: Modern, user-friendly interface built with Next.js and Tailwind CSS
- **Database Storage**: Secure storage of analyses using Supabase
- **Real-time Processing**: Instant analysis results

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4 (with Claude option available)
- **Database**: Supabase (PostgreSQL)
- **Icons**: Heroicons, Lucide React
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Supabase account
- An OpenAI API key
- GitHub account for deployment

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to Settings → API
3. Copy your project URL and anon key
4. Go to the SQL Editor and run the schema from `supabase-schema.sql`

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 📋 Manual Setup Instructions

### Step-by-Step API Setup

#### OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

#### Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details (name, password, region)
4. Wait for project to be set up (~2 minutes)
5. Go to Settings → API
6. Copy URL and anon key to `.env.local`
7. Go to SQL Editor
8. Copy and paste the contents of `supabase-schema.sql`
9. Click "Run" to create the database tables

## 🚀 Deployment to Vercel

### Connect Your Domain

1. **Purchase Domain**: You already have `contractchecked.com` from GoDaddy
2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```
3. **Configure Domain in Vercel**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Domains
   - Add `contractchecked.com`
   - Vercel will provide DNS records

4. **Update GoDaddy DNS**:
   - Log in to your GoDaddy account
   - Go to Domain Settings for `contractchecked.com`
   - Update nameservers or DNS records as instructed by Vercel
   - This usually takes 24-48 hours to propagate

### Environment Variables on Vercel

In your Vercel project settings, add these environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

## 📁 Project Structure

```
contract-checked/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main landing page
│   ├── components/
│   │   ├── ContractUpload.tsx  # File upload component
│   │   └── AnalysisResults.tsx # Results display component
│   └── lib/
│       ├── supabase.ts         # Database client & types
│       └── ai-service.ts       # AI analysis logic
├── supabase-schema.sql         # Database schema
├── package.json
└── README.md
```

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (via ESLint)

## 📊 How It Works

1. **Upload**: User drags and drops or selects a contract file
2. **Extract**: Text is extracted from PDF/Word/text files
3. **Analyze**: OpenAI GPT-4 analyzes the contract content
4. **Store**: Results are saved to Supabase database
5. **Display**: Clean, organized results shown to user

## 🤝 Contributing

This is a solo project for now, but feel free to suggest improvements!

## 📄 License

This project is private and proprietary.

## ⚠️ Disclaimer

**This AI analysis is for informational purposes only and does not constitute legal advice. Always consult with qualified legal professionals for contract review and advice.**

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure all environment variables are set correctly
3. Verify your API keys are valid and have sufficient credits
4. Check that Supabase database is properly configured

## 🎯 Future Enhancements

- User authentication and account management
- Contract comparison feature
- Export analysis reports as PDF
- Integration with legal research databases
- Multi-language support
- Advanced risk scoring algorithms

---

**Built with ❤️ for making contract analysis accessible to everyone**
