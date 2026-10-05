export default {
  command: "work",

  description: "Trabaja para ganar monedas.",

  async execute({ sock, msg, jid }) {
    const recompensa = Math.floor(Math.random() * 151) + 50;

    await sock.sendMessage(jid, {
      text:
`╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ TRABAJO

₍ᐢ..ᐢ₎ ᜒ ¡Trabajo completado!

〄 Ganaste: ${recompensa} monedas 🪙

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯`
    }, {
      quoted: msg
    });
  }
};
