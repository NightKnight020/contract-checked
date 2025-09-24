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
}

export async function analyzeContract(text: string, fileName: string): Promise<AnalysisResult> {
  try {
    const prompt = `
You are a legal contract analysis AI. Analyze the following contract text and provide a comprehensive analysis.

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
  "overallRisk": "high|medium|low"
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

    // Parse the JSON response
    const analysisResult = JSON.parse(response.trim()) as AnalysisResult;

    // Validate the response structure
    if (!analysisResult.summary || !Array.isArray(analysisResult.keyClauses) || !Array.isArray(analysisResult.recommendations)) {
      throw new Error('Invalid response structure from AI service');
    }

    return analysisResult;

  } catch (error) {
    console.error('Error analyzing contract:', error);
    throw new Error('Failed to analyze contract. Please try again.');
  }
}

// Note: File processing is now handled server-side in the API route
