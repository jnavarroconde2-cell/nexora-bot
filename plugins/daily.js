export default {
  command: "daily",

  description: "Reclama tu recompensa diaria.",

  async execute({ sock, msg, jid }) {
    const recompensa = 500;

    await sock.sendMessage(jid, {
      text:
`╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ RECOMPENSA DIARIA

₍ᐢ..ᐢ₎ ᜒ ¡Recompensa recibida!

〄 Ganaste: ${recompensa} monedas 🪙

〄 Vuelve mañana para reclamar otra.

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯`
    }, {
      quoted: msg
    });
  }
};
