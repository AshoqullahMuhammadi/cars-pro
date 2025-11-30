# GitHub Pages Deployment Guide

## Important Note

⚠️ **GitHub Pages Limitations:**
- GitHub Pages only serves **static files** (HTML, CSS, JS)
- **API routes will NOT work** on GitHub Pages (NextAuth, image upload, admin features)
- The public-facing website (car showcase) will work perfectly
- Admin features require a server (consider Vercel/Netlify for full functionality)

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: `GitHub Actions` (not a branch)
4. Save the settings

### 2. Push Your Code

```bash
# Add all files
git add .

# Commit
git commit -m "Add GitHub Pages deployment configuration"

# Push to main branch
git push origin main
```

### 3. Automatic Deployment

Once you push, GitHub Actions will:
1. ✅ Build your Next.js app as static files
2. ✅ Deploy to GitHub Pages automatically
3. ✅ Your site will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### 4. Custom Domain Setup (Later)

When you're ready to add a custom domain:

1. In GitHub repository → **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `example.com`)
3. Add a `CNAME` file in the `public` folder with your domain:
   ```
   example.com
   ```
4. Update your DNS records:
   - **Type**: `CNAME`
   - **Name**: `@` or `www`
   - **Value**: `YOUR_USERNAME.github.io`

## What Works on GitHub Pages

✅ **Public Website:**
- Homepage with car showcase
- Car detail pages
- About, Services, Contact pages
- Theme switching (dark/light)
- Responsive design
- All static content

❌ **Won't Work (Requires Server):**
- Admin authentication
- Image upload
- Adding/editing/deleting cars via admin panel
- API routes

## Alternative: Full-Featured Hosting

For **complete functionality** including admin features, consider:

- **Vercel** (Recommended for Next.js): https://vercel.com
- **Netlify**: https://netlify.com
- **Railway**: https://railway.app

These platforms support:
- ✅ API routes
- ✅ Server-side features
- ✅ File uploads
- ✅ Authentication
- ✅ Custom domains

## Build Scripts

- `npm run build` - Standard Next.js build
- `npm run build:static` - Static export for GitHub Pages

## Troubleshooting

### Build Fails
- Check GitHub Actions logs in your repository
- Ensure all dependencies are in `package.json`
- Verify Node.js version (18+) in workflow file

### Pages Not Loading
- Wait a few minutes after push (deployment takes time)
- Check repository Settings → Pages for deployment status
- Verify the workflow completed successfully

### Images Not Showing
- Ensure images are in `public/` folder
- Check image paths are relative (start with `/`)
- Verify `next.config.js` has `unoptimized: true` for static export

