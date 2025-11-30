# GitHub Setup Instructions

## Quick Setup Commands

After creating a repository on GitHub, run these commands:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/car-showcase.git

# Rename branch to main if needed (if your default is master)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Alternative: Using SSH

If you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/car-showcase.git
git branch -M main
git push -u origin main
```

## Important Notes

⚠️ **Before pushing, make sure you have:**

1. ✅ Created `.env.local` file with your secrets (this is gitignored)
2. ✅ Set up your `NEXTAUTH_SECRET` environment variable
3. ✅ Created an admin user using `node scripts/create-admin.js`

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

For production, generate a strong secret:
```bash
openssl rand -base64 32
```

## After Pushing

Your code is now on GitHub! You can:
- Share the repository with others
- Deploy to Vercel, Netlify, or other platforms
- Set up CI/CD pipelines
- Collaborate with team members

