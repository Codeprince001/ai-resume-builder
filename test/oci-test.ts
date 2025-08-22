import { GenerativeAiInferenceClient, models, requests } from "oci-generativeaiinference";
import { SessionAuthDetailProvider } from "oci-common";

const CONFIG_LOCATION = "C:\\Users\\Windows\\.oci\\config";
const CONFIG_PROFILE = "DEFAULT";

(async () => {
  const provider = new SessionAuthDetailProvider(CONFIG_LOCATION, CONFIG_PROFILE);
  const client = new GenerativeAiInferenceClient({ authenticationDetailsProvider: provider });
  client.endpoint = "https://inference.generativeai.us-ashburn-1.oci.oraclecloud.com";

  console.log("OCI Client initialized successfully!");
})();
