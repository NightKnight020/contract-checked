# Contract Checked MVP v1.0 🚀

AI-powered contract analysis made simple. Upload any contract and get instant insights into key clauses, potential risks, and recommendations. Plus, free downloadable contract templates for common legal agreements.

![Contract Checked](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Contract+Checked+MVP+v1.0)

## 🌟 Features

- **Drag & Drop Upload**: Support for PDF, Word (.docx), and text files
- **AI-Powered Analysis**: Advanced contract analysis using OpenAI GPT-4
- **Risk Assessment**: Identify high-impact clauses and potential advantages/disadvantages
- **Smart Resource Funneling**: AI-driven recommendations based on contract type and risk level
- **Expert Network**: Connect with verified legal professionals based on geolocation and specialization
- **Contract Classification**: Automatic categorization (Real Estate, Employment, Business Services, etc.)
- **Self-Learning AI**: System improves recommendations based on analysis patterns
- **Free Contract Templates**: Download professional templates for common legal agreements
- **Modern UI/UX**: Clean, beautiful interface with gradient designs and smooth animations
- **Database Storage**: Secure storage of analyses and learning data using Supabase
- **Real-time Processing**: Instant analysis results with personalized recommendations
- **Navigation**: Easy switching between analysis and resources

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4 (with Claude option available)
- **Database**: Supabase (PostgreSQL)
- **Icons**: Heroicons, Lucide React
- **Deployment**: Vercel
- **Bundler**: Webpack (default Next.js bundler)

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
8. **For the enhanced learning system**: Copy and paste the contents of `apply-schema.sql`
9. **For basic version**: Copy and paste the contents of `supabase-schema.sql`
10. Click "Run" to create the database tables and populate sample data

#### Enhanced Schema Features
The `apply-schema.sql` includes:
- **Contract Categories**: Automatic classification system
- **Resource Recommendations**: Smart funneling based on contract type
- **Expert Partners**: Geolocation-based legal professional network
- **Learning Patterns**: AI self-improvement data storage
- **Sample Experts**: Pre-populated verified attorneys and consultants

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
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main landing page with contract analysis
│   │   └── resources/
│   │       └── page.tsx        # Free contract templates page
│   ├── components/
│   │   ├── ContractUpload.tsx  # Modern file upload component
│   │   └── AnalysisResults.tsx # Results display component
│   └── lib/
│       ├── supabase.ts         # Database client & types
│       └── ai-service.ts       # AI analysis logic
├── public/
│   └── templates/              # Contract template files
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

### Basic Analysis Flow
1. **Upload**: User drags and drops or selects a contract file
2. **Extract**: Text is extracted from PDF/Word/text files
3. **Analyze**: OpenAI GPT-4 analyzes the contract content
4. **Classify**: AI categorizes contract type and assesses risk
5. **Recommend**: System suggests relevant resources and experts
6. **Store**: Results and learning data saved to Supabase database
7. **Display**: Clean, organized results with personalized recommendations

### Resource Funneling System

The AI analyzes each contract and provides tailored recommendations:

#### 🎯 **High-Risk Contracts**
- **Priority**: Expert consultation recommendations
- **Example**: Complex commercial leases or employment agreements
- **Result**: Direct connection to specialized attorneys

#### 🏠 **Real Estate Contracts**
- **Templates**: Rental agreements, lease templates
- **Experts**: Real estate attorneys in user's area
- **Examples**: Residential leases, property purchase agreements

#### 💼 **Employment Contracts**
- **Templates**: Employment agreements, contractor agreements
- **Experts**: Employment law specialists
- **Focus**: Compensation, termination, compliance clauses

#### 🤝 **Business Services**
- **Templates**: Service contracts, consulting agreements
- **Experts**: Business law consultants
- **Focus**: Intellectual property, liability, payment terms

#### ⚖️ **Legal Documents**
- **Templates**: NDAs, partnership agreements
- **Experts**: Commercial lawyers, corporate attorneys
- **Focus**: Confidentiality, dispute resolution

### AI Learning System

The platform continuously improves by:
- **Pattern Recognition**: Learning common risk indicators
- **Category Accuracy**: Refining contract classifications
- **Recommendation Success**: Tracking which suggestions help users
- **Expert Matching**: Improving geolocation and specialization matching

### Expert Network Features

- **Geolocation Matching**: Find attorneys near you
- **Specialization Filtering**: Match by contract type
- **Verified Professionals**: Only licensed, rated experts
- **Multi-Language Support**: Experts speaking various languages
- **Rating System**: User reviews and ratings

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

## ✅ Recent Updates (MVP v1.0)

- ✅ **Resources Page**: Free contract templates for popular agreements
- ✅ **Modern UI Redesign**: Clean, gradient-based design with improved UX
- ✅ **Navigation System**: Easy switching between analysis and resources
- ✅ **Enhanced Upload Component**: More visually appealing file upload interface

## 🎯 Future Enhancements

- User authentication and account management
- Contract comparison feature
- Export analysis reports as PDF
- Integration with legal research databases
- Multi-language support
- Advanced risk scoring algorithms
- Template customization tools
- Contract version tracking

---

**Built with ❤️ for making contract analysis accessible to everyone**
