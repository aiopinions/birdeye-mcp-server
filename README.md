# Birdeye MCP Server
## Integration with Claude or Other MCP-Compatible Agents

To use the Birdeye MCP Server with Claude or any agent that supports the Model Context Protocol (MCP), you can provide the following configuration file (e.g., `claude-mcp-server-config.json`) to your agent:

```json
{
  "servers": [
    {
      "name": "Birdeye MCP Server",
      "description": "Model Context Protocol server for Birdeye APIs",
      "command": "node",
      "args": ["server.js"],
      "env": {
        "BIRDEYE_API_KEY": "your_birdeye_api_key_here",
        "PORT": "3000"
      },
      "endpoints": [
        {"path": "/mcp/token", "method": "POST", "description": "Get comprehensive token context"},
        {"path": "/mcp/wallet", "method": "POST", "description": "Get comprehensive wallet context"},
        {"path": "/mcp/market", "method": "POST", "description": "Get market overview context"}
      ]
    }
  ]
}
```
