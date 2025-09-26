'use client';

import { useState } from 'react';
import { DocumentIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, DocumentTextIcon, ShieldCheckIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
    icon: <HomeIcon className="w-6 h-6" />
  },
  {
    id: 'sublease-agreement',
    title: 'Sublease Agreement',
    description: 'Template for subleasing a rental property to another tenant. Perfect for short-term rentals or room sharing arrangements.',
    category: 'Housing',
    popular: true,
    downloadUrl: '/api/templates/sublease-agreement',
    icon: <DocumentTextIcon className="w-6 h-6" />
  },
  {
    id: 'media-release',
    title: 'Photo/Video Release Form',
    description: 'Media release waiver for photography, videography, or content creation. Protects creators and allows commercial use of images.',
    category: 'Media',
    popular: true,
    downloadUrl: '/api/templates/media-release',
    icon: <ShieldCheckIcon className="w-6 h-6" />
  },
  {
    id: 'general-services-contract',
    title: 'General Services Contract',
    description: 'Versatile template for service providers including photography, consulting, cleaning, and other professional services.',
    category: 'Business',
    popular: true,
    downloadUrl: '/api/templates/general-services-contract',
    icon: <DocumentIcon className="w-6 h-6" />
  },
  {
    id: 'independent-contractor',
    title: 'Independent Contractor Agreement',
    description: 'Comprehensive agreement for hiring freelancers or independent contractors. Includes payment terms, intellectual property, and liability clauses.',
    category: 'Business',
    popular: true,
    downloadUrl: '/api/templates/independent-contractor',
    icon: <DocumentTextIcon className="w-6 h-6" />
  },
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement',
    description: 'Standard NDA template to protect confidential information, trade secrets, and proprietary business data.',
    category: 'Legal',
    popular: true,
    downloadUrl: '/api/templates/nda',
    icon: <ShieldCheckIcon className="w-6 h-6" />
  },
  {
    id: 'partnership-agreement',
    title: 'Business Partnership Agreement',
    description: 'Template for forming business partnerships. Covers profit sharing, decision making, and dissolution procedures.',
    category: 'Business',
    popular: false,
    downloadUrl: '/api/templates/partnership-agreement',
    icon: <DocumentIcon className="w-6 h-6" />
  },
  {
    id: 'employment-contract',
    title: 'Employment Agreement',
    description: 'Professional employment contract template with terms for compensation, benefits, termination, and company policies.',
    category: 'Employment',
    popular: false,
    downloadUrl: '/api/templates/employment-contract',
    icon: <DocumentTextIcon className="w-6 h-6" />
  },
  {
    id: 'consulting-agreement',
    title: 'Consulting Services Agreement',
    description: 'Specialized contract for consulting engagements, including deliverables, timelines, and intellectual property rights.',
    category: 'Business',
    popular: false,
    downloadUrl: '/api/templates/consulting-agreement',
    icon: <DocumentIcon className="w-6 h-6" />
  },
  {
    id: 'goods-sales-contract',
    title: 'Goods Sales Contract',
    description: 'Template for buying and selling goods or products. Includes payment terms, delivery, warranties, and dispute resolution.',
    category: 'Sales',
    popular: false,
    downloadUrl: '/api/templates/goods-sales-contract',
    icon: <DocumentIcon className="w-6 h-6" />
  }
];

const categories = ['All', 'Housing', 'Business', 'Legal', 'Media', 'Employment', 'Sales'];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (template: ContractTemplate) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = template.downloadUrl;
    link.download = template.downloadUrl.split('/').pop() || `${template.id}.docx`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <DocumentIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contract Checked
              </h1>
            </Link>
            <nav className="flex space-x-8">
              <Link
                href="/"
                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/resources"
                className="text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
              >
                Resources
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent mb-6">
              Free Contract Templates
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Download professionally crafted, fully editable contract templates for common legal agreements.
              All templates are complete documents ready for customization and use.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
              <ShieldCheckIcon className="w-5 h-5 text-green-500" />
              <span>Legally reviewed templates</span>
              <span className="text-slate-300">•</span>
              <span>Free downloads</span>
              <span className="text-slate-300">•</span>
              <span>Word format (.docx)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-8">
          {/* Search Bar */}
          <div className="relative mb-8">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-gradient-to-br from-white to-slate-50/50 rounded-xl border border-slate-200/50 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-200 transition-colors">
                    {template.icon}
                  </div>
                  {template.popular && (
                    <span className="px-2 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-semibold rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">
                  {template.title}
                </h3>

                <p className="text-slate-600 mb-4 leading-relaxed">
                  {template.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {template.category}
                  </span>
                  <button
                    onClick={() => handleDownload(template)}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <DocumentIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No templates found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <ShieldCheckIcon className="w-6 h-6 text-amber-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Legal Disclaimer</h3>
              <p className="text-amber-700 leading-relaxed">
                These templates are provided for informational purposes only and do not constitute legal advice.
                Laws vary by jurisdiction, and these templates may not be appropriate for your specific situation.
                <strong> Always consult with a qualified attorney</strong> before using any contract template.
                Contract Checked is not a law firm and does not provide legal services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <DocumentIcon className="h-8 w-8 text-indigo-400" />
              <h3 className="text-2xl font-bold">Contract Checked</h3>
            </div>
            <p className="text-slate-400 mb-8">
              Making contract analysis accessible to everyone. Free templates and AI-powered insights.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/resources" className="text-indigo-400 hover:text-white transition-colors">
                Resources
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
              <p>&copy; 2024 Contract Checked. Not legal advice.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

