import { BedrockClient } from "@aws-sdk/client-bedrock";

const client = new BedrockClient({ region: `us-west-2` });

export async function requestBedrock(prompt: string) {
  //   const response = await fetch("https://bedrock.ai/api/v1/chat/completions", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ prompt }),
  //   });
}
