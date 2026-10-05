import { downloadMediaMessage } from "@whiskeysockets/baileys";

export default {
  command: "sticker",

  description: "Convierte una imagen en sticker.",

  async execute({ sock, msg, jid }) {
    const imagen = msg.message?.imageMessage;

    if (!imagen) {
      return await sock.sendMessage(jid, {
        text:
`╭╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╮
✐ STICKER

₍ᐢ..ᐢ₎ ᜒ Falta una imagen.

〄 Envía una imagen con #sticker
〄 O responde a una imagen con #sticker

╰╼ׅࣶ፝֟╾╌ֵ╾͜─ํ͜┈ְ ࣭࣪⢏࣭ࣧ⢢࣭ׄ᎐፝֟͟͝᎐࣭ׄ⡔࣭ࣧ⡹࣭ׄ ְ┈ํ͜─͜╼ꨪᰰ╾࣮╌╼ࣶׅ፝֟╾╯`
      }, { quoted: msg });
    }

    try {
      const buffer = await downloadMediaMessage(
        msg,
        "buffer",
        {},
        {
          logger: sock.logger
        }
      );

      await sock.sendMessage(jid, {
        sticker: buffer
      }, {
        quoted: msg
      });

    } catch (error) {
      console.error("Error en sticker:", error);

      await sock.sendMessage(jid, {
        text: "❌ No pude convertir la imagen en sticker."
      }, {
        quoted: msg
      });
    }
  }
};
