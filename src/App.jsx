import { useState, useEffect, useCallback } from 'react'
import DataTable from './components/DataTable.jsx'
import FileUpload from './components/FileUpload.jsx'
import SeedData from './components/SeedData.jsx'
import RemoveData from './components/RemoveData.jsx'
import StatusBadge from './components/StatusBadge.jsx'
import AutomationControls from './components/AutomationControls.jsx'
import DownloadData from './components/DownloadData.jsx'

const App = () => {
  const [uploadedData, setUploadedData] = useState([])
  const [tableData, setTableData] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/receive/data')
      if (response.ok) {
        const result = await response.json()
        setTableData(result)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/automation/status'
      )
      if (response.ok) {
        const result = await response.json()
        setIsRunning(result.isRunning)
      }
    } catch (error) {
      console.error('Error fetching status:', error)
    }
  }, [])

  useEffect(() => {
    fetchData()
    fetchStatus()

    const interval = setInterval(() => {
      fetchData()
      fetchStatus()
    }, 30000)

    return () => clearInterval(interval)
  }, [fetchData, fetchStatus])

  return (
    <div className='min-h-screen bg-neutral-800 p-6'>
      <div className='flex items-center flex-wrap gap-4 mb-6'>
        <FileUpload setData={setUploadedData} hasData={tableData.length > 0} />
        <div className='p-6 rounded-lg max-w-md space-y-4 bg-neutral-900'>
          <RemoveData
            hasData={tableData.length > 0}
            isRunning={isRunning}
            onRemoveSuccess={async () => {
              await fetchData()
              setTableData([])
            }}
          />
          <SeedData
            data={uploadedData}
            hasData={tableData.length > 0}
            onSeedSuccess={async () => {
              await fetchData()
              setUploadedData([])
            }}
          />
          <DownloadData data={tableData} />
        </div>
        <div className='flex flex-col gap-4 ml-auto'>
          <StatusBadge isRunning={isRunning} />
          <AutomationControls
            isRunning={isRunning}
            hasData={tableData.length > 0}
            onAutomationSuccess={async () => {
              await fetchStatus()
            }}
          />
        </div>
      </div>
      <DataTable data={tableData} />
    </div>
  )
}

export default App
