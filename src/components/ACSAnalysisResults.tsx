'use client';

import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon, TagIcon, ScaleIcon, CurrencyDollarIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { type ACSAnalysisResult } from '@/lib/acs-ai-service';

interface ACSAnalysisResultsProps {
  result: ACSAnalysisResult;
}

export function ACSAnalysisResults({ result }: ACSAnalysisResultsProps) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-700 bg-red-100 border-red-200';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-green-700 bg-green-100 border-green-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'negotiation':
        return <ScaleIcon className="w-5 h-5" />;
      case 'insurance':
        return <ShieldCheckIcon className="w-5 h-5" />;
      case 'operational':
        return <CogIcon className="w-5 h-5" />;
      case 'legal':
        return <TagIcon className="w-5 h-5" />;
      default:
        return <InformationCircleIcon className="w-5 h-5" />;
    }
  };

  const getAlignmentBadge = () => {
    const { alignment } = result.comparison;
    const colors = {
      high: 'text-green-700 bg-green-100 border-green-200',
      medium: 'text-yellow-700 bg-yellow-100 border-yellow-200',
      low: 'text-red-700 bg-red-100 border-red-200'
    };
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors[alignment as keyof typeof colors] || colors.medium}`}>
        {getRiskIcon(alignment)}
        <span className="ml-1 capitalize">{alignment} Alignment</span>
      </div>
    );
  };

  const getContractStrengthBadge = (strength: string) => {
    const colors = {
      strong: 'text-green-700 bg-green-100',
      balanced: 'text-blue-700 bg-blue-100',
      weak: 'text-red-700 bg-red-100'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${colors[strength as keyof typeof colors] || colors.balanced}`}>
        {strength}
      </span>
    );
  };

  const getOverallBadge = () => {
    const { overall } = result.contractStrength;
    const labels = {
      favorable_operator: 'Operator Advantage',
      balanced: 'Balanced',
      favorable_acs: 'ACS Advantage'
    };
    const colors = {
      favorable_operator: 'text-red-700 bg-red-100 border-red-200',
      balanced: 'text-blue-700 bg-blue-100 border-blue-200',
      favorable_acs: 'text-green-700 bg-green-100 border-green-200'
    };
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors[overall as keyof typeof colors] || colors.balanced}`}>
        <ScaleIcon className="w-4 h-4 mr-1" />
        <span>{labels[overall as keyof typeof labels] || labels.balanced}</span>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Overall Assessment */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">ACS Risk Assessment</h3>
          <div className="flex items-center space-x-3">
            {getAlignmentBadge()}
            {getOverallBadge()}
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">{result.summary}</p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-800 font-medium">Contract Strength Analysis</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-blue-700">
                <div>
                  <span className="font-medium">Operator Contract:</span>
                  {getContractStrengthBadge(result.contractStrength.operatorContract)}
                </div>
                <div>
                  <span className="font-medium">ACS Booking:</span>
                  {getContractStrengthBadge(result.contractStrength.acsBooking)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Contract Differences</h3>

        <div className="space-y-6">
          {result.comparison.keyDifferences.map((difference, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{difference.category}</h4>
                <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getRiskColor(difference.risk)}`}>
                  {getRiskIcon(difference.risk)}
                  <span className="ml-1 capitalize">{difference.risk}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h5 className="font-medium text-red-800 mb-2">Operator Contract Terms</h5>
                  <p className="text-red-700 text-sm">{difference.operatorTerms}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">ACS Booking Terms</h5>
                  <p className="text-blue-700 text-sm">{difference.acsTerms}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">ACS Impact Assessment</h5>
                <p className="text-gray-700 text-sm">{difference.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancellation Risks */}
      {result.acsRiskAssessment.cancellationRisks.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <XCircleIcon className="w-6 h-6 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-900">Cancellation Risk Analysis</h3>
          </div>

          <div className="space-y-6">
            {result.acsRiskAssessment.cancellationRisks.map((risk, index) => (
              <div key={index} className="border border-red-200 rounded-lg p-6 bg-red-50/30">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-red-900">{risk.title}</h4>
                  <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getRiskColor(risk.severity)}`}>
                    {getRiskIcon(risk.severity)}
                    <span className="ml-1 capitalize">{risk.severity}</span>
                  </div>
                </div>

                <p className="text-red-800 mb-4">{risk.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-800 text-sm mb-1">Operator Contract</h5>
                    <p className="text-gray-700 text-xs">{risk.operatorContractReference}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-800 text-sm mb-1">ACS Booking</h5>
                    <p className="text-gray-700 text-xs">{risk.acsBookingReference}</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Recommendation</h5>
                  <p className="text-green-700 text-sm">{risk.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Financial Exposure */}
      {result.acsRiskAssessment.financialExposure.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <CurrencyDollarIcon className="w-6 h-6 text-yellow-600" />
            <h3 className="text-2xl font-bold text-gray-900">Financial Exposure Analysis</h3>
          </div>

          <div className="space-y-6">
            {result.acsRiskAssessment.financialExposure.map((exposure, index) => (
              <div key={index} className="border border-yellow-200 rounded-lg p-6 bg-yellow-50/30">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-yellow-900">{exposure.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-700 font-medium">{exposure.potentialLoss}</span>
                    <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getRiskColor(exposure.risk)}`}>
                      {getRiskIcon(exposure.risk)}
                      <span className="ml-1 capitalize">{exposure.risk}</span>
                    </div>
                  </div>
                </div>

                <p className="text-yellow-800 mb-4">{exposure.description}</p>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Mitigation Strategy</h5>
                  <p className="text-green-700 text-sm">{exposure.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Operational Risks */}
      {result.acsRiskAssessment.operationalRisks.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <CogIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Operational Risk Analysis</h3>
          </div>

          <div className="space-y-6">
            {result.acsRiskAssessment.operationalRisks.map((risk, index) => (
              <div key={index} className="border border-blue-200 rounded-lg p-6 bg-blue-50/30">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-blue-900">{risk.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-700 text-sm">Likelihood: {risk.likelihood}</span>
                  </div>
                </div>

                <p className="text-blue-800 mb-4">{risk.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-medium text-gray-800 mb-2">Impact</h5>
                    <p className="text-gray-700 text-sm">{risk.impact}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-800 mb-2">Recommendation</h5>
                    <p className="text-green-700 text-sm">{risk.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Strategic Recommendations</h3>

        <div className="space-y-6">
          {result.recommendations.map((recommendation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(recommendation.category)}
                  <h4 className="text-lg font-semibold text-gray-900">{recommendation.title}</h4>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                  {recommendation.priority} priority
                </div>
              </div>

              <p className="text-gray-700 mb-4">{recommendation.description}</p>

              {recommendation.actionItems.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-3">Action Items:</h5>
                  <ul className="space-y-2">
                    {recommendation.actionItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <InformationCircleIcon className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Next Steps for ACS</h3>
        </div>

        <div className="space-y-3 text-blue-800">
          <p>• Review high-priority recommendations with your legal team immediately</p>
          <p>• Consider renegotiating operator contracts where ACS has weak protections</p>
          <p>• Evaluate insurance coverage for identified financial exposures</p>
          <p>• Update internal booking forms to address identified gaps</p>
          <p>• Document this analysis for your compliance and risk management records</p>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-200">
          <p className="text-sm text-blue-600">
            <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and does not constitute legal advice.
            Always consult with qualified aviation legal professionals for contract review and risk assessment.
          </p>
        </div>
      </div>
    </div>
  );
}

