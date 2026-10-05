export default {
  command: "ia",

  description: "Habla con la inteligencia artificial.",

  async execute({ sock, msg, jid, args }) {
    const pregunta = args.join(" ").trim();

    if (!pregunta) {
      return await sock.sendMessage(jid, {
        text:
`╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ INTELIGENCIA ARTIFICIAL

₍ᐢ..ᐢ₎ ᜒ Escribe una pregunta.

〄 Usa:
#ia tu pregunta

〄 Ejemplo:
#ia ¿Qué es un agujero negro?

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯`
      }, {
        quoted: msg
      });
    }

    await sock.sendMessage(jid, {
      text:
`🤖 NEXORA IA

🧠 Pregunta recibida:

${pregunta}

⏳ Sistema de IA preparado.

La conexión con el modelo de IA se agregará después.`
    }, {
      quoted: msg
    });
  }
};
