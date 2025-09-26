import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AnalysisResult {
  summary: string;
  keyClauses: Array<{
    title: string;
    description: string;
    risk: 'high' | 'medium' | 'low';
    type: 'advantage' | 'disadvantage' | 'neutral';
  }>;
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
  learningInsights?: {
    patterns: Record<string, unknown>;
    confidence: number;
  };
}

export async function analyzeContract(text: string, fileName: string): Promise<AnalysisResult> {
  try {
    const prompt = `
You are an advanced legal contract analysis AI with the ability to classify contracts and recommend resources. Analyze the following contract text and provide a comprehensive analysis including categorization and resource recommendations.

CONTRACT FILE: ${fileName}

CONTRACT TEXT:
${text}

Please provide your analysis in the following JSON format:
{
  "summary": "A brief 2-3 sentence summary of the contract and its main purpose",
  "keyClauses": [
    {
      "title": "Clause Title",
      "description": "Brief description of what this clause does",
      "risk": "high|medium|low",
      "type": "advantage|disadvantage|neutral"
    }
  ],
  "recommendations": [
    "Specific recommendation 1",
    "Specific recommendation 2"
  ],
  "overallRisk": "high|medium|low",
  "categories": [
    {
      "name": "Category Name (e.g., Real Estate, Employment, Business Services, Legal, etc.)",
      "confidence": 0.95
    }
  ],
  "resourceRecommendations": [
    {
      "type": "template|expert|guide|service",
      "title": "Resource Title",
      "description": "Brief description of the resource",
      "priority": 1-5,
      "reason": "Why this resource is recommended based on the contract analysis"
    }
  ],
  "learningInsights": {
    "patterns": {
      "risk_indicators": ["list of patterns that indicate risk"],
      "common_clauses": ["frequently found clause types"],
      "industry_context": "inferred industry or context"
    },
    "confidence": 0.85
  }
}

Guidelines for analysis:
- Focus on clauses that have significant legal or financial impact
- Identify potential advantages/disadvantages for the party uploading the contract
- Consider liability, termination, payment terms, intellectual property, etc.
- Risk levels: high = serious legal/financial exposure, medium = notable but manageable, low = standard/minimal concern
- Type: advantage = favorable to uploader, disadvantage = unfavorable to uploader, neutral = balanced/standard
- Provide 3-8 key clauses maximum
- Be specific and actionable in recommendations
- Overall risk should reflect the contract's potential impact on the uploader

Contract Categories (classify into 1-3 most relevant):
- Real Estate (leases, rentals, mortgages, property)
- Employment (job contracts, employment agreements, HR documents)
- Business Services (consulting, contractor, professional services)
- Legal (NDAs, partnerships, corporate agreements)
- Sales & Commerce (purchase agreements, vendor contracts)
- Media & Content (releases, IP agreements, content creation)
- Financial (loans, investments, banking documents)

Resource Recommendations Guidelines:
- Templates: Contract templates for similar agreements
- Experts: Legal specialists or consultants who could help
- Guides: Educational resources or checklists
- Services: Professional services or tools
- Priority 5 = highest priority (essential), 1 = lowest priority (optional)
- Base recommendations on contract type, risk level, and complexity
- Always recommend expert consultation for high-risk contracts
- Suggest relevant templates for medium-risk contracts
- Include educational resources for learning purposes

Learning Insights:
- Extract patterns that could help improve future analyses
- Identify risk indicators and common clause patterns
- Note industry context for better categorization

Return only valid JSON, no additional text or formatting.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a legal contract analysis expert. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 2000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from AI service');
    }

    // Clean the response (remove markdown formatting if present)
    let cleanResponse = response.trim();
    if (cleanResponse.startsWith('```json')) {
      cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanResponse.startsWith('```')) {
      cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Parse the JSON response
    const analysisResult = JSON.parse(cleanResponse) as AnalysisResult;

    // Validate the response structure
    if (!analysisResult.summary ||
        !Array.isArray(analysisResult.keyClauses) ||
        !Array.isArray(analysisResult.recommendations) ||
        !Array.isArray(analysisResult.categories) ||
        !Array.isArray(analysisResult.resourceRecommendations)) {
      throw new Error('Invalid response structure from AI service');
    }

    // Ensure categories have valid structure
    analysisResult.categories = analysisResult.categories.filter(cat =>
      cat.name && typeof cat.confidence === 'number' && cat.confidence >= 0 && cat.confidence <= 1
    );

    // Ensure resource recommendations have valid structure
    analysisResult.resourceRecommendations = analysisResult.resourceRecommendations.filter(rec =>
      ['template', 'expert', 'guide', 'service'].includes(rec.type) &&
      rec.title && rec.description && rec.reason &&
      typeof rec.priority === 'number' && rec.priority >= 1 && rec.priority <= 5
    );

    return analysisResult;

  } catch (error) {
    console.error('Error analyzing contract:', error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('rate limit') || error.message.includes('429')) {
        throw new Error('OpenAI rate limit exceeded. Service is busy, please try again in a few minutes.');
      } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
        throw new Error('OpenAI API key is invalid or expired.');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error('Network error connecting to AI service. Please try again.');
      } else if (error.message.includes('timeout')) {
        throw new Error('AI service request timed out. Please try again.');
      } else {
        throw new Error(`OpenAI API Error: ${error.message}`);
      }
    }

    throw new Error('Failed to analyze contract. Please try again.');
  }
}

// Note: File processing is now handled server-side in the API route
