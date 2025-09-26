'use client';

import { useState, useEffect } from 'react';
import {
  UserGroupIcon,
  DocumentIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  StarIcon,
  MapPinIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { supabase, ExpertPartner, ResourceRecommendation } from '@/lib/supabase';

interface ResourceRecommendationItem {
  type: 'template' | 'expert' | 'guide' | 'service';
  title: string;
  description: string;
  priority: number;
  reason: string;
}

interface ResourceRecommendationsProps {
  aiRecommendations: ResourceRecommendationItem[];
  contractCategories: Array<{ name: string; confidence: number }>;
}

interface EnrichedRecommendation extends ResourceRecommendationItem {
  databaseResources?: ResourceRecommendation[];
  experts?: ExpertPartner[];
}

export function ResourceRecommendations({
  aiRecommendations,
  contractCategories
}: ResourceRecommendationsProps) {
  const [enrichedRecommendations, setEnrichedRecommendations] = useState<EnrichedRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdditionalResources() {
      try {
        setLoading(true);

        // Skip database queries if supabase is not available
        if (!supabase) {
          setEnrichedRecommendations(aiRecommendations.map(rec => ({ ...rec })));
          setLoading(false);
          return;
        }

        // Get category IDs for database queries
        const categoryNames = contractCategories.map(cat => cat.name);
        const { data: categories } = await supabase!
          .from('contract_categories')
          .select('id, name')
          .in('name', categoryNames);

        if (!categories) return;

        // Fetch database recommendations and experts for each category
        const enriched = await Promise.all(
          aiRecommendations.map(async (rec) => {
            const enrichedRec: EnrichedRecommendation = { ...rec };

            if (rec.type === 'expert' || rec.type === 'template') {
              // Find matching categories
              const matchingCategories = categories.filter(cat =>
                categoryNames.some(name =>
                  name.toLowerCase().includes(cat.name.toLowerCase()) ||
                  cat.name.toLowerCase().includes(name.toLowerCase())
                )
              );

              if (matchingCategories.length > 0) {
                // Fetch database recommendations
                const { data: dbRecommendations } = await supabase!
                  .from('resource_recommendations')
                  .select('*')
                  .in('category_id', matchingCategories.map(c => c.id))
                  .eq('resource_type', rec.type)
                  .eq('is_active', true)
                  .order('priority', { ascending: false })
                  .limit(3);

                enrichedRec.databaseResources = dbRecommendations || [];

                // Fetch experts if this is an expert recommendation
                if (rec.type === 'expert') {
                  const { data: experts } = await supabase!
                    .from('expert_partners')
                    .select(`
                      *,
                      expert_specializations!inner(category_id)
                    `)
                    .in('expert_specializations.category_id', matchingCategories.map(c => c.id))
                    .eq('is_verified', true)
                    .eq('availability_status', 'available')
                    .order('rating', { ascending: false })
                    .limit(3);

                  enrichedRec.experts = experts || [];
                }
              }
            }

            return enrichedRec;
          })
        );

        setEnrichedRecommendations(enriched);
      } catch (error) {
        console.error('Error fetching additional resources:', error);
        // Fall back to AI recommendations only
        setEnrichedRecommendations(aiRecommendations.map(rec => ({ ...rec })));
      } finally {
        setLoading(false);
      }
    }

    if (aiRecommendations.length > 0) {
      fetchAdditionalResources();
    } else {
      setLoading(false);
    }
  }, [aiRecommendations, contractCategories]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'expert':
        return <UserGroupIcon className="w-6 h-6" />;
      case 'template':
        return <DocumentIcon className="w-6 h-6" />;
      case 'guide':
        return <BookOpenIcon className="w-6 h-6" />;
      case 'service':
        return <WrenchScrewdriverIcon className="w-6 h-6" />;
      default:
        return <DocumentIcon className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'expert':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'template':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'guide':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'service':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadge = (priority: number) => {
    if (priority >= 4) return 'bg-red-100 text-red-800';
    if (priority >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <WrenchScrewdriverIcon className="w-6 h-6 text-indigo-600" />
        <h3 className="text-2xl font-bold text-gray-900">Recommended Next Steps</h3>
      </div>

      <div className="space-y-6">
        {enrichedRecommendations
          .sort((a, b) => b.priority - a.priority)
          .map((recommendation, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${getTypeColor(recommendation.type)}`}>
                  {getTypeIcon(recommendation.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {recommendation.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityBadge(recommendation.priority)}`}>
                      Priority {recommendation.priority}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{recommendation.description}</p>
                  <p className="text-sm text-indigo-600 bg-indigo-50 px-3 py-2 rounded">
                    <strong>Why this helps:</strong> {recommendation.reason}
                  </p>
                </div>
              </div>
            </div>

            {/* Database Resources */}
            {recommendation.databaseResources && recommendation.databaseResources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h5 className="text-sm font-semibold text-gray-800 mb-3">Available Resources:</h5>
                <div className="space-y-2">
                  {recommendation.databaseResources.map((resource, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                      <span className="text-sm text-gray-700">{resource.title}</span>
                      <span className="text-xs text-gray-500">Priority {resource.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expert Partners */}
            {recommendation.experts && recommendation.experts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h5 className="text-sm font-semibold text-gray-800 mb-3">Recommended Experts:</h5>
                <div className="space-y-3">
                  {recommendation.experts.map((expert, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h6 className="font-semibold text-gray-900">{expert.name}</h6>
                            <span className="text-sm text-gray-600">{expert.title}</span>
                            {expert.is_verified && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{expert.bio}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            {expert.location_city && (
                              <div className="flex items-center space-x-1">
                                <MapPinIcon className="w-3 h-3" />
                                <span>{expert.location_city}, {expert.location_state}</span>
                              </div>
                            )}
                            {expert.hourly_rate && (
                              <div className="flex items-center space-x-1">
                                <CurrencyDollarIcon className="w-3 h-3" />
                                <span>${expert.hourly_rate}/hr</span>
                              </div>
                            )}
                            {expert.rating && (
                              <div className="flex items-center space-x-1">
                                <StarIcon className="w-3 h-3 text-yellow-400" />
                                <span>{expert.rating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {enrichedRecommendations.length === 0 && (
        <div className="text-center py-8">
          <WrenchScrewdriverIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No specific recommendations available for this contract type.</p>
        </div>
      )}

      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
        <div className="flex items-start space-x-3">
          <BookOpenIcon className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-indigo-900 mb-1">Learn More</h4>
            <p className="text-sm text-indigo-700">
              These recommendations are tailored to your contract type and risk level.
              Higher priority items are recommended for immediate attention, especially for high-risk contracts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
