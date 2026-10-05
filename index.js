import makeWASocket, {
  useMultiFileAuthState
} from "@whiskeysockets/baileys";

import pino from "pino";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PREFIX = "#";
const plugins = new Map();

async function cargarPlugins() {
  const carpeta = path.join(__dirname, "plugins");

  const archivos = fs.readdirSync(carpeta)
    .filter(archivo => archivo.endsWith(".js"));

  for (const archivo of archivos) {
    const ruta = path.join(carpeta, archivo);
    const modulo = await import(pathToFileURL(ruta));

    if (modulo.default?.command && modulo.default?.execute) {
      plugins.set(
        modulo.default.command,
        modulo.default
      );

      console.log(`✅ Plugin cargado: #${modulo.default.command}`);
    }
  }
}

async function iniciarBot() {
  await cargarPlugins();

  const { state, saveCreds } =
    await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") {
      console.log("");
      console.log("╭────────────────────╮");
      console.log("│    NEXORA BOT      │");
      console.log("│    CONECTADO ✅     │");
      console.log("╰────────────────────╯");
      console.log("");
    }

    if (connection === "close") {
      console.log("❌ Conexión cerrada.");
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

    if (!texto.startsWith(PREFIX)) return;

    const partes = texto
      .slice(PREFIX.length)
      .trim()
      .split(/\s+/);

    const comando = partes.shift()?.toLowerCase();
    const args = partes;

    const plugin = plugins.get(comando);

    if (!plugin) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ No existe el comando #${comando}`
      });

      return;
    }

    try {
      await plugin.execute({
        sock,
        msg,
        jid: msg.key.remoteJid,
        args,
        comando
      });
    } catch (error) {
      console.error(
        `❌ Error en #${comando}:`,
        error
      );
    }
  });
}

iniciarBot();
