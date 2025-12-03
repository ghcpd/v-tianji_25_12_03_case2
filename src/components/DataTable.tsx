import { ReactNode } from 'react'
import './DataTable.scss'

type Column<T> = {
  header: string
  accessor: keyof T | ((row: T) => ReactNode)
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  onRowClick?: (row: T) => void
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  onRowClick,
}: DataTableProps<T>) {
  const renderCell = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row)
    }
    return row[column.accessor]
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="table-header">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={String(row[keyField])}
            className={onRowClick ? 'clickable-row' : ''}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((col, idx) => (
              <td key={idx} className="table-cell">
                {renderCell(row, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable

