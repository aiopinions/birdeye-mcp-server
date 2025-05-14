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
