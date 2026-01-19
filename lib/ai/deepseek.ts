import { z } from 'zod'

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com'
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY

if (!DEEPSEEK_API_KEY) {
  console.warn('DEEPSEEK_API_KEY is not set. AI features will be disabled.')
}

export interface AIConfig {
  model?: string
  temperature?: number
  maxTokens?: number
}

export interface MeetingSummaryRequest {
  transcript: string
  participants: string[]
  meetingTitle: string
  config?: AIConfig
}

export interface MeetingSummaryResponse {
  summary: string
  keyPoints: string[]
  actionItems: Array<{
    title: string
    description: string
    assignee?: string
    dueDate?: string
    priority: 'low' | 'medium' | 'high' | 'critical'
  }>
  tags: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
}

export interface ActionItemExtractionRequest {
  text: string
  participants: string[]
  config?: AIConfig
}

export interface ActionItemExtractionResponse {
  actionItems: Array<{
    title: string
    description: string
    assignee?: string
    dueDate?: string
    priority: 'low' | 'medium' | 'high' | 'critical'
    context: string
  }>
}

export interface TagGenerationRequest {
  text: string
  existingTags?: string[]
  config?: AIConfig
}

export interface TagGenerationResponse {
  tags: Array<{
    name: string
    category: string
    confidence: number
  }>
}

export interface SentimentAnalysisRequest {
  text: string
  config?: AIConfig
}

export interface SentimentAnalysisResponse {
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
  highlights: Array<{
    text: string
    sentiment: 'positive' | 'neutral' | 'negative'
    reason: string
  }>
}

export class DeepSeekAI {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = DEEPSEEK_API_KEY || ''
    this.baseUrl = DEEPSEEK_API_URL
  }

  private async makeRequest(endpoint: string, data: any) {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key is not configured')
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`DeepSeek API error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  async generateMeetingSummary(
    request: MeetingSummaryRequest
  ): Promise<MeetingSummaryResponse> {
    const prompt = `
You are an expert meeting assistant. Analyze the following meeting transcript and generate a comprehensive summary.

Meeting Title: ${request.meetingTitle}
Participants: ${request.participants.join(', ')}

Transcript:
${request.transcript}

Please provide:
1. A concise summary of the meeting (3-5 sentences)
2. 3-5 key points discussed
3. Action items with assignees, due dates, and priorities
4. Relevant tags for categorization
5. Overall sentiment of the meeting

Format your response as JSON with the following structure:
{
  "summary": "string",
  "keyPoints": ["string"],
  "actionItems": [{
    "title": "string",
    "description": "string",
    "assignee": "string (optional)",
    "dueDate": "YYYY-MM-DD (optional)",
    "priority": "low|medium|high|critical"
  }],
  "tags": ["string"],
  "sentiment": "positive|neutral|negative",
  "confidence": number
}
`

    const data = {
      model: request.config?.model || 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are a professional meeting assistant. Generate structured, actionable meeting summaries.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: request.config?.temperature || 0.3,
      max_tokens: request.config?.maxTokens || 2000,
    }

    try {
      const response = await this.makeRequest('/chat/completions', data)
      const content = response.choices[0]?.message?.content
      
      if (!content) {
        throw new Error('No response content from AI')
      }

      // Extract JSON from response
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/{[\s\S]*}/)
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content
      
      const result = JSON.parse(jsonString)
      
      // Validate the response structure
      const schema = z.object({
        summary: z.string(),
        keyPoints: z.array(z.string()),
        actionItems: z.array(z.object({
          title: z.string(),
          description: z.string(),
          assignee: z.string().optional(),
          dueDate: z.string().optional(),
          priority: z.enum(['low', 'medium', 'high', 'critical']),
        })),
        tags: z.array(z.string()),
        sentiment: z.enum(['positive', 'neutral', 'negative']),
        confidence: z.number().min(0).max(1),
      })

      return schema.parse(result)
    } catch (error) {
      console.error('Error generating meeting summary:', error)
      throw new Error(`Failed to generate meeting summary: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async extractActionItems(
    request: ActionItemExtractionRequest
  ): Promise<ActionItemExtractionResponse> {
    const prompt = `
Extract action items from the following text. Identify tasks, responsibilities, and deadlines.

Participants mentioned: ${request.participants.join(', ')}

Text:
${request.text}

Extract all action items with:
1. Clear title
2. Detailed description
3. Assignee (if mentioned)
4. Due date (if mentioned)
5. Priority level (low, medium, high, critical)
6. Context from the text

Format as JSON:
{
  "actionItems": [{
    "title": "string",
    "description": "string",
    "assignee": "string (optional)",
    "dueDate": "YYYY-MM-DD (optional)",
    "priority": "low|medium|high|critical",
    "context": "string"
  }]
}
`

    const data = {
      model: request.config?.model || 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at extracting actionable items from text. Be precise and thorough.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: request.config?.temperature || 0.2,
      max_tokens: request.config?.maxTokens || 1500,
    }

    try {
      const response = await this.makeRequest('/chat/completions', data)
      const content = response.choices[0]?.message?.content
      
      if (!content) {
        throw new Error('No response content from AI')
      }

      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/{[\s\S]*}/)
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content
      
      const result = JSON.parse(jsonString)
      
      const schema = z.object({
        actionItems: z.array(z.object({
          title: z.string(),
          description: z.string(),
          assignee: z.string().optional(),
          dueDate: z.string().optional(),
          priority: z.enum(['low', 'medium', 'high', 'critical']),
          context: z.string(),
        })),
      })

      return schema.parse(result)
    } catch (error) {
      console.error('Error extracting action items:', error)
      throw new Error(`Failed to extract action items: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async generateTags(
    request: TagGenerationRequest
  ): Promise<TagGenerationResponse> {
    const prompt = `
Generate relevant tags for the following content. Consider categories like:
- Topics discussed
- Departments/teams involved
- Project phases
- Meeting types
- Urgency levels

Existing tags (optional): ${request.existingTags?.join(', ') || 'none'}

Content:
${request.text}

Generate 5-10 relevant tags with categories and confidence scores.

Format as JSON:
{
  "tags": [{
    "name": "string",
    "category": "string",
    "confidence": number
  }]
}
`

    const data = {
      model: request.config?.model || 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at categorizing and tagging content. Be accurate and relevant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: request.config?.temperature || 0.3,
      max_tokens: request.config?.maxTokens || 1000,
    }

    try {
      const response = await this.makeRequest('/chat/completions', data)
      const content = response.choices[0]?.message?.content
      
      if (!content) {
        throw new Error('No response content from AI')
      }

      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/{[\s\S]*}/)
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content
      
      const result = JSON.parse(jsonString)
      
      const schema = z.object({
        tags: z.array(z.object({
          name: z.string(),
          category: z.string(),
          confidence: z.number().min(0).max(1),
        })),
      })

      return schema.parse(result)
    } catch (error) {
      console.error('Error generating tags:', error)
      throw new Error(`Failed to generate tags: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async analyzeSentiment(
    request: SentimentAnalysisRequest
  ): Promise<SentimentAnalysisResponse> {
    const prompt = `
Analyze the sentiment of the following text. Identify overall sentiment and specific highlights.

Text:
${request.text}

Provide:
1. Overall sentiment (positive, neutral, negative)
2. Confidence score (0-1)
3. Specific highlights with their sentiment and reasoning

Format as JSON:
{
  "sentiment": "positive|neutral|negative",
  "confidence": number,
  "highlights": [{
    "text": "string",
    "sentiment": "positive|neutral|negative",
    "reason": "string"
  }]
}
`

    const data = {
      model: request.config?.model || 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an expert sentiment analyzer. Be objective and accurate.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: request.config?.temperature || 0.1,
      max_tokens: request.config?.maxTokens || 800,
    }

    try {
      const response = await this.makeRequest('/chat/completions', data)
      const content = response.choices[0]?.message?.content
      
      if (!content) {
        throw new Error('No response content from AI')
      }

      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/{[\s\S]*}/)
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content
      
      const result = JSON.parse(jsonString)
      
      const schema = z.object({
        sentiment: z.enum(['positive', 'neutral', 'negative']),
        confidence: z.number().min(0).max(1),
        highlights: z.array(z.object({
          text: z.string(),
          sentiment: z.enum(['positive', 'neutral', 'negative']),
          reason: z.string(),
        })),
      })

      return schema.parse(result)
    } catch (error) {
      console.error('Error analyzing sentiment:', error)
      throw new Error(`Failed to analyze sentiment: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async draftFollowUpEmail(
    meetingTitle: string,
    summary: string,
    actionItems: Array<{ title: string; assignee?: string }>,
    tone: 'formal' | 'casual' | 'friendly' = 'professional'
  ): Promise<string> {
    const prompt = `
Draft a follow-up email for a meeting.

Meeting: ${meetingTitle}
Summary: ${summary}
Action Items: ${actionItems.map(item => `- ${item.title}${item.assignee ? ` (${item.assignee})` : ''}`).join('\n')}

Tone: ${tone}

Include:
1. Thank participants
2. Brief meeting recap
3. Clear action items
4. Next steps
5. Professional closing
`

    const data = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at writing professional follow-up emails.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    }

    try {
      const response = await this.makeRequest('/chat/completions', data)
      return response.choices[0]?.message?.content || ''
    } catch (error) {
      console.error('Error drafting follow-up email:', error)
      throw new Error(`Failed to draft follow-up email: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Utility method to check if AI is available
  isAvailable(): boolean {
    return !!this.apiKey
  }

  // Test connection to DeepSeek API
  async testConnection(): Promise<boolean> {
    if (!this.isAvailable()) {
      return false
    }

    try {
      const data = {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 5,
      }

      await this.makeRequest('/chat/completions', data)
      return true
    } catch (error) {
      console.error('DeepSeek API connection test failed:', error)
      return false
    }
  }
}

// Singleton instance
export const deepseekAI = new DeepSeekAI()