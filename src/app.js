import {checkList, confirm, deleteTasks, mainMenu, pause, readInput} from './helpers/inquirer.js'
import { Tasks } from './models/tasks.js'
import { saveDB } from './helpers/db.js'

console.clear()

const main = async () => {
  let option = null
  const tasks = new Tasks()

  do {
    option = await mainMenu()

    switch (option) {
      case 1:
        const input = await readInput('Description:')
        tasks.createTask(input)
        break
      case 2:
        tasks.printTasks()
        break
      case 3:
        tasks.printTasks(false)
        break
      case 4:
        tasks.printTasks(true)
        break
      case 5:
        const idx = await checkList(tasks.listAsArray)
        tasks.toggleCompleteState(idx)
        break
      case 6:
        const id = await deleteTasks(tasks.listAsArray)

        if (id !== 0) {
          const isConfirmed = await confirm('Do you really want to delete this task?')
  
          if (isConfirmed) {
            tasks.delete(id)
            console.log('Task deleted')
          }
        }
        break
    }

    saveDB(tasks.list)

    await pause()
  } while (option !== 0)
}

main()
