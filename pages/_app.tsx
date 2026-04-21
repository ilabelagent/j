import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { mainnet, arbitrum, polygon, base } from 'viem/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '605e54c8d2341935c325c86801550993'

const metadata = {
  name: 'Sentinel Omnilogic',
  description: 'Institutional DeFi Integrity Suite',
  url: 'https://omnilogic.io',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, polygon, base] as [any, ...any[]]
const config = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ 
  wagmiConfig: config, 
  projectId, 
  themeVariables: {
    '--w3m-accent': '#10b981',
    '--w3m-border-radius-master': '1px'
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
