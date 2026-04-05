export default async function handler(req, res) {
  const { index, password } = JSON.parse(req.body)

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const file = await getFile()

  const student = file.pending.splice(index, 1)[0]
  file.approved.push(student)

  await updateFile(file)

  res.json({ ok: true })
}

// same helper function (copy from submit.js)