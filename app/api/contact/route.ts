import { handleContactPost } from "../../../src/lib/contact-api-handler";

export async function POST(request: Request) {
  return handleContactPost(request);
}
