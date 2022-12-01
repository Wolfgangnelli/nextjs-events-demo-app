import React, { useState, useEffect } from 'react'
import axios, { isAxiosError } from 'axios'

interface Props {
  url: string
  params?: any
}

export const useFetch = (props: Props) => {
  const {url = "", params = {}} = props

  const [data, setData] = useState({})

  useEffect(() => {
    (
      async () => {
        try {
          const res = await axios.get(url, params)

          if(res.status === 200) {
            const { data } = res
            setData(data)
          }
        } catch (error) {
          if(isAxiosError(error)) {
            console.error(`Axios Error, ${error}`)
          } else {
            console.error(error)
          }
        }
      }
    )()
  }, [])

  return { data };
}
