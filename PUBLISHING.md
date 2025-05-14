# Publishing Birdeye MCP Server

## Steps

1. Ensure all code is committed and pushed to GitHub.
2. Update version in `package.json` if needed.
3. Tag the release:
   ```
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```
4. Publish Docker image if required.
5. Update documentation as needed.
