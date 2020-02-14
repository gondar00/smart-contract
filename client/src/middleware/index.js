import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from '../drizzle-options'

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    const contract = action.name
    const contractEvent = action.event.event
    const message = action.event.returnValues._message
    const display = `${contract}(${contractEvent}): ${message}`

    window.UIkit.notification(display)
  }
  return next(action)
}

const appMiddlewares = [contractEventNotifier]

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false // enable ReduxDevTools!
})
