import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn(
    'Warning: NEXT_PUBLIC_GEMINI_API_KEY is not set. AI responses will not work.'
  );
}

// Simple rate limiter - removed delay for better user experience
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 0; // No delay - send immediately

function checkRateLimit() {
  // Rate limiting disabled for smooth experience
  // If API rate limits occur, will be handled by error messages
  lastRequestTime = Date.now();
}

const SYSTEM_PROMPT = `You are an intelligent AI assistant for TheNetrider, a leading digital marketing and AI training company. 

TheNetrider offers:
- Digital Marketing training and services
- AI Academy courses
- Freelancing & E-Commerce training
- Network Automation courses
- Web Development services
- On-campus, online, and weekend training classes

Your role is to:
1. Provide helpful information about TheNetrider's services and courses
2. Answer questions about digital marketing, AI, freelancing, and web development
3. Guide users toward booking consultations or enrolling in courses
4. Be professional, friendly, and business-oriented
5. Keep responses concise and actionable
6. Suggest relevant services based on user questions

Always maintain a professional yet approachable tone. If asked about something outside your knowledge, politely redirect to TheNetrider's website or suggest contacting them directly.`;

export async function generateAIResponse(userMessage: string): Promise<string> {
  if (!API_KEY) {
    throw new Error(
      'API Key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.'
    );
  }

  // Check rate limit
  checkRateLimit();

  try {
    console.log('Sending request to Gemini API...');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    
    const response = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nUser message: ${userMessage}`
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      ]
    }, {
      timeout: 30000, // 30 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response received:', response.data);

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const aiText = response.data.candidates[0].content.parts[0].text;
      console.log('AI Response text:', aiText);
      return aiText;
    }

    console.error('No valid response in data:', response.data);
    throw new Error('No response from AI');
  } catch (error: any) {
    console.error('Gemini API Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    // More detailed error handling
    if (error.response?.status === 404) {
      throw new Error('❌ Model not found. The API key might not have access to gemini-2.5-flash.');
    }
    if (error.response?.status === 403 || error.response?.status === 401) {
      throw new Error('❌ Invalid or expired API key. Please generate a new one from Google AI Studio.');
    }
    if (error.response?.status === 429) {
      throw new Error('⏳ Rate limit reached. Please wait 10 seconds and try again.');
    }
    if (error.response?.status === 400) {
      const errorMsg = error.response?.data?.error?.message || 'Bad request';
      throw new Error(`❌ Request error: ${errorMsg}`);
    }
    
    // Network errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      throw new Error('🌐 Network error. Please check your internet connection.');
    }
    
    const detailedError = error.response?.data?.error?.message || error.message || 'Unknown error';
    throw new Error(`❌ AI Error: ${detailedError}`);
  }
}

export async function generateAIResponseStream(
  userMessage: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  if (!API_KEY) {
    throw new Error(
      'API Key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.'
    );
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${API_KEY}`;
    
    const response = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nUser message: ${userMessage}`
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    }, {
      responseType: 'stream'
    });

    response.data.on('data', (chunk: Buffer) => {
      const text = chunk.toString('utf8');
      try {
        const lines = text.split('\n').filter(line => line.trim());
        for (const line of lines) {
          const jsonStr = line.startsWith('data: ') ? line.slice(6) : line;
          const data = JSON.parse(jsonStr);
          if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            onChunk(data.candidates[0].content.parts[0].text);
          }
        }
      } catch (e) {
        // Ignore parsing errors in streaming
      }
    });

    return new Promise((resolve, reject) => {
      response.data.on('end', resolve);
      response.data.on('error', reject);
    });
  } catch (error: any) {
    console.error('Gemini Stream API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      throw new Error('Model not found. Please verify your API key.');
    }
    if (error.response?.status === 403 || error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your NEXT_PUBLIC_GEMINI_API_KEY.');
    }
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    
    throw new Error(`AI Error: ${error.response?.data?.error?.message || error.message || 'Failed to generate response. Please try again.'}`);
  }
}
