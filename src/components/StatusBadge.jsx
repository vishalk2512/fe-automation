const StatusBadge = ({ isRunning }) => {
  return (
    <div
      className={`ml-auto flex items-center px-4 py-2 rounded-full border ${
        isRunning
          ? 'border-green-500/30 bg-green-500/10 text-green-400'
          : 'border-neutral-700 bg-neutral-800 text-neutral-400'
      }`}>
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          isRunning ? 'bg-green-400 animate-pulse' : 'bg-neutral-500'
        }`}
      />
      <span className='text-sm font-medium'>
        {isRunning ? 'Automation Running' : 'Automation Idle'}
      </span>
    </div>
  )
}

export default StatusBadge
