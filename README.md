# DXP React Components Asset 2.0

A comprehensive collection of reusable React components built with modern web technologies for enterprise-grade applications.

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tools**: Vite, ESBuild
- **Development**: Hot Module Replacement (HMR)
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation

## ✨ Features

- 🎨 **50+ Modern UI Components** with Tailwind CSS and Radix UI
- 🔧 **Full TypeScript Support** for type safety
- 🚀 **Lightning Fast Development** with Vite HMR
- 📱 **Responsive Design** that works on all devices
- 🛠️ **Comprehensive Component Library** with interactive playground
- 🔒 **Type-safe Database Operations** with Drizzle ORM
- 🎭 **Component Variants** using class-variance-authority
- 🌙 **Dark/Light Mode Support** (coming soon)
- 📖 **Interactive Component Documentation**

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (optional for frontend-only development)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/sreenivasvaluelabs/DXPReactComponentsAsset2.0.git
cd DXPReactComponentsAsset2.0
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/your_database
```

4. **Set up the database (optional):**
```bash
npm run db:push
```

5. **Start the development server:**
```bash
npm run dev
```

🎉 **The application will be available at `http://localhost:5000`**

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push database schema changes |

## 📁 Project Structure

```
├── client/                   # Frontend React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── library/      # 🎨 Custom component library (50+ components)
│   │   │   ├── ui/           # 🧩 Radix UI base components
│   │   │   ├── layout/       # 📐 Layout components (Header, Footer)
│   │   │   └── playground/   # 🎮 Interactive component testing
│   │   ├── hooks/            # 🪝 Custom React hooks
│   │   ├── lib/              # 🛠️ Utility functions & configurations
│   │   └── pages/            # 📄 Page components
├── server/                   # Backend Express application
│   ├── index.ts             # 🚀 Main server entry point
│   ├── routes.ts            # 🛣️ API route definitions
│   ├── storage.ts           # 💾 Database storage interface
│   └── vite.ts             # ⚡ Vite development setup
├── shared/                   # 🤝 Shared types and schemas
│   └── schema.ts            # 🗄️ Database schema definitions
└── migrations/              # 📊 Database migrations
```

## 🎨 Component Library

### 📋 Form Components
- **Button** - Multiple variants (primary, secondary, destructive, etc.)
- **Input** - Text inputs with validation
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Boolean input
- **Radio Group** - Single selection from options
- **Switch** - Toggle switch
- **Form** - Complete form handling with validation

### 📊 Data Display
- **Table** - Sortable, filterable data tables
- **Card** - Content containers
- **Badge** - Status indicators
- **Avatar** - User profile images
- **Progress** - Progress bars and indicators
- **Chart** - Data visualization (coming soon)

### 💬 Feedback Components
- **Alert** - Contextual messages
- **Toast** - Temporary notifications
- **Dialog** - Modal dialogs
- **Popover** - Contextual overlays
- **Tooltip** - Helpful hints
- **Skeleton** - Loading placeholders

### 🧭 Navigation Components
- **Breadcrumb** - Navigation hierarchy
- **Pagination** - Page navigation
- **Tabs** - Tab navigation
- **Navigation Menu** - Main navigation
- **Sidebar** - Side navigation panel
- **Command** - Command palette

### 🎪 Interactive Components
- **Accordion** - Collapsible content
- **Carousel** - Image/content sliders
- **Collapsible** - Show/hide content
- **Drawer** - Side panels
- **Sheet** - Overlay panels
- **Hover Card** - Hover interactions

### 🎯 Specialized Components
- **Calendar** - Date selection
- **Color Picker** - Color selection
- **File Upload** - File handling
- **Rating** - Star ratings
- **Slider** - Range selection
- **Countdown Timer** - Time displays
- **Stepper** - Step-by-step processes

## 🛠️ Development Guide

### Adding New Components

1. **Create component** in `client/src/components/library/`
2. **Follow naming convention**: `kebab-case.tsx`
3. **Add TypeScript interfaces** for props
4. **Include Tailwind classes** for styling
5. **Export from index** (if applicable)

Example component structure:
```typescript
interface ComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Component({ variant = 'primary', size = 'md', children }: ComponentProps) {
  return (
    <div className={cn("base-styles", {
      "variant-styles": variant === 'primary',
      "size-styles": size === 'lg'
    })}>
      {children}
    </div>
  );
}
```

### Database Operations

Uses **Drizzle ORM** for type-safe database operations:

```typescript
// Schema definition (shared/schema.ts)
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  // ... other fields
});

// Usage in application
const user = await storage.getUserByUsername(username);
```

### Styling Guidelines

- **Primary**: Tailwind CSS utility classes
- **Components**: Radix UI primitives
- **Variants**: class-variance-authority (CVA)
- **Theme**: CSS custom properties
- **Responsive**: Mobile-first approach

## 🚀 Deployment

### 🌟 **Netlify (Recommended - Simplest)**

**Frontend-only deployment with ZERO backend setup required!**

```bash
# Build for Netlify
npm run build:frontend
```

**Deploy Options:**
1. **GitHub Integration**: Connect repository → Auto-deploy
2. **Drag & Drop**: Upload `dist/public` folder to [netlify.com/drop](https://netlify.com/drop)

**Required Environment Variables**: **NONE!** ✨  
**Backend Required**: **NO!** ✨  

👉 **See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for complete guide**

### 🔄 **Vercel (Full-Stack)**

```bash
# Build everything
npm run build

# Deploy with Vercel CLI
npx vercel --prod
```

**Environment Variables:**
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
```

### 🐳 **Docker (Self-Hosted)**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### 📊 **Deployment Comparison**

| Platform | Setup Time | Backend | Database | Cost |
|----------|------------|---------|----------|------|
| **Netlify Static** | 2 minutes | ❌ | ❌ | Free |
| **Vercel Full-Stack** | 5 minutes | ✅ | Optional | Free tier |
| **Railway/Heroku** | 10 minutes | ✅ | ✅ | Paid |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-component`)
3. **Commit** your changes (`git commit -m 'Add amazing component'`)
4. **Push** to the branch (`git push origin feature/amazing-component`)
5. **Open** a Pull Request

### Development Setup

1. Follow the installation steps above
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit PR with detailed description

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/sreenivasvaluelabs/DXPReactComponentsAsset2.0/issues)
- 💡 **Feature Requests**: [Open an issue](https://github.com/sreenivasvaluelabs/DXPReactComponentsAsset2.0/issues)
- 📧 **Questions**: [Discussions](https://github.com/sreenivasvaluelabs/DXPReactComponentsAsset2.0/discussions)

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Shadcn/ui** for component inspiration
- **Vite** for blazing fast development experience

---

**Made with ❤️ by Value Labs**

⭐ **Star this repo** if you find it helpful!
