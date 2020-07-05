class TimersManager {
  constructor() {
    this.timers = []
    this.timerStatus = false
    this.logs = []
  }

  add(timer, ...jobParams) {
    const { name, delay, interval, job } = timer

    if (this._timerValidation(timer)) {
      const extendedTimer = {
        name,
        create: () => {
          const timerSetType = interval ? setInterval : setTimeout

          extendedTimer.timerID = timerSetType(
            (job, jobParams) => {
              let results
              let logOptions = {}
              let logOptionsErrors = {}

              try {
                results = job(...jobParams)
              } catch (error) {
                logOptionsErrors = {
                  name: error.name,
                  message: error.message,
                  stack: error.stack
                }
              }

              logOptions = {
                name: extendedTimer.name,
                in: [...jobParams],
                out: results || null,
                error: logOptionsErrors,
                created: new Date()
              }

              this._log(logOptions)
            },
            delay,
            job,
            jobParams
          )
        },
        start: () => {
          extendedTimer.create()
        },
        stop: () => {
          const timerClearType = interval ? clearInterval : clearTimeout
          timerClearType(extendedTimer.timerID)
        }
      }

      this.timers.push(extendedTimer)
    }

    return this
  }

  remove(timer) {
    this.stop(timer)

    let pointer
    this.timers.forEach(({ name }, index) => {
      if (timer.name === name) {
        pointer = index
      }
    })

    this.timers.splice(pointer, 1)

    return this
  }

  start(timer) {
    this.timers.forEach((t) => {
      if (!timer) {
        t.start()
      } else if (timer.name == t.name) {
        t.start()
      }
    })

    this.timerStatus = true

    return this
  }

  stop(timer) {
    this.timers.forEach((t) => {
      if (!timer) {
        t.stop()
      } else if (timer.name == t.name) {
        t.stop()
      }
    })
  }

  pause(timer) {
    this.stop(timer)

    return this
  }

  resume(timer) {
    this.start(timer)

    return this
  }

  print() {
    console.log('-------------------------------------')
    console.log('Выведены логи отработанных таймеров')
    console.log(this.logs)
    console.log('-------------------------------------')

    return this
  }

  _log(options) {
    this.logs.push(options)
  }

  _timerValidation(timer) {
    const { name, delay, interval, job } = timer

    // 1. Вызывать ошибку если поле name содержит неверный тип, отсутствует или пустая строка.
    if (typeof name !== 'string' || name.length === 0) {
      console.error('Проверьте поле name')
      return false
    }

    // 2. Вызывать ошибку если поле delay содержит неверный тип, отсутствует.
    // 3. Вызывать ошибку если поле delay меньше 0 и больше 5000.
    if (typeof delay !== 'number' || delay < 0 || delay > 5000) {
      console.error('Проверьте поле delay')
      return false
    }

    // 4. Вызывать ошибку если поле interval содержит неверный тип, отсутствует.
    if (typeof interval !== 'boolean') {
      console.log('Проверьте поле interval')
      return false
    }

    // 5. Вызывать ошибку если поле job содержит неверный тип, отсутствует.
    if (typeof job !== 'function') {
      console.log('Проверьте поле job')
      return false
    }

    // 6. Вызывать ошибку если запустить метод add после старта
    if (this.timerStatus) {
      console.log('Таймер уже запущен')
      return false
    }

    // 7. Вызывать ошибку если добавить таймер с именем который уже был добавлено
    this.timers.forEach((t) => {
      if (t.name === name) {
        console.error(`Таймер с именем ${name} уже был добавлен`)
        return false
      }
    })

    return true
  }
}

const t1 = {
  name: 't1',
  delay: 3000,
  interval: true,
  job: () => {
    console.log(`Таймер ${t1.name} выполнился`)
  }
}

const t2 = {
  name: 't2',
  delay: 1000,
  interval: true,
  job: () => {
    console.log(`Таймер ${t2.name} вернет ошибку:`)
    throw new Error('We have a problem!')
  }
}

const t3 = {
  name: 't3',
  delay: 2000,
  interval: true,
  job: (a, b) => {
    console.log(`Таймер ${t3.name} выполнился с результатом:`, a + b)
    return a + b
  }
}

const t4 = {
  name: 't4',
  delay: 5000,
  interval: true,
  job: (a, b) => {
    console.log(`Таймер ${t4.name} выполнился с результатом:`, a + b)
    return a + b
  }
}

const manager = new TimersManager()

console.log(
  'Добавить таймеры (t1, t2, t3, t4), остановить таймер (t3), удалить (t3) из очереди) и запустить все таймеры на выполнение'
)
manager.add(t1).add(t2).add(t3, 3, 4).add(t4, 5, 6).remove(t3).start()

const getLongDellay = [t1, t2, t3, t4].reduce((prev, current) =>
  prev.delay > current.delay ? prev.delay : current.delay
)

setTimeout(() => {
  manager.pause(t1).pause(t2)
  console.log('Поставлены таймеры (t1 и t2) на паузу')
}, 2000)

setTimeout(() => {
  manager.resume(t1).resume(t2)
  console.log('Возобновление работы таймеров (t2 и t3)')
}, 4000)

setTimeout(() => {
  manager.stop()
  manager.print()
  console.log('Все таймеры остановлены')
}, getLongDellay + 10000)
