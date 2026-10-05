import makeWASocket, {
  useMultiFileAuthState
} from "@whiskeysockets/baileys";

import pino from "pino";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import readline from "readline";

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

    try {
      const modulo = await import(pathToFileURL(ruta));

      if (modulo.default?.command && modulo.default?.execute) {
        plugins.set(
          modulo.default.command,
          modulo.default
        );

        console.log(`✅ Plugin cargado: #${modulo.default.command}`);
      }
    } catch (error) {
      console.error(`❌ Error cargando ${archivo}:`, error);
    }
  }
}

function preguntar(texto) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(texto, respuesta => {
      rl.close();
      resolve(respuesta.trim());
    });
  });
}

async function iniciarBot() {
  console.log("");
  console.log("╭────────────────────────╮");
  console.log("│      NEXORA BOT        │");
  console.log("│    INICIANDO... 🚀     │");
  console.log("╰────────────────────────╯");
  console.log("");

  await cargarPlugins();

  console.log("");
  console.log(`📦 Plugins cargados: ${plugins.size}`);
  console.log("");

  const { state, saveCreds } =
    await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  // Código de vinculación
  if (!state.creds.registered) {
    try {
      const numero = await preguntar(
        "📱 Escribe tu número con código de país (ejemplo: 51987654321): "
      );

      if (!numero) {
        console.log("❌ No se recibió ningún número.");
        process.exit(1);
      }

      const codigo = await sock.requestPairingCode(numero);

      const codigoFormateado =
        codigo.length === 8
          ? `${codigo.slice(0, 4)}-${codigo.slice(4)}`
          : codigo;

      console.log("");
      console.log("╭────────────────────────────╮");
      console.log("│       NEXORA BOT           │");
      console.log("│                            │");
      console.log("│    TU CÓDIGO ES:           │");
      console.log(`│       ${codigoFormateado}           │`);
      console.log("│                            │");
      console.log("╰────────────────────────────╯");
      console.log("");
      console.log("📲 Abre WhatsApp en tu teléfono.");
      console.log("➡️ Dispositivos vinculados");
      console.log("➡️ Vincular dispositivo");
      console.log("➡️ Vincular con número de teléfono");
      console.log("➡️ Introduce el código mostrado arriba.");
      console.log("");
    } catch (error) {
      console.error("❌ No se pudo generar el código:", error);
    }
  }

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("");
      console.log("╭────────────────────╮");
      console.log("│    NEXORA BOT      │");
      console.log("│    CONECTADO ✅     │");
      console.log("╰────────────────────╯");
      console.log("");
    }

    if (connection === "close") {
      console.log("");
      console.log("❌ Conexión cerrada.");
      console.log("🔄 Reinicia el bot para volver a conectarlo.");
      console.log("");
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

    if (!comando) return;

    const plugin = plugins.get(comando);

    if (!plugin) {
      await sock.sendMessage(
        msg.key.remoteJid,
        {
          text: `❌ No existe el comando #${comando}`
        },
        {
          quoted: msg
        }
      );

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

      await sock.sendMessage(
        msg.key.remoteJid,
        {
          text: "❌ Ocurrió un error al ejecutar este comando."
        },
        {
          quoted: msg
        }
      );
    }
  });
}

iniciarBot().catch(error => {
  console.error("❌ Error iniciando NEXORA BOT:", error);
});
