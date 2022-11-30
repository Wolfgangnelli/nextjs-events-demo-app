import React, { useEffect, useState } from 'react'
import { SalesType } from '../../utils/types'
import { FIREBASE_DEFAULT_API, SALES } from '../../utils/endpoints'

const LastSales = () => {
  const [sales, setSales] = useState<SalesType[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`${FIREBASE_DEFAULT_API}/${SALES}`
    ).then(response => response.json()).then(data => {
      const transformedSales = []

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        })
      }

      setSales(transformedSales)
      setIsLoading(false)
    })
  }, [])

  if(isLoading) {
    return <p>Loading...</p>
  }

  if(!sales) {
    return <p>No data yet</p>
  }

  return !!sales && (
    <ul>
      {sales?.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  )
}

export default LastSales