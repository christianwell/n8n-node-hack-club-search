# n8n-nodes-hackclub-search

[![npm version](https://img.shields.io/npm/v/n8n-nodes-hackclub-search.svg)](https://www.npmjs.com/package/n8n-nodes-hackclub-search)
[Hack Club Search API](https://hackclub.com) • n8n community node

A community node for n8n that provides access to the Hack Club Search API from within your n8n workflows. Use it to retrieve web search results, images, news, and videos and integrate those results directly into automations and data pipelines.

This README covers installation, configuration, usage examples, development, and resources.

Table of contents
- Installation
- Operations
- Credentials
- Compatibility
- Usage examples
- Example node inputs & response notes
- Development
- Contributing
- Version history
- Resources
- License

Installation

Option A — Install using npm (for local development or custom extension)
1. Install the package into your project or an n8n custom extensions folder:
   - npm:
     npm install n8n-nodes-hackclub-search
   - or pnpm:
     pnpm add n8n-nodes-hackclub-search

2. If running n8n in custom extensions mode, set N8N_CUSTOM_EXTENSIONS to point to the dist folder of this package (or copy the built package into your n8n custom extensions directory).

Option B — Install while developing n8n community nodes
Follow the n8n community nodes documentation to register and load community nodes in your n8n instance.

Operations

This node supports the following high-level operations (current):
- Web Search — general web result search
- Image Search — fetch images related to a query
- News Search — search news articles
- Video Search — search videos

Each operation exposes common search parameters such as:
- query (required) — the search text
- limit / count — number of results to return
- offset — pagination offset
- safeSearch — safe search filtering
- type-specific options — e.g., image size/format filters, video duration, news source filters

Note: Exact parameter names and available options are determined by the Hack Club Search API and the node configuration. Inspect the node's parameter list in the n8n editor for the full set.

Credentials

The node requires an API key for the Hack Club Search API.

How to configure credentials in n8n:
1. Open the n8n editor (UI).
2. Go to "Credentials" -> "New Credential".
3. Create a credential (e.g., "Hack Club Search API") and provide your API key.
4. In the Hack Club Search node, select the credential you created.

Compatibility

- Tested with n8n v1.93.0 (local testing)
- This is a community node — compatibility may vary across n8n releases. If you see compatibility issues, try running the node against the n8n version used for testing or open an issue.

Usage

Add the node to your workflow and select the desired operation (Web, Image, News, or Video). Configure the query and any additional parameters.

Example: simple workflow snippet (conceptual)
- Start -> Set (with JSON { "searchTerm": "n8n integrations" }) -> Hack Club Search (Operation: Web Search, Query: {{$json["searchTerm"]}}) -> Further processing

Example: Configure the node
- Operation: Web Search
- Query: {{$json["searchTerm"]}} or static "n8n dev resources"
- Count / Limit: 10
- SafeSearch: moderate
- Credential: Hack Club Search API (select the credential you configured)

Example output (conceptual)
Each output item will typically contain fields returned by the Hack Club Search API. Common fields across operations may include:
- id — result identifier
- title — result title
- link / url — destination URL
- snippet / description — short excerpt
- source — source site or provider
- publishedAt — for news/video results
- thumbnail — for images/videos

Important: Response object formats are defined by the Hack Club Search API. For exact schemas, consult the Hack Club Search API documentation (see Resources).

Development

Quick Start (recommended)
1. Install n8n globally (recommended for local development):
   pnpm add -g n8n
2. Install project dependencies:
   pnpm install
3. Run the full development environment:
   pnpm run dev:full

dev:full will typically:
- Build the project
- Start TypeScript compilation in watch mode
- Launch n8n with environment variables set to load the custom node
- Enable hot reloading for fast development cycles

Open the n8n editor UI in your browser (usually at http://localhost:5678). You should then be able to add and test the Hack Club Search node in workflows.

Manual Development Setup
If you prefer to run parts of the dev environment separately:
1. Install n8n globally:
   pnpm add -g n8n
2. Install dependencies:
   pnpm install
3. Build the project:
   pnpm build
4. Start TypeScript watch mode:
   pnpm dev
5. In a separate terminal, start n8n (with the appropriate env vars set):
   pnpm run dev:n8n

Alternative: Environment variables
- Set N8N_CUSTOM_EXTENSIONS to the /dist directory of this repository (so n8n loads the built node)
- Set N8N_DEV_RELOAD to true to enable reloads
- Run pnpm run dev and start n8n separately

Publishing
- Bump the package version in package.json
- Build and publish to npm:
  pnpm build
  pnpm publish

First-time setup notes
- Ensure your Hack Club Search API key is valid and has the required quota.
- If you change the node input/output schema, update documentation and tests accordingly.
- Use the n8n editor to inspect strongly-typed node input/parameter fields during development.

Contributing

Contributions are welcome! Please follow standard open-source contribution practices:
- Open issues for bugs or feature requests.
- Fork the repository, create a feature branch, implement your changes, add tests if applicable, and open a pull request.
- Provide a clear PR description, and reference related issues.

When contributing:
- Keep changes scoped and documented
- Ensure the node works in the supported n8n version(s)
- Run linters and tests (if included in the repo)

Version history

- 1.0.0 — Initial public release
  - Added support for Web, Image, News, and Video search operations
  - Credential support for Hack Club Search API
  - Development and local testing tooling (pnpm scripts)

Resources

- npm package page: https://www.npmjs.com/package/n8n-nodes-hackclub-search
- n8n community nodes documentation: https://docs.n8n.io/integrations/community-node/
- Hack Club Search API documentation: (refer to the official Hack Club docs / API site for full response formats and parameters)

Support

If you find bugs or want to request features, please open an issue in this repository (or contact the maintainer). Include:
- n8n version
- Node version
- Reproduction steps
- Logs or screenshots if helpful

License

See the repository LICENSE file for license details.

Maintainer
- christianwell (GitHub: christianwell)

---

Thanks for using n8n-nodes-hackclub-search — if you'd like, I can also:
- produce a copy of this README tailored for the package's npm description field,
- generate example n8n workflow JSON that demonstrates all operations, or
- create CONTRIBUTING.md and CODE_OF_CONDUCT.md files.
