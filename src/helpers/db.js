import fs from 'fs'

const dbPath = './src/db/db.json'

export const saveDB = data => {
  fs.writeFileSync(dbPath, JSON.stringify(data))
}

export const readDB = () => {
  if (fs.existsSync(dbPath)) {
    return JSON.parse(fs.readFileSync(dbPath, { encoding: 'utf-8' }))
  }

  return null
}
