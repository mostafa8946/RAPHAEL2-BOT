let handler = async (m, { conn, usedPrefix, command }) => {
    let img = await conn.getFile(global.API('fgmods', '/api/asupan-la', {}, 'apikey'))
    let asupan = img.data
    conn.sendFile(m.chat, `✅ النتيجة`, igfg, asupan, m)
    m.react(dmoji)
  }
  
  handler.help = ['tvid']
  handler.tags = ['img']
  handler.command = ['asupan', 'tvid']
  
  export default handler
  