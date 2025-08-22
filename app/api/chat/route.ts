// app/api/chat/route.ts (App Router)

import { NextResponse } from "next/server";
import { GenerativeAiInferenceClient, models, requests } from "oci-generativeaiinference";
import { ConfigFileAuthenticationDetailsProvider, NoRetryConfigurationDetails } from "oci-common";


const CONFIG_LOCATION = "C:/Users/Windows/.oci/config";
const CONFIG_PROFILE = "DEFAULT";
const COMPARTMENT_ID = "ocid1.compartment.oc1..aaaaaaaajazxauqz347rt3xrux54gwm53lj3bvnurwrkrnw2nf4zdzqn5nia";
const ENDPOINT = "https://inference.generativeai.us-ashburn-1.oci.oraclecloud.com";

// POST /api/chat
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Use ConfigFileAuthenticationDetailsProvider instead of SessionAuthDetailProvider
    const provider = new ConfigFileAuthenticationDetailsProvider(CONFIG_LOCATION, CONFIG_PROFILE);
    
    const client = new GenerativeAiInferenceClient({ 
      authenticationDetailsProvider: provider,
      retryConfiguration: NoRetryConfigurationDetails 
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
    
  } catch (error: any) {
    console.error("Oracle AI Error Details:", {
      message: error.message,
      statusCode: error.statusCode,
      serviceCode: error.serviceCode,
      opcRequestId: error.opcRequestId,
      stack: error.stack
    });
    
    return NextResponse.json({ 
      error: "Failed to get response",
      details: error.message,
      statusCode: error.statusCode 
    }, { status: 500 });
  }
}