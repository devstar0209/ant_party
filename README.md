# Ant Party Frontend

A Next.js-based frontend application for the Ant Party blockchain project, featuring Web3 integration, multi-language support, and a comprehensive user interface for managing ant colonies, staking, NFTs, and more.

## 🚀 Features

- **Web3 Integration**: Built with Wagmi and RainbowKit for seamless blockchain wallet connections
- **Multi-language Support**: Internationalization (i18n) with support for:
  - English
  - Russian (Русский)
  - Vietnamese (Tiếng Việt)
  - Traditional Chinese (繁體中文)
  - Simplified Chinese (简体中文)
- **Core Functionality**:
  - Ant War gameplay
  - Personal Center with colony management
  - Staking system
  - NFT management and minting
  - Power Foundry
  - Revenue and grant records
  - Upgrade system
  - Wallet integration and management

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.1.2** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Web3 & Blockchain
- **Wagmi 2.14.6** - React Hooks for Ethereum
- **RainbowKit 2.2.1** - Wallet connection UI
- **Viem 2.22.2** - TypeScript Ethereum library
- **Web3 4.16.0** - Ethereum JavaScript API

### UI & Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### State Management & Data
- **TanStack React Query 5.62.15** - Data fetching and caching
- **React Context API** - Global state management

### Utilities
- **next-intl 3.26.3** - Internationalization
- **BigNumber.js** - Arbitrary precision arithmetic
- **Moment.js** - Date manipulation
- **React Number Format** - Number formatting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ant_party_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Add your environment variables here
   # Example:
   # NEXT_PUBLIC_CHAIN_ID=56
   # NEXT_PUBLIC_RPC_URL=your_rpc_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## 📁 Project Structure

```
ant_party_frontend/
├── app/                    # Next.js App Router pages
│   └── [locale]/          # Internationalized routes
│       ├── ant-war/       # Ant War game page
│       ├── grant-record/  # Grant record page
│       ├── personal-center/ # User dashboard
│       ├── power-foundry/ # Power foundry page
│       ├── revenue-record/ # Revenue tracking
│       ├── staking/       # Staking interface
│       └── upgrade/       # Upgrade system
├── components/             # React components
│   ├── common/           # Shared components (Header, Footer, Buttons)
│   ├── ui/               # UI component library
│   └── [Dialogs]        # Various dialog components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
│   ├── useContracts.ts  # Smart contract interactions
│   ├── useHooks.ts      # Custom business logic hooks
│   └── useWeb3.ts       # Web3 wallet hooks
├── i18n/                 # Internationalization configuration
├── lib/                  # Utility libraries
│   ├── abis/            # Smart contract ABIs
│   ├── config.ts        # Application configuration
│   └── utils.ts         # Helper functions
├── messages/             # Translation files
│   ├── en.json
│   ├── ru.json
│   ├── vi.json
│   ├── zh-CN.json
│   └── zh-TW.json
└── public/               # Static assets
    └── images/          # Image resources
```

## ⛓️ Blockchain Configuration

The application supports multiple blockchain networks:

- **BSC Mainnet** (Chain ID: 56) - Production network
- **BSC Testnet** (Chain ID: 97) - Testing network
- **Ethereum Mainnet** (Chain ID: 1) - Alternative network

Contract addresses and configurations are managed in `lib/config.ts`. The application integrates with:

- **AntParty Contract** - Main protocol contract
- **NFT Factory** - NFT minting and management
- **Vesting Contract** - Token vesting functionality
- **Distributor Contract** - Reward distribution
- **Meme Token** - Native token contract
- **USDT Token** - Stablecoin integration

## 🌍 Internationalization

The application uses `next-intl` for internationalization. Supported languages are configured in the routing middleware. To add a new language:

1. Add translation file in `messages/[locale].json`
2. Update the language dropdown in the main page
3. Configure routing in `i18n/routing.ts`

## 🎨 Styling

The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.ts`. Custom styles and global CSS are in `app/[locale]/globals.css`.

## 🔧 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain component modularity
- Follow the existing file structure

### Component Guidelines
- Keep components focused and reusable
- Use TypeScript interfaces for props
- Implement proper error handling
- Add loading states for async operations

### Web3 Integration
- Always handle wallet connection states
- Implement proper error handling for transactions
- Use React Query for data fetching and caching
- Follow Wagmi best practices for contract interactions

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For contributions, please contact the project maintainers.

## 📞 Support

For issues or questions, please contact the development team.

---

**Note**: This is a frontend prototype for the Ant Party project. Ensure all environment variables and contract addresses are properly configured before deployment.
