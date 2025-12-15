import * as XLSX from 'xlsx'

const DownloadData = ({ data }) => {
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data')
    XLSX.writeFile(wb, 'data.xlsx')
  }

  return (
    <button
      onClick={handleDownload}
      disabled={data.length === 0}
      className='
        w-full px-4 py-2 rounded-md
        bg-emerald-600 text-white
        hover:bg-emerald-500 cursor-pointer
        transition-colors
        disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
      '>
      Download Data
    </button>
  )
}

export default DownloadData
