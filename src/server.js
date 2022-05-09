import { router } from "./router.js";

export default async function (request) {
  const url = new URL(request.url);
  const match = router.find(url.pathname);
  if (match) {
    const { handler, params } = match;
    return handler({ url, params, request });
  }
  return new Response(null, { status: 404 });
}
