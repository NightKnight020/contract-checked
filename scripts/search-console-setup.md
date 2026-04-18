# Google Search Console API Setup

## Step 1: Enable the API
1. Go to: https://console.cloud.google.com/
2. Create a new project called "Contract Checked"
3. Go to APIs & Services → Library
4. Search "Google Search Console API" → Enable it

## Step 2: Create Service Account
1. Go to APIs & Services → Credentials
2. Click "Create Credentials" → Service Account
3. Name: "contractchecked-seo"
4. Role: Owner (or Editor)
5. Click Done
6. Click the service account → Keys tab → Add Key → JSON
7. Download the JSON key file

## Step 3: Add Service Account to Search Console
1. Go to search.google.com/search-console
2. Settings → Users and Permissions → Add User
3. Enter the service account email (looks like: contractchecked-seo@your-project.iam.gserviceaccount.com)
4. Permission: Full

## Step 4: Add to Vercel Environment Variables
Add these to Vercel project settings:
- GOOGLE_SERVICE_ACCOUNT_EMAIL = (from JSON file: client_email)
- GOOGLE_PRIVATE_KEY = (from JSON file: private_key)
- GOOGLE_SITE_URL = https://contractchecked.com

## Step 5: Share JSON key contents with Maruti
Once you have the JSON file, share the contents and I'll build:
- /api/seo-report route that fetches your rankings
- Weekly automated ranking report sent to support@contractchecked.com
- Dashboard showing top keywords, clicks, impressions
