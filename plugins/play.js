export default {
  command: "play",

  description: "Busca una canción.",

  async execute({ sock, msg, jid, args }) {
    const consulta = args.join(" ").trim();

    if (!consulta) {
      return await sock.sendMessage(jid, {
        text:
`╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ PLAY

₍ᐢ..ᐢ₎ ᜒ Falta una búsqueda.

〄 Usa:
#play nombre de la canción

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯`
      }, { quoted: msg });
    }

    await sock.sendMessage(jid, {
      text:
`🎵 PLAY

🔎 Buscando:
${consulta}

⏳ Sistema de música preparado.

La descarga/reproducción se conectará después.`
    }, {
      quoted: msg
    });
  }
};
