import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ACSAnalysisResult {
  summary: string;
  comparison: {
    alignment: 'high' | 'medium' | 'low';
    overallAssessment: string;
    keyDifferences: Array<{
      category: string;
      operatorTerms: string;
      acsTerms: string;
      risk: 'high' | 'medium' | 'low';
      impact: string;
    }>;
  };
  acsRiskAssessment: {
    cancellationRisks: Array<{
      title: string;
      description: string;
      severity: 'high' | 'medium' | 'low';
      operatorContractReference: string;
      acsBookingReference: string;
      recommendation: string;
    }>;
    financialExposure: Array<{
      title: string;
      description: string;
      potentialLoss: string;
      risk: 'high' | 'medium' | 'low';
      mitigation: string;
    }>;
    operationalRisks: Array<{
      title: string;
      description: string;
      impact: string;
      likelihood: 'high' | 'medium' | 'low';
      recommendation: string;
    }>;
  };
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    category: 'negotiation' | 'insurance' | 'operational' | 'legal';
    title: string;
    description: string;
    actionItems: string[];
  }>;
  contractStrength: {
    operatorContract: 'strong' | 'balanced' | 'weak';
    acsBooking: 'strong' | 'balanced' | 'weak';
    overall: 'favorable_operator' | 'balanced' | 'favorable_acs';
  };
}

export async function compareACSContracts(
  operatorContractText: string,
  bookingFormText: string,
  operatorFileName: string,
  bookingFileName: string
): Promise<ACSAnalysisResult> {
  try {
    const prompt = `
You are an aviation industry contract analysis expert specializing in air charter services (ACS) risk assessment. ACS is the broker/charter company that sells seats to clients, and the operator provides the aircraft.

OPERATOR CONTRACT FILE: ${operatorFileName}
${operatorContractText}

ACS BOOKING FORM FILE: ${bookingFileName}
${bookingFormText}

CRITICAL BUSINESS CONTEXT:
- ACS sells charter flights to clients and books them with aircraft operators
- ACS wants STRICT cancellation terms that protect them from client cancellations
- ACS wants terms that are EQUAL TO OR MORE FAVORABLE than the operator's terms
- Loose/flexible cancellation terms are BAD for ACS (they lose money if clients cancel)
- Strict cancellation terms are GOOD for ACS (they can cancel bookings without penalty)
- ACS should have cancellation policies that are at least as strict as the operator's

KEY CHECKLIST ITEMS TO ANALYZE:
1. Date matches between contracts
2. Operator name is properly mentioned on ACS booking form
3. Aircraft type/model is specified and matches
4. Number of seats is mentioned and passenger limits are within operator's capacity
5. Cancellation terms - ACS should have policies at least as strict as operator (or stricter)
6. For one-way trips: ACS should use 100% cancellation policy (not standard rates)
7. Payment terms and deposits
8. Liability and insurance requirements

RISK ASSESSMENT PRINCIPLES:
- HIGH RISK: ACS has LOOSER/more flexible cancellation terms than operator (ACS loses money)
- MEDIUM RISK: Missing key details (dates, aircraft, seats) that could cause operational issues
- LOW RISK: Minor discrepancies or standard industry terms
- STRENGTH: "Strong" ACS terms = strict cancellation policies, clear terms, full operator details
- STRENGTH: "Weak" ACS terms = flexible cancellation, missing details, vague commitments

Provide your analysis in the following JSON format:
{
  "summary": "2-3 sentence summary of the contract comparison and ACS protection level",
  "comparison": {
    "alignment": "high|medium|low (how well ACS terms protect the business)",
    "overallAssessment": "Brief assessment of how well ACS is protected",
    "keyDifferences": [
      {
        "category": "Category name (e.g., Cancellation Terms, Aircraft Details, Dates)",
        "operatorTerms": "What the operator contract specifies",
        "acsTerms": "What the ACS booking form specifies",
        "risk": "high|medium|low",
        "impact": "Description of potential impact on ACS business"
      }
    ]
  },
  "acsRiskAssessment": {
    "cancellationRisks": [
      {
        "title": "Risk title",
        "description": "Detailed description of the cancellation risk",
        "severity": "high|medium|low",
        "operatorContractReference": "Specific reference to operator terms",
        "acsBookingReference": "Specific reference to ACS booking terms",
        "recommendation": "Specific recommendation to mitigate this risk"
      }
    ],
    "financialExposure": [
      {
        "title": "Exposure title",
        "description": "Description of financial exposure",
        "potentialLoss": "Estimate of potential financial impact",
        "risk": "high|medium|low",
        "mitigation": "How to mitigate this exposure"
      }
    ],
    "operationalRisks": [
      {
        "title": "Operational risk title",
        "description": "Description of operational risk",
        "impact": "Impact on ACS operations",
        "likelihood": "high|medium|low",
        "recommendation": "Recommendation to address this risk"
      }
    ]
  },
  "recommendations": [
    {
      "priority": "high|medium|low",
      "category": "negotiation|insurance|operational|legal",
      "title": "Recommendation title",
      "description": "Detailed description",
      "actionItems": ["Specific action item 1", "Specific action item 2"]
    }
  ],
  "contractStrength": {
    "operatorContract": "strong|balanced|weak (operator's terms from ACS perspective)",
    "acsBooking": "strong|balanced|weak (ACS protection level)",
    "overall": "favorable_operator|balanced|favorable_acs"
  }
}

ANALYSIS PRIORITIES:
1. Cancellation terms: ACS should be EQUAL TO OR STRICTER than operator
2. Complete details: dates, aircraft, seats, operator name must match
3. One-way trips: Should use 100% cancellation (not standard rates)
4. Clear terms: Avoid vague language that could be misinterpreted

Return only valid JSON, no additional text or formatting.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an aviation contract analysis expert. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 2500
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
    const analysisResult = JSON.parse(cleanResponse) as ACSAnalysisResult;

    // Validate the response structure
    if (!analysisResult.summary ||
        !analysisResult.comparison ||
        !analysisResult.acsRiskAssessment ||
        !analysisResult.recommendations ||
        !analysisResult.contractStrength) {
      throw new Error('Invalid response structure from AI service');
    }

    return analysisResult;

  } catch (error) {
    console.error('Error comparing ACS contracts:', error);

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

    throw new Error('Failed to compare contracts. Please try again.');
  }
}
