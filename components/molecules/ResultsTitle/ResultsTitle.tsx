import React from 'react'
import { Button } from '../../atoms'
import { humanReadableDate } from '../../../utils'
import styles from './ResultsTitle.module.sass'

interface Props {
    date: Date
}

const ResultsTitle = (props: Props) => {
    const { date } = props

  return (
    <section className={styles.title}>
        <h1>Events in {humanReadableDate(date + "", false)}</h1>
        <Button label="Show all events" href='/events' />
    </section>
  )
}

export default ResultsTitle