export default {
  command: "imagine",

  description: "Genera imágenes mediante IA.",

  async execute({ sock, msg, jid, args }) {
    const prompt = args.join(" ").trim();

    if (!prompt) {
      return await sock.sendMessage(jid, {
        text:
`╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ IMAGINE

₍ᐢ..ᐢ₎ ᜒ Falta una descripción.

〄 Usa:
#imagine descripción de la imagen

〄 Ejemplo:
#imagine un gato astronauta en Marte

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯`
      }, {
        quoted: msg
      });
    }

    await sock.sendMessage(jid, {
      text:
`🎨 NEXORA IMAGINE

📝 Descripción recibida:

${prompt}

⏳ Sistema de generación preparado.

La generación de imágenes se conectará después.`
    }, {
      quoted: msg
    });
  }
};
