import React, { useEffect, useState } from 'react'
import { SalesType } from '../../utils/types'
import { FIREBASE_DEFAULT_API, SALES } from '../../utils/endpoints'
import useSWR from 'swr'

interface Props {
  sales: SalesType[] | undefined
}

const LastSales = (props: Props) => {
  const { sales: salesInitialState = undefined } = props

  const [sales, setSales] = useState<SalesType[] | undefined>(salesInitialState)

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
  
  if(!data && !sales) return <p>Loading...</p>
  
  return (
    <ul>
      {sales?.map((sale: SalesType) => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  )
}

export async function getStaticProps() {
  // pre-fetching data
  const res = await fetch(`${FIREBASE_DEFAULT_API}/${SALES}`)

  const data = await res.json()

  const transformedSales = []

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    })
  }  

  return {
    props: {
      sales: transformedSales
    }
  }
}

export default LastSales