# Publishing to GitHub

Follow these steps to publish your Birdeye MCP Server to a new public GitHub repository:

## 1. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com/) and sign in to your account
2. Click on the "+" button in the top-right corner and select "New repository"
3. Name your repository (e.g., "birdeye-mcp-server")
4. Add a description: "Model Context Protocol server for Birdeye APIs"
5. Keep it as a Public repository
6. Do not initialize the repository with any files (no README, .gitignore, or license)
7. Click "Create repository"

## 2. Prepare Your Local Repository

1. Create a new directory for your project and navigate to it:
   ```bash
   mkdir birdeye-mcp-server
   cd birdeye-mcp-server
   ```

2. Download all the files you've created in this conversation:
   - server.js
   - package.json
   - .env.example
   - README.md
   - Dockerfile
   - docker-compose.yml
   - .dockerignore
   - .gitignore
   - Create a .github/workflows directory and add the node.js.yml file

3. Initialize a new Git repository:
   ```bash
   git init
   ```

4. Add all files to staging:
   ```bash
   git add .
   ```

5. Commit the files:
   ```bash
   git commit -m "Initial commit: Birdeye MCP Server implementation"
   ```

## 3. Connect and Push to GitHub

1. Connect your local repository to the GitHub repository:
   ```bash
   git remote add origin https://github.com/your-username/birdeye-mcp-server.git
   ```
   (Replace "your-username" with your actual GitHub username)

2. Push your code to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## 4. Verify Repository on GitHub

1. Refresh your GitHub repository page
2. Ensure all files are visible in the repository
3. Check that the GitHub Actions workflow has been triggered (visit the "Actions" tab)

## 5. Set Up GitHub Pages (Optional)

If you want to create a project website:

1. Go to Settings > Pages
2. Select "main" branch as source
3. Choose "/ (root)" as folder
4. Click "Save"

This will create a project website at `https://your-username.github.io/birdeye-mcp-server/`

## 6. Add Repository Topics (Optional)

Add relevant topics to your repository to improve discoverability:

1. Go to your repository page
2. Click on the "gear" icon next to "About"
3. Add topics such as: birdeye, mcp, model-context-protocol, solana, blockchain, api, server
4. Click "Save changes"
