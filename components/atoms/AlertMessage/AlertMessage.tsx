import React from 'react'
import { Alert } from 'react-bootstrap'
import styles from './AlertMessage.module.sass'

interface Props {
  message: string
  variant: string
}

const AlertMessage = (props: Props) => {
  const { message, variant } = props

  return (
    <Alert variant={variant} className={`center ${styles.alert}`}>{message}</Alert>
  )
}

export default AlertMessage