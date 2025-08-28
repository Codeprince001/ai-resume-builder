// app/api/chat/route.ts (App Router)

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

// POST /api/chat
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

      const provider = new SimpleAuthenticationDetailsProvider(
      process.env.OCI_TENANCY_OCID!,   // tenancy OCID
      process.env.OCI_USER_OCID!,      // user OCID
      process.env.OCI_FINGERPRINT!,    // API key fingerprint
      process.env.OCI_PRIVATE_KEY!,    // private key PEM string
      process.env.OCI_REGION!          // region, e.g. "us-ashburn-1"
    );


    const client = new GenerativeAiInferenceClient({ 
      authenticationDetailsProvider: provider,
    });
    client.endpoint = ENDPOINT;

    const servingMode: models.OnDemandServingMode = {
      modelId: "ocid1.generativeaimodel.oc1.iad.amaaaaaask7dceyag3w2xk76vlahjujj2gdfeuzhflt25gbo3bxidlsqfjla",
      servingType: "ON_DEMAND",
    };

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
                  text: message,
                } 
              ], 
            },
          ],
          apiFormat: "GENERIC",
          maxTokens: 2000, // ✅ Increased from 600 to 2000
          temperature: 0.7, // ✅ Reduced from 1 for more consistent responses
        },
      },
    };

    console.log("Sending request to Oracle AI...");
    const response = await client.chat(chatRequest);
    console.log("Response received:", JSON.stringify(response, null, 2));

    // Handle the response properly
    const chatResponse = response.chatResult;
    const responseText = chatResponse?.chatResponse?.choices?.[0]?.message?.content?.[0]?.text || "No response";

    return NextResponse.json({
      data: responseText,
    });
    
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