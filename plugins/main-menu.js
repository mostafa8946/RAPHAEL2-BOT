import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'


let handler = async (m, { conn, usedPrefix, command }) => {
  let d = new Date(new Date() + 3600000)
  let locale = 'ar'
  let week = d.toLocaleDateString(locale, { weekday: 'long' })
  let date = moment().tz('Asia/Muscat').locale('ar').format('DD MMMM YYYY')
  //let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)

  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  if (!(who in global.db.data.users)) throw `✳️ المستخدم غير موجود في قاعدة البيانات`

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
  let user = global.db.data.users[who]
  let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
  let { min, xp, max } = xpRange(user.level, global.multiplier)
  let username = conn.getName(who)
  let math = max - xp
  let prem = global.prems.includes(who.split`@`[0])
  let sn = createHash('md5').update(who).digest('hex')
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let more = String.fromCharCode(8206)
  let readMore = more.repeat(850)
  let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
// الوقت بعُمان
  const time = moment.tz('Asia/Muscat').format('HH A')
  let wib = moment.tz('Asia/Muscat').format('hh:mm:ss A')
  
  let str = ` *❆╾╾━━━━━❰･✥･❱━━━━━╼╼❆*

┓━━⊱ *الترحيب* ━━⊰
┛━━⊱ *اهـلاً بـك* ❣️ : *"${name}"*

*• ∙ ∙━━╍━﹝🎡﹞━╍━━∙ ∙ •*
*⟬ معلومات البوت ⟭ ⬳ ⌝🤖⌞*
                     ━༓── ─ • ✧ • ─ ──༓━

✮┇اسم البوت: *${botname}*
✮┇اسم المالك: *${ownername}*
✮┇نظام التشغيل: *لـيـنــكــس*
✮┇مــــنـــصـة: *هـيــروكـو*
✮┇وقت التشغيل: *${uptime}*

*• ∙ ∙━━╍━﹝🎡﹞━╍━━∙ ∙ •*
*⟬ معلومات المستخدم ⟭ ⬳ ⌝👤⌞*
                     ━༓── ─ • ✧ • ─ ──༓━

✮┇الإسم: *${name}*
✮┇الحساب: *${taguser}*

*• ∙ ∙━━╍━﹝🎡﹞━╍━━∙ ∙ •*
*⟬  التقویم ⟭ ⬳ ⌝📅⌞*
                     ━༓── ─ • ✧ • ─ ──༓━

*❥┇بتوقيت سلطنة عُـمــان-🇴🇲-*
✮┇الوقت: *${wib}*
✮┇التاریخ: *${date}*

━ ── • ⟐ • ── ━
*˼‏ ⚠️˹ مـلاحــظــة╿↶*
╭ ⋅ ⋅ ── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ── ⋅ ⋅ ╮
*❶ - لعرض الاوامر اکتب/ي ⬳ ⌝ .المهام/الاوامر ⌞*
*❷ - يمنع منعا بتا سب البوت ، استخدام البوت بشكل متوازن و بدون تسبب ازعاج للاعضاء.*
 ╰⋅ ⋅ ── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ── ⋅ ⋅ ╯


*~.¸¸ ❝𝙲𝚑𝚒𝚏𝚞𝚢𝚞 𝙱𝚘𝚝❝ ¸¸.~*`

  conn.sendFile(m.chat, pp, 'darkman.png', str, m, false, { mentions: [who] })
  m.react(done)
}

handler.help = ['main']
handler.tags = ['group']
handler.command = ['الأوامر', 'الاوامر', 'اوامر', 'أوامر','menu']

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  const time = moment.tz('Asia/Muscat').format('HH A')
  let res = "صباح الخير ☀️"
  if (time >= 4) {
    res = "صباح الخير 🌄"
  }
  if (time >= 10) {
    res = "مساء الخير ☀️"
  }
  if (time >= 15) {
    res = "مساء الخير 🌇"
  }
  if (time >= 18) {
    res = "تصبح على خير 🌙"
  }
  return res
}
