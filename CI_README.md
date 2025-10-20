# CI/CD Configuration

This repository uses GitHub Actions for continuous integration and deployment.

## Workflows

### 1. Auto Build (`auto-build.yml`)

**Trigger**: Automatically runs when changes are pushed to `src/`, `package.json`, or `tsconfig.json`

**What it does**:
- Installs dependencies
- Builds the library (`yarn prepare`)
- Commits the built `lib/` directory back to the repository
- Uses `[skip ci]` tag to prevent infinite loops

**Why**: This ensures the `lib/` directory is always up-to-date and available for Git-based dependencies (required for EAS Build).

### 2. Build and Release (`build-and-release.yml`)

**Trigger**:
- On every push to `master`/`main` (runs build and tests)
- On Git tags starting with `v*` (creates GitHub Release)

**What it does**:
- Runs type checking and linting
- Builds the library
- Archives build artifacts
- **On tags**: Creates GitHub Release with tarball
- **On tags**: Publishes to GitHub Packages (optional)

## Usage for EAS Build

Since this fork uses Git as a dependency source, the `lib/` directory must be committed to Git. GitHub Actions handles this automatically.

### In your main project:

```json
{
  "dependencies": {
    "@rob117/react-native-selectable-text": "github:mclamee/react-native-selectable-text#master"
  }
}
```

### For specific versions:

```json
{
  "dependencies": {
    "@rob117/react-native-selectable-text": "github:mclamee/react-native-selectable-text#v2.1.0"
  }
}
```

## Creating Releases

To create a new release:

```bash
# Update version in package.json
npm version patch  # or minor, major

# Push with tags
git push origin master --tags
```

GitHub Actions will automatically:
1. Build the library
2. Create a GitHub Release
3. Publish to GitHub Packages (if configured)

## GitHub Packages (Optional)

To use GitHub Packages instead of direct Git dependency:

1. In your main project, create `.npmrc`:
```
@mclamee:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Update dependency:
```json
{
  "dependencies": {
    "@mclamee/react-native-selectable-text": "^2.1.0"
  }
}
```

3. For EAS Build, add to `eas.json`:
```json
{
  "build": {
    "production": {
      "env": {
        "GITHUB_TOKEN": "@github_token"
      }
    }
  }
}
```

4. Set secret in EAS:
```bash
eas secret:create --scope project --name GITHUB_TOKEN --value "your-github-token"
```

## Benefits

✅ **EAS Build Compatible**: Built files are always in Git
✅ **Automated**: No manual build and commit needed
✅ **Version Control**: Easy to track and rollback
✅ **CI/CD Ready**: Automated testing and releases
✅ **Clean Development**: Local development doesn't need to commit build artifacts manually
