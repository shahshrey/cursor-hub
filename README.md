# Cursor Hub

Your central platform for discovering, previewing, and downloading 525+ community-curated Cursor IDE resources. Find commands, rules, MCP tools, and shell scripts to supercharge your AI-assisted development workflow.

**[🚀 Try it live](https://cursor-hub-shahshreys-projects.vercel.app/)** | **[Browse resources on GitHub](https://github.com/shahshrey/cursor-hub/tree/main/cursor-resources)**

## ✨ What You Get

### 🔍 Powerful Discovery
- **525+ Resources** - Professionally organized commands, rules, MCP tools, and shell scripts
- **Instant Search** - Find what you need in seconds across titles, descriptions, and content
- **Smart Filtering** - Filter by type and category with live result counts
- **Popular & Trending** - See what the community loves most

### 💾 Preview & Download
- **Syntax-Highlighted Previews** - View full resource content before downloading
- **One-Click Downloads** - Get any resource instantly with a single click
- **Copy to Clipboard** - Quick-copy code snippets directly from previews

### 🎯 Personal Organization
- **Save Favorites** - Bookmark resources you use frequently (sign in required)
- **Custom Filter Presets** - Save your common searches for instant access
- **Share Filter Views** - Send filtered links to teammates
- **Personal Dashboard** - Access all your favorites in one place

### ⚡ Power User Features
- **Keyboard Shortcuts** - Navigate like a pro (`/` search, `ESC` clear, `Ctrl+S` save)
- **Curated Stacks** - Pre-built resource bundles for DevOps, AI workflows, and more
- **Real-Time Stats** - See download counts and track popular resources

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- A Clerk account (free at [clerk.com](https://clerk.com))

### Installation

```bash
git clone https://github.com/shahshrey/cursor-hub.git
cd cursor-hub
npm install
```

### Setup

1. **Configure environment variables** - Create `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

2. **Index the resources**:

```bash
npm run resources:index
```

3. **Start the database** (optional for local dev):

```bash
npm run db:start
```

4. **Run the app**:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and start exploring!

## 📂 What's Inside

All resources are available as markdown files in the [`cursor-resources/`](https://github.com/shahshrey/cursor-hub/tree/main/cursor-resources) directory:

```
cursor-resources/
├── commands/     # 254 automation commands for workflows
├── rules/        # 111 coding rules and best practices  
├── mcps/         # 55 Model Context Protocol tools
└── hooks/        # 39 shell scripts for git and automation
```

You can browse, download, or contribute directly via [GitHub](https://github.com/shahshrey/cursor-hub/tree/main/cursor-resources).

## 🤝 Contributing

Want to add your own Cursor resources? All resources live in the [`cursor-resources/`](https://github.com/shahshrey/cursor-hub/tree/main/cursor-resources) directory on GitHub. Feel free to submit a pull request with your commands, rules, MCP tools, or hooks!

## 📄 License

MIT

---

Made with ❤️ for the Cursor IDE community