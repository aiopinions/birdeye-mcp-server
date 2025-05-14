// Birdeye MCP Server
// A Model Context Protocol server implementation for Birdeye.so APIs

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Birdeye API configuration
const BIRDEYE_API_BASE_URL = 'https://public-api.birdeye.so';
const DEFAULT_NETWORK = 'solana';

// Helper function to make API requests to Birdeye
async function callBirdeyeAPI(endpoint, params = {}, apiKey = process.env.BIRDEYE_API_KEY) {
  try {
    const url = `${BIRDEYE_API_BASE_URL}${endpoint}`;
    const headers = {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    };

    const response = await axios.get(url, { headers, params });
    return response.data;
  } catch (error) {
    console.error(`Error calling Birdeye API: ${error.message}`);
    throw error;
  }
}

// MCP Server endpoints

// 1. Root endpoint - Documentation
app.get('/', (req, res) => {
  res.json({
    name: 'Birdeye MCP Server',
    version: '1.0.0',
    description: 'Model Context Protocol server for Birdeye APIs',
    endpoints: [
      { path: '/token/:network/:address', description: 'Get token information' },
      { path: '/price/:network/:address', description: 'Get token price' },
      { path: '/market/:network/:address', description: 'Get market information' },
      { path: '/dex/:network', description: 'Get DEX information' },
      { path: '/wallet/:network/:address', description: 'Get wallet information' },
      { path: '/nft/:network/:address', description: 'Get NFT information' }
    ]
  });
});

