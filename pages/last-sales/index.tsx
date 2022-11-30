import React, { useEffect, useState } from 'react'
import { SalesType } from '../../utils/types'
import { FIREBASE_DEFAULT_API, SALES } from '../../utils/endpoints'
import useSWR from 'swr'

const LastSales = () => {
  const [sales, setSales] = useState<SalesType[]>()

  const fetcher = (...args: any) => fetch(args).then(res => res.json())

  const { data, error } = useSWR(`${FIREBASE_DEFAULT_API}/${SALES}`, fetcher)

  useEffect(() => {
    if(data) {
      const transformedSales = []

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        })
      }

      setSales(transformedSales)
    }
  }, [data])

  if(error) return <p>Fail to load</p>
  
  if(!data || !sales) return <p>Loading...</p>
  
  return (
    <ul>
      {sales?.map((sale: SalesType) => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  )
}

export default LastSales