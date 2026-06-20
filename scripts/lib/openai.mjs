import OpenAI from 'openai';

export function createOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required.');
  }

  return new OpenAI({ apiKey });
}

export async function createStructuredResponse({ model, schemaName, schema, systemPrompt, userPrompt }) {
  const client = createOpenAIClient();
  const response = await client.responses.create({
    model,
    input: [
      {
        role: 'system',
        content: [{ type: 'input_text', text: systemPrompt }]
      },
      {
        role: 'user',
        content: [{ type: 'input_text', text: userPrompt }]
      }
    ],
    text: {
      format: {
        type: 'json_schema',
        name: schemaName,
        strict: true,
        schema
      }
    }
  });

  if (!response.output_text) {
    throw new Error('OpenAI response did not include structured output text.');
  }

  return JSON.parse(response.output_text);
}
