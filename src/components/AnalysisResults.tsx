'use client';

import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon, TagIcon } from '@heroicons/react/24/outline';
import { ResourceRecommendations } from './ResourceRecommendations';

interface KeyClause {
  title: string;
  description: string;
  risk: 'high' | 'medium' | 'low';
  type: 'advantage' | 'disadvantage' | 'neutral';
}

interface AnalysisResult {
  summary: string;
  keyClauses: KeyClause[];
  recommendations: string[];
  overallRisk: 'high' | 'medium' | 'low';
  categories: Array<{
    name: string;
    confidence: number;
  }>;
  resourceRecommendations: Array<{
    type: 'template' | 'expert' | 'guide' | 'service';
    title: string;
    description: string;
    priority: number;
    reason: string;
  }>;
}

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <XCircleIcon className="w-5 h-5" />;
      case 'medium':
        return <ExclamationTriangleIcon className="w-5 h-5" />;
      case 'low':
        return <CheckCircleIcon className="w-5 h-5" />;
      default:
        return <InformationCircleIcon className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'advantage':
        return 'text-green-700 bg-green-100';
      case 'disadvantage':
        return 'text-red-700 bg-red-100';
      case 'neutral':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getOverallRiskBadge = () => {
    const { overallRisk } = result;
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(overallRisk)}`}>
        {getRiskIcon(overallRisk)}
        <span className="ml-1 capitalize">{overallRisk} Risk</span>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Overall Assessment */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Contract Analysis</h3>
          {getOverallRiskBadge()}
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">{result.summary}</p>
        </div>
      </div>

      {/* Key Clauses */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Clauses & Analysis</h3>

        <div className="space-y-6">
          {result.keyClauses.map((clause, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-900">{clause.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getTypeColor(clause.type)}`}>
                    {clause.type}
                  </span>
                  <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getRiskColor(clause.risk)}`}>
                    {getRiskIcon(clause.risk)}
                    <span className="ml-1 capitalize">{clause.risk}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{clause.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h3>

        <div className="space-y-4">
          {result.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Categories */}
      {result.categories && result.categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <TagIcon className="w-6 h-6 text-indigo-600" />
            <h3 className="text-2xl font-bold text-gray-900">Contract Classification</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {result.categories.map((category, index) => (
              <div
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium"
              >
                <TagIcon className="w-4 h-4 mr-2" />
                {category.name}
                <span className="ml-2 text-xs bg-indigo-200 px-2 py-0.5 rounded">
                  {(category.confidence * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-600">
            This contract has been classified into the above categories to help provide more relevant recommendations and resources.
          </p>
        </div>
      )}

      {/* Resource Recommendations */}
      {result.resourceRecommendations && result.resourceRecommendations.length > 0 && (
        <ResourceRecommendations
          aiRecommendations={result.resourceRecommendations}
          contractCategories={result.categories || []}
        />
      )}

      {/* Action Items */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 border border-indigo-200">
        <div className="flex items-center space-x-3 mb-4">
          <InformationCircleIcon className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold text-indigo-900">Next Steps</h3>
        </div>

        <div className="space-y-3 text-indigo-800">
          <p>• Review the highlighted clauses with your legal counsel</p>
          <p>• Consider negotiating terms that are marked as high risk or disadvantageous</p>
          <p>• Ensure you understand all obligations and rights outlined in the contract</p>
          <p>• Keep this analysis for your records and reference during contract execution</p>
        </div>

        <div className="mt-6 pt-6 border-t border-indigo-200">
          <p className="text-sm text-indigo-600">
            <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and does not constitute legal advice.
            Always consult with qualified legal professionals for contract review and advice.
          </p>
        </div>
      </div>
    </div>
  );
}
