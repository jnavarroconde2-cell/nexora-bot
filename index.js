import makeWASocket, {
  useMultiFileAuthState
} from "@whiskeysockets/baileys";

import pino from "pino";

async function iniciarBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async ({ connection }) => {
    if (connection === "open") {
      console.log("╭────────────────────╮");
      console.log("│   NEXORA BOT       │");
      console.log("│   CONECTADO ✅      │");
      console.log("╰────────────────────╯");
    }

    if (connection === "close") {
      console.log("❌ Conexión cerrada.");
      console.log("🔄 Reinicia el bot para volver a conectar.");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];

    if (!msg?.message) return;
    if (msg.key.fromMe) return;

    const texto =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    if (texto === "#ping") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "🏓 PONG!\nNEXORA BOT está funcionando."
      });
    }
  });
}

iniciarBot();
