export default {
  command: "ping",

  description: "Comprueba si el bot está funcionando.",

  async execute({ sock, msg, jid }) {
    await sock.sendMessage(jid, {
      text: "🏓 PONG!\n\nNEXORA BOT está funcionando correctamente."
    }, {
      quoted: msg
    });
  }
};
