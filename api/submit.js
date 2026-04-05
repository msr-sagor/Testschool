import fs from 'fs'

export default async function handler(req, res) {
  const newData = JSON.parse(req.body)

  const file = JSON.parse(fs.readFileSync('./data/students.json'))

  file.pending.push(newData)

  fs.writeFileSync('./data/students.json', JSON.stringify(file, null, 2))

  res.status(200).json({ ok: true })
}
