'use client';

import { useState } from 'react';
import { FileText, Download, Search, ShieldCheck, Home, Briefcase, Lock, Film } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

interface ContractTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  popular: boolean;
  downloadUrl: string;
  icon: React.ReactNode;
}

const templates: ContractTemplate[] = [
  {
    id: 'residential-rental-agreement',
    title: 'Residential Rental Agreement',
    description: 'Standard lease agreement for residential properties. Includes rent terms, security deposit, maintenance responsibilities, and tenant rights.',
    category: 'Housing',
    popular: true,
    downloadUrl: '/api/templates/residential-rental-agreement',
    icon: <Home className="w-6 h-6" />,
  },
  {
    id: 'sublease-agreement',
    title: 'Sublease Agreement',
    description: 'Template for subleasing a rental property to another tenant. Perfect for short-term rentals or room sharing arrangements.',
    category: 'Housing',
    popular: true,
    downloadUrl: '/api/templates/sublease-agreement',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 'media-release',
    title: 'Photo/Video Release Form',
    description: 'Media release waiver for photography, videography, or content creation. Protects creators and allows commercial use of images.',
    category: 'Media',
    popular: true,
    downloadUrl: '/api/templates/media-release',
    icon: <Film className="w-6 h-6" />,
  },
  {
    id: 'general-services-contract',
    title: 'General Services Contract',
    description: 'Versatile template for service providers including photography, consulting, cleaning, and other professional services.',
    category: 'Business',
    popular: true,
    downloadUrl: '/api/templates/general-services-contract',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 'independent-contractor',
    title: 'Independent Contractor Agreement',
    description: 'Comprehensive agreement for hiring freelancers or independent contractors. Includes payment terms, intellectual property, and liability clauses.',
    category: 'Business',
    popular: true,
    downloadUrl: '/api/templates/independent-contractor',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement',
    description: 'Standard NDA template to protect confidential information, trade secrets, and proprietary business data.',
    category: 'Legal',
    popular: true,
    downloadUrl: '/api/templates/nda',
    icon: <Lock className="w-6 h-6" />,
  },
  {
    id: 'partnership-agreement',
    title: 'Business Partnership Agreement',
    description: 'Template for forming business partnerships. Covers profit sharing, decision making, and dissolution procedures.',
    category: 'Business',
    popular: false,
    downloadUrl: '/api/templates/partnership-agreement',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 'employment-contract',
    title: 'Employment Agreement',
    description: 'Professional employment contract template with terms for compensation, benefits, termination, and company policies.',
    category: 'Employment',
    popular: false,
    downloadUrl: '/api/templates/employment-contract',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: 'consulting-agreement',
    title: 'Consulting Services Agreement',
    description: 'Specialized contract for consulting engagements, including deliverables, timelines, and intellectual property rights.',
    category: 'Business',
    popular: false,
    downloadUrl: '/api/templates/consulting-agreement',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 'goods-sales-contract',
    title: 'Goods Sales Contract',
    description: 'Template for buying and selling goods or products. Includes payment terms, delivery, warranties, and dispute resolution.',
    category: 'Sales',
    popular: false,
    downloadUrl: '/api/templates/goods-sales-contract',
    icon: <FileText className="w-6 h-6" />,
  },
];

const categories = ['All', 'Housing', 'Business', 'Legal', 'Media', 'Employment', 'Sales'];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (template: ContractTemplate) => {
    const link = document.createElement('a');
    link.href = template.downloadUrl;
    link.download = template.downloadUrl.split('/').pop() || `${template.id}.docx`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#1C2333] text-white pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Free Contract Templates
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            Download professionally crafted, fully editable contract templates for common legal agreements.
            All templates are complete documents ready for customization.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-400 flex-wrap">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Legally reviewed</span>
            <span>·</span>
            <span>Free downloads</span>
            <span>·</span>
            <span>Word format (.docx)</span>
          </div>
        </div>
      </section>

      {/* Search + Filter + Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/40 focus:border-[#2D6A4F] text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#2D6A4F] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Templates grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2D6A4F] group-hover:bg-emerald-100 transition-colors">
                    {template.icon}
                  </div>
                  {template.popular && (
                    <span className="px-2.5 py-1 bg-[#B7922A] text-white text-xs font-semibold rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{template.title}</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {template.category}
                  </span>
                  <button
                    onClick={() => handleDownload(template)}
                    className="flex items-center gap-1.5 bg-[#2D6A4F] hover:bg-[#40916C] text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-600 mb-1">No templates found</h3>
              <p className="text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-1">Legal Disclaimer</h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              These templates are provided for informational purposes only and do not constitute legal advice.
              Laws vary by jurisdiction, and these templates may not be appropriate for your specific situation.
              <strong> Always consult with a qualified attorney</strong> before using any contract template.
              Contract Checked is not a law firm and does not provide legal services.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
