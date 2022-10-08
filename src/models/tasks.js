import { Task } from './task.js'
import { readDB } from '../helpers/db.js'
import colors from 'colors'

export class Tasks {
  _list = {}

  constructor() {
    this._list = readDB() || {}
  }
  
  get list() {
    return this._list
  }
  
  get listAsArray() {
    return Object.values(this._list)
  }

  createTask(description) {
    const task = new Task(description)
    this._list[task.id] = task
  }

  printTasks(completed = null) {
    this.listAsArray.forEach((task, i) => {
      if (completed === false && task.completedAt || completed && !task.completedAt) {
        return
      }
      
      const n = colors.green(i + 1)
      const description = task.description
      const state = task.completedAt ? colors.green('DONE') : colors.red('TODO')
      const newLine = i > 0 ? '' : '\n'

      console.log(`${newLine}${n}. ${description} :: ${state}`)
    })
  }
  
  delete(id) {
    delete this._list[id]
  }
  
  toggleCompleteState(idx) {
    for (const taskId in this._list) {
      const task = {...this._list[taskId]}
  
      if (idx.includes(task.id) && !task.completedAt) {
        task.completedAt = Date.now()
      }
  
      if (task.completedAt && !idx.includes(task.id)) {
        task.completedAt = null
      }
  
      this._list[taskId] = task
    }
  }
}
