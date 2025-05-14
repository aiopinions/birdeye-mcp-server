# Birdeye MCP Server

A Model Context Protocol (MCP) server implementation for the Birdeye APIs. This server acts as a middleware between AI models and the Birdeye blockchain data APIs, providing context about tokens, markets, wallets, NFTs, and more on the Solana blockchain.

## What is Model Context Protocol (MCP)?

Model Context Protocol (MCP) is a standardized way for AI models to request and receive contextual information from external data sources. This implementation focuses on providing blockchain and crypto-specific context from Birdeye's APIs.

## Features

- Token information and prices
- Market data and analytics
- Wallet portfolio tracking
- NFT collections and items
- DEX pools and liquidity
- MCP-friendly endpoints for AI context generation

## Prerequisites

- Node.js (v14+ recommended)
- Birdeye API key (get one from [Birdeye](https://birdeye.so/))

## Installation

### Standard Installation

1. Clone this repository
   ```
   git clone <repository-url>
   cd birdeye-mcp-server
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file and add your Birdeye API key.

### Docker Installation

1. Clone this repository
   ```
   git clone <repository-url>
   cd birdeye-mcp-server
   ```

2. Configure environment variables
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file and add your Birdeye API key.

3. Build and start with Docker Compose
   ```
   docker-compose up -d
   ```

## Usage

### Start the server (Standard)

```
npm start
```

The server will run on port 3000 by default (configurable in .env).

### Start the server (Docker)

```
docker-compose up -d
```

To view logs:
```
docker-compose logs -f
```

To stop the server:
```
docker-compose down
```

### API Endpoints

#### Standard Birdeye Endpoints

- `GET /token/:network/:address` - Get token information
- `GET /price/:network/:address` - Get token price
- `GET /price/history/:network/:address` - Get token price history
- `GET /market/:network/:address` - Get market information
- `GET /tokens/top/:network` - Get top tokens
- `GET /token/:network/:address/holders` - Get token holders
- `GET /token/:network/:address/transfers` - Get token transfers
- `GET /wallet/:network/:address` - Get wallet portfolio
- `GET /wallet/:network/:address/tokens` - Get wallet tokens
- `GET /nft/collections/:network` - Get NFT collections
- `GET /nft/collection/:network/:address` - Get NFT collection info
- `GET /nft/item/:network/:address` - Get NFT item info
- `GET /dex/pools/:network` - Get DEX pools
- `GET /dex/pool/:network/:address` - Get DEX pool info

#### MCP-Specific Endpoints

- `POST /mcp/token` - Get comprehensive token context
  ```json
  {
    "network": "solana",
    "address": "token_address",
    "context": "optional query context"
  }
  ```

- `POST /mcp/wallet` - Get comprehensive wallet context
  ```json
  {
    "network": "solana",
    "address": "wallet_address",
    "context": "optional query context"
  }
  ```

- `POST /mcp/market` - Get market overview context
  ```json
  {
    "network": "solana",
    "context": "optional query context"
  }
  ```

## Integrating with AI Models

To use this MCP server with AI models:

1. Set up the server and ensure it's accessible to your AI system
2. Configure your AI to make appropriate requests to the MCP endpoints
3. Parse the contextual information and incorporate it into your model's responses

Example integration:

```javascript
// From your AI application
async function getBirdeyeContext(tokenAddress) {
  const response = await fetch('http://your-mcp-server/mcp/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'your_api_key'
    },
    body: JSON.stringify({
      network: 'solana',
      address: tokenAddress,
      context: 'User is asking about token price and market cap'
    })
  });
  
  return await response.json();
}
```

## License

MIT
