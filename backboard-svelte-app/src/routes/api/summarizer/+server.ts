import type { RequestHandler } from '@sveltejs/kit';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { AWS_SESSION_TOKEN, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_DEFAULT_REGION } from '$env/static/private';

const AWS_REGION = "us-west-2";

const MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0";
const PROMPT = "Hi. In a short paragraph, explain what you can do.";

export const GET: RequestHandler = async () => {
    console.log("=".repeat(35));
    console.log("Welcome to the Amazon Bedrock demo!");
    console.log("=".repeat(35));

    console.log("Model: Anthropic Claude 3");
    console.log(`Prompt: ${PROMPT}\n`);
    console.log("Invoking model...\n");

    const client = new BedrockRuntimeClient({ 
        region: AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }, });

    const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [{ role: "user", content: [{ type: "text", text: PROMPT }] }],
    };

    const apiResponse = await client.send(
        new InvokeModelCommand({
        contentType: "application/json",
        body: JSON.stringify(payload),
        modelId: MODEL_ID,
        }),
    );

    const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
    /** @type {ResponseBody} */
    const responseBody = JSON.parse(decodedResponseBody);
    const responses = responseBody.content;

    if (responses.length === 1) {
        console.log(`Response: ${responses[0].text}`);
    } else {
        console.log("Haiku returned multiple responses:");
        console.log(responses);
    }

    console.log(`\nNumber of input tokens:   ${responseBody.usage.input_tokens}`);
    console.log(`Number of output tokens: ${responseBody.usage.output_tokens}`);
    return new Response('Hello World', {
        status: 200,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
};
