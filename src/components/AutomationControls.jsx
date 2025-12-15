import { useState, useEffect } from 'react'

const AutomationControls = ({ isRunning, hasData, onAutomationSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)

  useEffect(() => {
    if (pendingAction === 'start' && isRunning) {
      setLoading(false)
      setPendingAction(null)
    } else if (pendingAction === 'stop' && !isRunning) {
      setLoading(false)
      setPendingAction(null)
    }
  }, [isRunning, pendingAction])

  const handleAction = async (action) => {
    setLoading(true)
    setPendingAction(action)
    try {
      await fetch(`http://localhost:3000/api/automation/${action}`, {
        method: 'GET',
      })

      await onAutomationSuccess()
    } catch (error) {
      console.error(`Error ${action} automation:`, error)
      setLoading(false)
      setPendingAction(null)
    }
  }

  return (
    <div className='flex items-center gap-2 flex-wrap'>
      <button
        onClick={() => handleAction('start')}
        disabled={loading || isRunning || !hasData}
        className='
          px-4 py-2 rounded-md
          bg-green-600 text-white font-medium
          hover:bg-green-500 cursor-pointer
          disabled:opacity-50 disabled:pointer-events-none
          transition-colors
        '>
        {loading && pendingAction === 'start'
          ? 'Starting...'
          : 'Start Automation'}
      </button>
      <button
        onClick={() => handleAction('stop')}
        disabled={loading || !isRunning || !hasData}
        className='
          px-4 py-2 rounded-md
          bg-red-600 text-white font-medium
          hover:bg-red-500 cursor-pointer
          disabled:opacity-50 disabled:pointer-events-none
          transition-colors
        '>
        {loading && pendingAction === 'stop'
          ? 'Stopping...'
          : 'Stop Automation'}
      </button>
    </div>
  )
}

export default AutomationControls
