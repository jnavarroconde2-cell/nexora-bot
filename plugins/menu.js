export default {
  command: "menu",

  description: "Muestra el menú principal del bot.",

  async execute({ sock, msg, jid }) {
    const menu = `
╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ CATEGORÍA SISTEMA

₍ᐢ..ᐢ₎ ᜒ #menu
〄 Muestra este menú.

₍ᐢ..ᐢ₎ ᜒ #ping
〄 Comprueba si el bot está activo.

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯

╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ CATEGORÍA MULTIMEDIA

₍ᐢ..ᐢ₎ ᜒ #play
〄 Busca y reproduce música.

₍ᐢ..ᐢ₎ ᜒ #tiktok
〄 Descarga contenido de TikTok.

₍ᐢ..ᐢ₎ ᜒ #sticker
〄 Convierte imágenes en stickers.

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯

╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ CATEGORÍA INTELIGENCIA ARTIFICIAL

₍ᐢ..ᐢ₎ ᜒ #ia
〄 Habla con la inteligencia artificial.

₍ᐢ..ᐢ₎ ᜒ #imagine
〄 Genera imágenes mediante IA.

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯

╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ CATEGORÍA ECONOMÍA

₍ᐢ..ᐢ₎ ᜒ #work
〄 Trabaja para ganar monedas.

₍ᐢ..ᐢ₎ ᜒ #daily
〄 Reclama tu recompensa diaria.

₍ᐢ..ᐢ₎ ᜒ #balance
〄 Consulta tu saldo.

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯

╭─「 INFORMACIÓN 」
│ Bot: NEXORA BOT
│ Web: Próximamente
│ Tipo: WhatsApp Bot
│ Activo: 🟢
│ Usuarios: Global
│ Cmds: 10
╰──────────────

✧ Prefijo: #
✧ Versión: 1.0.0
`;

    await sock.sendMessage(jid, {
      text: menu
    }, {
      quoted: msg
    });
  }
};
