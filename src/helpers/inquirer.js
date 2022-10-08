import inquirer from 'inquirer'
import colors from 'colors'

export const mainMenu = async () => {
  const questions = [
    {
      type: 'list',
      name: 'name',
      message: 'Message',
      choices: [
        { name: `${colors.green('1.')} Create task`, value: 1 },
        { name: `${colors.green('2.')} Show all tasks`, value: 2 },
        { name: `${colors.green('3.')} Show to do tasks`, value: 3 },
        { name: `${colors.green('4.')} Show completed tasks`, value: 4 },
        { name: `${colors.green('5.')} Complete task`, value: 5 },
        { name: `${colors.green('6.')} Delete task`, value: 6 },
        { name: `${colors.green('0.')} Exit`, value: 0 },
      ],
    },
  ]

  console.clear()

  console.log(colors.green('============================'))
  console.log(colors.red('            MENU'))
  console.log(colors.green('============================\n'))

  const {name} = await inquirer.prompt(questions)
  
  return name
}

export const pause = async () => {
  const questions = [
    {
      type: 'input',
      name: 'pause',
      message: `Press ${colors.green('ENTER')} for continue`,
    },
  ]

  await inquirer.prompt(questions)
}

export const readInput = async message => {
  const question = {
    type: 'input',
    name: 'input',
    message,
    validate(value) {
      if (value.length < 1) {
        return 'Please, inter value'
      }

      return true
    },
  }

  const { input } = await inquirer.prompt(question)

  return input
}

export const deleteTasks = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = colors.green(`${i + 1}`)
    const description = task.description
    
    return {
      value: task.id,
      name: `${idx}. ${description}`
    }
  })
  
  choices.unshift({
    value: 0,
    name: `${colors.green('0')}. Cancel`
  })
  
  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    },
  ]
  
  const {id} = await inquirer.prompt(questions)
  
  return id
}

export const confirm = async (message) => {
  const question = [
    {type: 'confirm', name: 'ok', message}
  ]
  
  const { ok } = await inquirer.prompt(question)
  
  return ok
}

export const checkList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = colors.green(`${i + 1}`)
    const description = task.description
    
    return {
      value: task.id,
      name: `${idx}. ${description}`,
      checked: !!task.completedAt
    }
  })
  
  const questions = [
    {
      type: 'checkbox',
      name: 'idx',
      message: 'Select',
      choices
    },
  ]
  
  const {idx} = await inquirer.prompt(questions)
  
  return idx
}
