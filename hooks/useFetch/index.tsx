import React, { useState, useEffect } from 'react'
import axios, { isAxiosError } from 'axios'

interface Props {
  url: string
  params: any
}

export const useFetch = (props: Props) => {
  const {url = "", params = {}} = props

  const [data, setData] = useState()

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get(url, params)

          if(data) {
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

  return data;
}
