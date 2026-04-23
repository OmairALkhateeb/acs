import { createFileRoute } from "@tanstack/react-router";
import { handleContactPost } from "@/lib/contact-api-handler";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: ({ request }) => handleContactPost(request),
    },
  },
});
