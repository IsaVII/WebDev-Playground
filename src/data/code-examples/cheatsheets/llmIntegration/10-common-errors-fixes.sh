# "Access-Control-Allow-Origin" / CORS error in the browser console
#   → You called api.anthropic.com directly from the frontend, or forgot
#     app.use(cors()) on your Express server. Fix: only call your own
#     backend route from the browser (see Step 1).

# 401 { "type": "authentication_error" }
#   → ANTHROPIC_API_KEY is missing, wrong, or the .env file isn't loaded.
#     Confirm `import 'dotenv/config'` runs before you construct the
#     Anthropic client.

# SyntaxError: Unexpected token '`' in JSON.parse
#   → The model wrapped its answer in ```json fences despite being told
#     not to. Strip fences before parsing (see Step 7's extractJson).

# 400 { "type": "invalid_request_error", ... max_tokens ... }
#   → max_tokens is required, and your prompt + expected answer must fit
#     the model's context window. Trim or summarize very long logs before
#     sending them.

# The model gives a diagnosis / medical advice instead of a correlation
#   → The system prompt isn't strict enough. Repeat the constraint in the
#     user message too, and lower temperature for more consistent, less
#     "creative" phrasing.

# Requests are fast locally but time out in production
#   → Set an explicit fetch/client timeout, and don't block the response
#     path on the LLM call for anything real-time - kick it off async and
#     poll, or use streaming (message.stream) for long analyses.
