class TimersManager {
  constructor() {
    this.timers = []
    this.timerStatus = false
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
              let result

              try {
                result = job(...jobParams)
              } catch (error) {
                console.error(error.message)
              }
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
  delay: 1000,
  interval: true,
  job: () => {
    console.log(`Таймер ${t1.name} выполнился`)
  }
}

const t2 = {
  name: 't2',
  delay: 1000,
  interval: true,
  job: (a, b) => {
    console.log(`Таймер ${t2.name} выполнился с результатом:`, a + b)
    return a + b
  }
}

const t3 = {
  name: 't3',
  delay: 1000,
  interval: true,
  job: (a, b) => {
    console.log(`Таймер ${t3.name} выполнился с результатом:`, a + b)
    return a + b
  }
}

const t4 = {
  name: 't4',
  delay: 1000,
  interval: true,
  job: (a, b) => {
    console.log(`Таймер ${t4.name} выполнился с результатом:`, a + b)
    return a + b
  }
}

const manager = new TimersManager()

console.log(
  'Добавить таймеры (t1, t2, t3), остановить таймер (t2), удалить (t2) из очереди) и запустить все таймеры на выполнение'
)
manager.add(t1).add(t2, 1, 2).add(t3, 3, 4).add(t4, 5, 6).remove(t2).start()

setTimeout(() => {
  manager.pause(t1).pause(t3)
  console.log('Поставить таймеры t1 и t3 на паузу')
}, 2000)

setTimeout(() => {
  manager.resume(t3)
  console.log('Возобновить работу таймера t3')
}, 6000)

setTimeout(() => {
  manager.stop()
  console.log('Все таймеры остановлены')
}, 8000)
