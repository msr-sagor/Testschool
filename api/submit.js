export default async function handler(req, res) {
  const body = JSON.parse(req.body)

  const file = await getFile()

  file.pending.push(body)

  await updateFile(file)

  res.json({ ok: true })
}

async function getFile() {
  const res = await fetch(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${process.env.FILE_PATH}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
  })

  const data = await res.json()
  const content = JSON.parse(Buffer.from(data.content, 'base64').toString())

  return content
}

async function updateFile(newData) {
  const fileRes = await fetch(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${process.env.FILE_PATH}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
  })

  const fileData = await fileRes.json()

  await fetch(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${process.env.FILE_PATH}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Update students",
      content: Buffer.from(JSON.stringify(newData, null, 2)).toString('base64'),
      sha: fileData.sha
    })
  })
}