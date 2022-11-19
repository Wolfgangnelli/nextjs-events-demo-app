import React from 'react'
import styles from './EventSummary.module.sass'

interface Props {
    title: string
    image?: string
}

const EventSummary = (props: Props) => {
    const { title, image } = props

  return (
    <section>
        <h1>{title}</h1>
    </section>
  )
}

export default EventSummary