# Turkey Creek Cycles - GitHub Pages Multi-Branch Setup

This repository contains the Turkey Creek Cycles portfolio with static HTML designs and React applications organized across multiple branches.

## Repository Structure

- **`main` branch**: Static HTML portfolio showcase with Document Hub (index.html)
- **`react-app-1` branch**: First React application
- **`react-app-2` branch**: Second React application

## Prerequisites

- Git installed on macOS
- Node.js installed
- pnpm package manager (`npm install -g pnpm`)
- GitHub account with repository access

## Step-by-Step Setup

### 1. Initial Repository Setup (if not already done)

```bash
# Navigate to your project directory
cd /path/to/your/TurkeyCreek\ \(TCC\)

# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit - static portfolio and document hub"

# Set main branch
git branch -M main

# Add remote origin (replace with your GitHub username/repo)
git remote add origin https://github.com/yourusername/turkey-creek-cycles.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages for Main Branch

1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select "Deploy from a branch"
5. Select **main** branch and **/ (root)** folder
6. Click **Save**
7. Your static portfolio will be available at: `https://yourusername.github.io/turkey-creek-cycles`

### 3. Create React App Branch 1

```bash
# Ensure you're on main branch
git checkout main

# Create and switch to react-app-1 branch
git checkout -b react-app-1

# Remove static files (keep only what you need for React)
rm -rf *.html hub-images _RnD

# Create React app using pnpm
pnpm create react-app . --template typescript
# OR if you prefer JavaScript:
# pnpm create react-app .

# Install dependencies
pnpm install

# Create production build
pnpm run build

# Add homepage field to package.json for GitHub Pages
# Edit package.json and add:
# "homepage": "https://yourusername.github.io/turkey-creek-cycles"

# Commit React app
git add .
git commit -m "Add React App 1 - TCC interactive application"

# Push to GitHub
git push -u origin react-app-1
```

### 4. Create React App Branch 2

```bash
# Switch back to main branch
git checkout main

# Create and switch to react-app-2 branch
git checkout -b react-app-2

# Remove static files
rm -rf *.html hub-images _RnD

# Create second React app
pnpm create react-app . --template typescript
# OR: pnpm create react-app .

# Install dependencies
pnpm install

# Add homepage field to package.json
# "homepage": "https://yourusername.github.io/turkey-creek-cycles"

# Create production build
pnpm run build

# Commit React app
git add .
git commit -m "Add React App 2 - TCC dashboard application"

# Push to GitHub
git push -u origin react-app-2
```

### 5. Setup GitHub Pages for React Branches

For each React branch, you need to deploy the `build` folder:

```bash
# On react-app-1 branch
git checkout react-app-1

# Install gh-pages for deployment
pnpm add --save-dev gh-pages

# Add deployment scripts to package.json:
# "scripts": {
#   "predeploy": "pnpm run build",
#   "deploy": "gh-pages -d build -b react-app-1-deploy"
# }

# Deploy to GitHub Pages
pnpm run deploy

# Repeat for react-app-2 branch
git checkout react-app-2
pnpm add --save-dev gh-pages
# Add scripts with different branch name:
# "deploy": "gh-pages -d build -b react-app-2-deploy"
pnpm run deploy
```

### 6. Update Main Branch with React App Links

```bash
# Switch back to main branch
git checkout main

# Edit index.html to update React app placeholder links
# Replace placeholder onclick handlers with:
# onclick="window.open('https://yourusername.github.io/turkey-creek-cycles/react-app-1-deploy', '_blank')"
# onclick="window.open('https://yourusername.github.io/turkey-creek-cycles/react-app-2-deploy', '_blank')"

# Commit changes
git add index.html
git commit -m "Update React app links to deployed GitHub Pages URLs"
git push origin main
```

## Branch Management Commands

```bash
# List all branches
git branch -a

# Switch between branches
git checkout main
git checkout react-app-1
git checkout react-app-2

# Pull latest changes
git pull origin branch-name

# Push changes
git push origin branch-name
```

## Deployment URLs

After setup, your sites will be available at:
- **Main Portfolio**: `https://yourusername.github.io/turkey-creek-cycles`
- **React App 1**: `https://yourusername.github.io/turkey-creek-cycles/react-app-1-deploy`
- **React App 2**: `https://yourusername.github.io/turkey-creek-cycles/react-app-2-deploy`

## Development Workflow

1. **Static changes**: Work on `main` branch, commit and push
2. **React App 1**: Switch to `react-app-1`, make changes, run `pnpm run deploy`
3. **React App 2**: Switch to `react-app-2`, make changes, run `pnpm run deploy`

## Troubleshooting

- **GitHub Pages not updating**: Wait 5-10 minutes for deployment
- **React app not loading**: Check homepage field in package.json
- **Build failures**: Ensure all dependencies are installed with `pnpm install`
- **pnpm not found**: Install globally with `npm install -g pnpm`

## Notes

- Each branch is independent - changes don't affect other branches
- React apps are deployed to separate GitHub Pages branches for isolation
- Main branch serves as the permanent portfolio showcase
- Always commit and push changes to preserve work across branches