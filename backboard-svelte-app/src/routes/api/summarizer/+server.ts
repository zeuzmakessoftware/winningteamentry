import type { RequestHandler } from "@sveltejs/kit";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import {
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SESSION_TOKEN,
} from "$env/static/private";

const AWS_REGION = "us-west-2";
const MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0";

export const POST: RequestHandler = async ({ request }) => {
  const { prompt } = await request.json();

  console.log("client")

  const client = new BedrockRuntimeClient({
    region: AWS_REGION,
    credentials: {
      sessionToken: AWS_SESSION_TOKEN,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  console.log("payload")

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 200,
    messages: [{ role: "user", content: [{ type: "text", text: `You are a summarizer for companies that specialize in giving the proper data for venture capitolists. Answer the question. ${prompt}` }] }],
  };

  console.log("apiResponse")

  const apiResponse = await client.send(
    new InvokeModelCommand({
      contentType: "application/json",
      body: JSON.stringify(payload),
      modelId: MODEL_ID,
    })
  );
  console.log("responses")

  const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
  const responseBody = JSON.parse(decodedResponseBody);
  const responses = responseBody.content;

  console.log("result")

  const result =
    responses.length === 1
      ? responses[0].text
      : "Multiple responses received: " + JSON.stringify(responses);

  console.log(result)

  console.log("response")

  return new Response(result, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
