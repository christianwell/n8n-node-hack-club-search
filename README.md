![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-brave-search

[![npm version](https://img.shields.io/npm/v/@brave/n8n-nodes-brave-search)](https://www.npmjs.com/package/@brave/n8n-nodes-brave-search)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is an n8n community node that integrates the [Brave Search API](https://brave.com/search/api/) into your n8n workflows.

**Why Brave Search?** Power your search and AI applications with the fastest-growing independent search engine since Bing. Access an index of billions of web pages with a single API call.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)
- [Development](#development)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Alternatively, install via npm:

```bash
npm install @brave/n8n-nodes-brave-search
```

## Getting Started

1. **Get an API Key**: Sign up at [Brave Search API](https://brave.com/search/api/) to get your free API key
   - Free tier includes: 1 query/second and 2,000 queries/month
2. **Install the node** in your n8n instance (see [Installation](#installation))
3. **Configure credentials** in n8n with your API key (see [Credentials](#credentials))
4. **Start building** workflows with web, image, news, and video search capabilities

## Operations

This node supports the following search operations:

- **Web Search**: General web results from Brave's search index
- **Image Search**: Image results with metadata
- **News Search**: Recent news articles and stories
- **Video Search**: Video content from across the web

Each operation returns comprehensive data including titles, descriptions, URLs, and additional metadata specific to the content type.

## Credentials

To use this node, you need a Brave Search API key.

**How to get your API key:**

1. Visit [https://brave.com/search/api/](https://brave.com/search/api/)
2. Sign up for a free account
3. Your API key will be provided in the dashboard

**Free tier includes:**
- 1 query per second
- 2,000 queries per month

**Configuring in n8n:**

1. In n8n, create a new credential of type "Brave Search API"
2. Paste your API key
3. Save the credential

## Compatibility

Tested locally against n8n v1.93.0.

## Usage

To effectively use this node, familiarize yourself with the various response object formats provided by the Brave Search API. Understanding these structures will help you access and process the data returned by each search operation.

**Response Documentation:**
- [Web Search Response Format](https://api-dashboard.search.brave.com/app/documentation/web-search/responses)
- [Full API Documentation](https://api-dashboard.search.brave.com/app/documentation/)

**Example Workflow:**

1. Add the Brave Search node to your workflow
2. Select an operation (Web, Image, News, or Video)
3. Enter your search query
4. Configure optional parameters (filters, pagination, etc.)
5. Process the response data in subsequent nodes

**Tips:**
- Use the JSON node to parse and extract specific fields from responses
- Combine with AI nodes for enhanced search and analysis
- Implement error handling for rate limit scenarios

## Resources

* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Brave Search API Documentation](https://api-dashboard.search.brave.com/app/documentation/)
* [Brave Search API Dashboard](https://api-dashboard.search.brave.com/)
* [n8n Workflow Templates](https://n8n.io/workflows/)

## Development

This section is for developers who want to contribute to or modify this node.

### Prerequisites

- Node.js >= 18.10
- pnpm >= 9.1
- n8n installed globally

### Quick Start (Recommended)

The fastest way to start developing:

```bash
# Install n8n globally
pnpm add -g n8n

# Install dependencies
pnpm install

# Run the full development environment
pnpm run dev:full
```

This command automatically:
- ✅ Builds the project
- ✅ Starts TypeScript compilation in watch mode
- ✅ Launches n8n with proper environment variables
- ✅ Enables hot reloading for rapid development

Open your browser at [http://localhost:5678](http://localhost:5678) to access the n8n editor.

### Manual Development Setup

If you prefer more control over the process:

```bash
# 1. Install n8n globally
pnpm add -g n8n

# 2. Install dependencies
pnpm install

# 3. Build the project
pnpm build

# 4. Start TypeScript watch mode (in one terminal)
pnpm dev

# 5. Start n8n (in another terminal)
pnpm run dev:n8n
```

### Alternative: Custom Environment Variables

You can manually set environment variables:

```bash
export N8N_CUSTOM_EXTENSIONS=/path/to/this/repo/dist
export N8N_DEV_RELOAD=true
pnpm run dev &
n8n start
```

### Development Scripts

- `pnpm build` - Build the project
- `pnpm dev` - Watch mode for TypeScript compilation
- `pnpm dev:n8n` - Start n8n with development settings
- `pnpm dev:full` - Run complete development environment
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Lint code
- `pnpm lintfix` - Lint and auto-fix issues

### First-Time Setup

**⏱️ Initial Startup**: When launching n8n locally for the first time, initialization may take 1-2 minutes. Wait for the "Editor is now accessible via web browser" message before opening your browser.

**👤 User Setup**: On first access to [http://localhost:5678](http://localhost:5678), you'll be prompted to create an admin user account.

**🔑 API Credentials**: Remember to configure your Brave Search API credentials in the n8n interface before testing the node. See the [Credentials](#credentials) section for details.

**🔄 Reset if Needed**: If you encounter issues or need a fresh start, reset n8n with:

```bash
n8n user-management:reset
```

### Project Structure

```
.
├── credentials/           # API credential definitions
├── nodes/
│   └── BraveSearch/      # Main node implementation
│       ├── BraveSearch.node.ts
│       ├── operations/    # Operation definitions
│       └── braveSearch.svg
├── dist/                  # Compiled output (generated)
└── package.json
```

### Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm lint` and `pnpm format`
5. Test your changes thoroughly
6. Submit a pull request

---

Made with ❤️ for the n8n community
