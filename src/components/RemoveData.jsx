import { useState } from 'react'

const RemoveData = ({ hasData, isRunning, onRemoveSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleRemove = async () => {
    if (!confirm('Are you sure you want to delete all data?')) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:3005/api/clear/data', {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete data')
      }

      await onRemoveSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleRemove}
        className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-500 disabled:opacity-50 disabled:pointer-events-none"
        disabled={loading || !hasData || isRunning}
      >
        {loading ? 'Deleting...' : 'Clear Data'}
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default RemoveData
