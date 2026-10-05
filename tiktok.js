export default {
  command: "tiktok",

  description: "Descarga contenido de TikTok.",

  async execute({ sock, msg, jid, args }) {
    const url = args[0];

    if (!url) {
      return await sock.sendMessage(jid, {
        text:
`╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ TIKTOK

₍ᐢ..ᐢ₎ ᜒ Falta un enlace.

〄 Usa:
#tiktok enlace_de_tiktok

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯`
      }, {
        quoted: msg
      });
    }

    await sock.sendMessage(jid, {
      text:
`🎬 TIKTOK

🔎 Enlace recibido:
${url}

⏳ Sistema de descarga preparado.

La descarga real se conectará después.`
    }, {
      quoted: msg
    });
  }
};
