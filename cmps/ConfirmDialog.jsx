// A tiny global confirmation dialog driven by the event bus.
// Usage (from anywhere):
//   import { eventBusService } from '../services/event-bus.service.js'
//   eventBusService.emit('confirm', {
//     txt: 'Delete this todo?',
//     okText: 'Delete',
//     cancelText: 'Cancel',
//     onConfirm: () => doSomething(),
//     onCancel: () => {},         // optional
//   })
//
// Render this component once near the top of the app
// (e.g., in RootCmp or AppHeader next to <UserMsg />).

import { eventBusService } from '../services/event-bus.service.js'

const { useEffect, useState } = React

export function ConfirmDialog() {
  // `req` holds the current confirmation request; null means hidden.
  const [req, setReq] = useState(null)

  useEffect(() => {
    // Subscribe to global 'confirm' events
    const unsubscribe = eventBusService.on('confirm', (data = {}) => {
      const {
        txt = 'Are you sure?',
        okText = 'Confirm',
        cancelText = 'Cancel',
        onConfirm = () => {},
        onCancel = () => {},
      } = data
      setReq({ txt, okText, cancelText, onConfirm, onCancel })
    })
    return unsubscribe
  }, [])

  // Close helper
  function hide() { setReq(null) }

  function handleConfirm() {
    try {
      if (req && typeof req.onConfirm === 'function') req.onConfirm()
    } finally {
      hide()
    }
  }

  function handleCancel() {
    try {
      if (req && typeof req.onCancel === 'function') req.onCancel()
    } finally {
      hide()
    }
  }

  // Allow ESC to cancel while open
  useEffect(() => {
    if (!req) return
    function onKeyDown(ev) {
      if (ev.key === 'Escape') handleCancel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [req])

  if (!req) return null

  return (
    <div className="confirm-backdrop" onClick={handleCancel}>
      {/* stopPropagation so clicks inside the modal don't close it */}
      <div className="confirm-modal" onClick={ev => ev.stopPropagation()}>
        <p>{req.txt}</p>
        <div className="btns">
          <button className="confirm-ok" onClick={handleConfirm}>{req.okText}</button>
          <button className="confirm-cancel" onClick={handleCancel}>{req.cancelText}</button>
        </div>
      </div>
    </div>
  )
}
