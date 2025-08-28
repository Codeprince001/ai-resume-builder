// @ts-nocheck

// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { GenerativeAiInferenceClient, models, requests } from "oci-generativeaiinference";
import { SimpleAuthenticationDetailsProvider } from "oci-common";
type OciError = Error & {
  statusCode?: number;
  serviceCode?: string;
  opcRequestId?: string;
};

const COMPARTMENT_ID = "ocid1.compartment.oc1..aaaaaaaajazxauqz347rt3xrux54gwm53lj3bvnurwrkrnw2nf4zdzqn5nia";
const ENDPOINT = "https://inference.generativeai.us-ashburn-1.oci.oraclecloud.com";

// Force Node.js runtime for compatibility with Oracle SDK
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // Parse request body
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: "Invalid or missing message" }, { status: 400 });
    }

    // Initialize authentication provider
    const provider = new SimpleAuthenticationDetailsProvider(
      process.env.OCI_TENANCY_OCID!,
      process.env.OCI_USER_OCID!,
      process.env.OCI_FINGERPRINT!,
      process.env.OCI_PRIVATE_KEY!,
      process.env.OCI_REGION!
    );

    // Initialize client
    const client = new GenerativeAiInferenceClient({
      authenticationDetailsProvider: provider,
    });
    client.endpoint = ENDPOINT;

    // Define serving mode
    const servingMode: models.OnDemandServingMode = {
      modelId: "ocid1.generativeaimodel.oc1.iad.amaaaaaask7dceyag3w2xk76vlahjujj2gdfeuzhflt25gbo3bxidlsqfjla",
      servingType: "ON_DEMAND",
    };

    // Build chat request
    const chatRequest: requests.ChatRequest = {
      chatDetails: {
        compartmentId: COMPARTMENT_ID,
        servingMode,
        chatRequest: {
          messages: [
            {
              role: "USER",
              content: [
                {
                  type: "TEXT",
                  // @ts-expect-error
                  text: message,
                },
              ],
            },
          ],
          apiFormat: "GENERIC",
          maxTokens: 2000,
          temperature: 0.7,
        },
      },
    };

    console.log("Sending request to Oracle AI with message:", message);
    const response = await client.chat(chatRequest);
    console.log("Response received:", JSON.stringify(response, null, 2));

    // Safely extract response text
    // @ts-expect-error
    const chatResponse = response?.chatResult;
    if (!chatResponse || !chatResponse.chatResponse?.choices?.length) {
      throw new Error("Invalid or empty response from Oracle AI");
    }
    const responseText = chatResponse.chatResponse.choices[0]?.message?.content?.[0]?.text || "No response";

    return NextResponse.json({ data: responseText });
  } catch (err: unknown) {
    const error = err as OciError;
    console.error("Oracle AI Error Details:", {
      message: error.message,
      statusCode: error.statusCode,
      serviceCode: error.serviceCode,
      opcRequestId: error.opcRequestId,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: "Failed to get response", details: error.message },
      { status: 500 }
    );
  }
}