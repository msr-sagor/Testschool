export default async function handler(req, res) {
  const data = await getFile()
  res.json(data)
}