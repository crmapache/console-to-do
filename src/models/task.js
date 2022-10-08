import { v4 as uuidv4 } from 'uuid'

export class Task {
  id = null
  description = null
  completedAt = null

  constructor(description) {
    this.description = description
    this.id = uuidv4()
  }
}
