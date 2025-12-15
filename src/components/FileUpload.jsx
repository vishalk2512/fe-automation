import { useRef, useState } from 'react'
import * as XLSX from 'xlsx'
import { safeTrim } from '../utils/safeTrim'

const REQUIRED_COLUMNS = ['First Name', 'Mobile #']

const FileUpload = ({ setData, hasData }) => {
  const fileInputRef = useRef(null)

  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    setError(null)

    if (!selectedFile) {
      setFile(null)
      return
    }

    // Validate file type
    if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
      setError('Please upload a valid Excel file (.xlsx or .xls)')
      setFile(null)
      return
    }

    setFile(selectedFile)
  }

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setFile(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (hasData) {
      setError('Please clear existing data before uploading new file')
      return
    }

    if (!file) {
      setError('No file selected')
      resetFileInput()
      return
    }

    setLoading(true)

    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const buffer = new Uint8Array(event.target.result)
        const workbook = XLSX.read(buffer, { type: 'array' })

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        if (jsonData.length === 0) {
          setError('Excel file is empty')
          return
        }

        const formattedData = jsonData.map((row, index) => ({
          id: index + 1,
          name: safeTrim(row[REQUIRED_COLUMNS[0]]),
          contact: safeTrim(row[REQUIRED_COLUMNS[1]]),
          status: 'PENDING',
          message: 'Not Processed',
        }))

        setData(formattedData)
      } catch (err) {
        setError('Failed to read Excel file')
      } finally {
        setLoading(false)
        resetFileInput()
      }
    }

    reader.onerror = () => {
      setError('Error reading file')
      setLoading(false)
      resetFileInput()
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='p-6 rounded-lg max-w-md space-y-4 bg-neutral-900 min-h-[200px]'>
      <label htmlFor='data' className='block text-sm text-neutral-300'>
        Upload Excel File
      </label>

      <input
        ref={fileInputRef}
        type='file'
        id='data'
        accept='.xlsx,.xls'
        onChange={handleFileChange}
        disabled={loading || hasData}
        className='
          block w-full text-sm text-neutral-300
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:bg-neutral-800 file:text-neutral-200
          hover:file:bg-neutral-700
          cursor-pointer
          disabled:opacity-50 disabled:pointer-events-none
        '
      />

      {error && (
        <p className='text-sm text-red-400 bg-red-950/40 p-2 rounded-md'>
          {error}
        </p>
      )}

      <button
        type='submit'
        disabled={loading || !file || hasData}
        className='
          w-full py-2 rounded-md
          bg-indigo-600 text-white
          hover:bg-indigo-500 cursor-pointer
          transition-colors
          disabled:opacity-50 disabled:pointer-events-none
        '>
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  )
}

export default FileUpload
