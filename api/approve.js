import fs from 'fs'

export default async function handler(req, res) {
  const { index } = JSON.parse(req.body)

  const file = JSON.parse(fs.readFileSync('./data/students.json'))

  const student = file.pending.splice(index, 1)[0]
  file.approved.push(student)

  fs.writeFileSync('./data/students.json', JSON.stringify(file, null, 2))

  res.status(200).json({ ok: true })
}
