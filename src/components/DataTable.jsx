const DataTable = ({ data = [] }) => {
  if (!data.length) return null

  const stats = {
    total: data.length,
    pending: data.filter((row) => row.status?.toLowerCase() === 'pending')
      .length,
    completed: data.filter((row) => row.status?.toLowerCase() === 'completed')
      .length,
    error: data.filter((row) => row.status?.toLowerCase() === 'error').length,
  }

  return (
    <div className='mt-6 space-y-4'>
      <div className='flex flex-wrap gap-3'>
        <div className='px-4 py-1.5 rounded-full text-sm font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-neutral-400'></span>
          Total
          <span className='ml-1 px-1.5 py-0.5 rounded-md bg-neutral-700 text-xs text-white'>
            {stats.total}
          </span>
        </div>
        <div className='px-4 py-1.5 rounded-full text-sm font-medium bg-yellow-900/20 text-yellow-500 border border-yellow-900/50 flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-yellow-500'></span>
          Pending
          <span className='ml-1 px-1.5 py-0.5 rounded-md bg-yellow-900/40 text-xs text-yellow-200'>
            {stats.pending}
          </span>
        </div>
        <div className='px-4 py-1.5 rounded-full text-sm font-medium bg-green-900/20 text-green-500 border border-green-900/50 flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
          Completed
          <span className='ml-1 px-1.5 py-0.5 rounded-md bg-green-900/40 text-xs text-green-200'>
            {stats.completed}
          </span>
        </div>
        <div className='px-4 py-1.5 rounded-full text-sm font-medium bg-red-900/20 text-red-500 border border-red-900/50 flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-red-500'></span>
          Error
          <span className='ml-1 px-1.5 py-0.5 rounded-md bg-red-900/40 text-xs text-red-200'>
            {stats.error}
          </span>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full border border-neutral-800 rounded-lg overflow-hidden'>
          <thead className='bg-neutral-900'>
            <tr>
              <th className='px-4 py-2 text-left text-sm text-neutral-300'>
                ID
              </th>
              <th className='px-4 py-2 text-left text-sm text-neutral-300'>
                Name
              </th>
              <th className='px-4 py-2 text-left text-sm text-neutral-300'>
                Contact
              </th>
              <th className='px-4 py-2 text-left text-sm text-neutral-300'>
                Status
              </th>
              <th className='px-4 py-2 text-left text-sm text-neutral-300'>
                Massage
              </th>
            </tr>
          </thead>

          <tbody className='bg-neutral-900'>
            {data.map((row) => (
              <tr
                key={row.id}
                className='border-t border-neutral-800 hover:bg-neutral-800/50'>
                <td className='px-4 py-2 text-sm text-neutral-300'>{row.id}</td>
                <td className='px-4 py-2 text-sm text-neutral-200'>
                  {row.name}
                </td>
                <td className='px-4 py-2 text-sm text-neutral-300'>
                  {row.contact}
                </td>
                <td className='px-4 py-2 text-sm text-neutral-300'>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      row.status?.toLowerCase() === 'completed'
                        ? 'bg-green-900/30 text-green-400'
                        : row.status?.toLowerCase() === 'error'
                        ? 'bg-red-900/30 text-red-400'
                        : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                    {statusMapper[row.status]}
                  </span>
                </td>
                <td className='px-4 py-2 text-sm text-neutral-300'>
                  {row.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable

const statusMapper = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  ERROR: 'Error',
}