// 2. Token Information
app.get('/token/:network/:address', async (req, res) => {
  try {
    const { network, address } = req.params;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const tokenInfo = await callBirdeyeAPI(`/defi/token_info`, { 
      address, 
      network: network || DEFAULT_NETWORK 
    }, apiKey);
    
    res.json(tokenInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Token Price
app.get('/price/:network/:address', async (req, res) => {
  try {
    const { network, address } = req.params;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const priceInfo = await callBirdeyeAPI(`/defi/price`, { 
      address, 
      network: network || DEFAULT_NETWORK 
    }, apiKey);
    
    res.json(priceInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Token Price History
app.get('/price/history/:network/:address', async (req, res) => {
  try {
    const { network, address } = req.params;
    const { resolution = '1H', countback = 100 } = req.query;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const priceHistory = await callBirdeyeAPI(`/defi/price_chart`, { 
      address, 
      network: network || DEFAULT_NETWORK,
      resolution,
      countback
    }, apiKey);
    
    res.json(priceHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Market Information
app.get('/market/:network/:address', async (req, res) => {
  try {
    const { network, address } = req.params;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const marketInfo = await callBirdeyeAPI(`/defi/market_data`, { 
      address, 
      network: network || DEFAULT_NETWORK 
    }, apiKey);
    
    res.json(marketInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Top Tokens
app.get('/tokens/top/:network', async (req, res) => {
  try {
    const { network } = req.params;
    const { limit = 100, offset = 0 } = req.query;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const topTokens = await callBirdeyeAPI(`/defi/top_tokens`, { 
      network: network || DEFAULT_NETWORK,
      limit,
      offset
    }, apiKey);
    
    res.json(topTokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Token Holders
app.get('/token/:network/:address/holders', async (req, res) => {
  try {
    const { network, address } = req.params;
    const { limit = 100, offset = 0 } = req.query;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const holders = await callBirdeyeAPI(`/defi/token_holders`, { 
      address,
      network: network || DEFAULT_NETWORK,
      limit,
      offset
    }, apiKey);
    
    res.json(holders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Token Transfers
app.get('/token/:network/:address/transfers', async (req, res) => {
  try {
    const { network, address } = req.params;
    const { limit = 100, offset = 0 } = req.query;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const transfers = await callBirdeyeAPI(`/defi/token_transfers`, { 
      address,
      network: network || DEFAULT_NETWORK,
      limit,
      offset
    }, apiKey);
    
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. Wallet Portfolio
app.get('/wallet/:network/:address', async (req, res) => {
  try {
    const { network, address } = req.params;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const portfolio = await callBirdeyeAPI(`/defi/wallet_overview`, { 
      address,
      network: network || DEFAULT_NETWORK
    }, apiKey);
    
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. Wallet Tokens
app.get('/wallet/:network/:address/tokens', async (req, res) => {
  try {
    const { network, address } = req.params;
    const { limit = 100, offset = 0 } = req.query;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const tokens = await callBirdeyeAPI(`/defi/wallet_tokens`, { 
      address,
      network: network || DEFAULT_NETWORK,
      limit,
      offset
    }, apiKey);
    
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 11. NFT Collections
app.get('/nft/collections/:network', async (req, res) => {
  try {
    const { network } = req.params;
    const { limit = 100, offset = 0 } = req.query;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const collections = await callBirdeyeAPI(`/nft/collections`, { 
      network: network || DEFAULT_NETWORK,
      limit,
      offset
    }, apiKey);
    
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 12. NFT Collection Info
app.get('/nft/collection/:network/:address', async (req, res) => {
  try {
    const { network, address } = req.params;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const collectionInfo = await callBirdeyeAPI(`/nft/collection_info`, { 
      collection: address,
      network: network || DEFAULT_NETWORK
    }, apiKey);
    
    res.json(collectionInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 13. NFT Item Info
app.get('/nft/item/:network/:address', async (req, res) => {
  try {
    const { network, address } = req.params;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const itemInfo = await callBirdeyeAPI(`/nft/item_info`, { 
      mint: address,
      network: network || DEFAULT_NETWORK
    }, apiKey);
    
    res.json(itemInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 14. DEX Pools
app.get('/dex/pools/:network', async (req, res) => {
  try {
    const { network } = req.params;
    const { limit = 100, offset = 0 } = req.query;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const pools = await callBirdeyeAPI(`/dex/pools`, { 
      network: network || DEFAULT_NETWORK,
      limit,
      offset
    }, apiKey);
    
    res.json(pools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 15. DEX Pool Info
app.get('/dex/pool/:network/:address', async (req, res) => {
  try {
    const { network, address } = req.params;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    const poolInfo = await callBirdeyeAPI(`/dex/pool_info`, { 
      address,
      network: network || DEFAULT_NETWORK
    }, apiKey);
    
    res.json(poolInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// MCP-specific endpoints

// Get context about a specific token
app.post('/mcp/token', async (req, res) => {
  try {
    const { network = DEFAULT_NETWORK, address, context } = req.body;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    // Get comprehensive token data
    const [tokenInfo, priceInfo, marketInfo, tokenHolders] = await Promise.all([
      callBirdeyeAPI(`/defi/token_info`, { address, network }, apiKey),
      callBirdeyeAPI(`/defi/price`, { address, network }, apiKey),
      callBirdeyeAPI(`/defi/market_data`, { address, network }, apiKey),
      callBirdeyeAPI(`/defi/token_holders`, { address, network, limit: 10 }, apiKey)
    ]);
    
    // Format response in MCP-friendly way
    const response = {
      token: {
        ...tokenInfo.data,
        price: priceInfo.data,
        market: marketInfo.data,
        top_holders: tokenHolders.data.items
      },
      context_type: "token_information",
      network,
      timestamp: new Date().toISOString(),
      query_context: context
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get context about a wallet
app.post('/mcp/wallet', async (req, res) => {
  try {
    const { network = DEFAULT_NETWORK, address, context } = req.body;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    // Get comprehensive wallet data
    const [walletOverview, walletTokens] = await Promise.all([
      callBirdeyeAPI(`/defi/wallet_overview`, { address, network }, apiKey),
      callBirdeyeAPI(`/defi/wallet_tokens`, { address, network, limit: 20 }, apiKey)
    ]);
    
    // Format response in MCP-friendly way
    const response = {
      wallet: {
        overview: walletOverview.data,
        tokens: walletTokens.data.items
      },
      context_type: "wallet_information",
      network,
      timestamp: new Date().toISOString(),
      query_context: context
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get market context
app.post('/mcp/market', async (req, res) => {
  try {
    const { network = DEFAULT_NETWORK, context } = req.body;
    const apiKey = req.headers['x-api-key'] || process.env.BIRDEYE_API_KEY;
    
    // Get top tokens
    const topTokens = await callBirdeyeAPI(`/defi/top_tokens`, { 
      network, 
      limit: 20 
    }, apiKey);
    
    // Format response in MCP-friendly way
    const response = {
      market: {
        top_tokens: topTokens.data.items,
        network,
        timestamp: new Date().toISOString()
      },
      context_type: "market_overview",
      network,
      timestamp: new Date().toISOString(),
      query_context: context
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Birdeye MCP Server running on port ${PORT}`);
});

module.exports = app;