import { useState } from 'react'

const SeedData = ({ data, hasData, onSeedSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSeed = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:3005/api/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to seed data')
      }

      await onSeedSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleSeed}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
        disabled={data.length === 0 || loading || hasData}
      >
        {loading ? 'Seeding...' : 'Seed Data'}
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default SeedData
