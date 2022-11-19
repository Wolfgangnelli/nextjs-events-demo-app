import React from 'react'
import styles from './LogisticsItem.module.sass'

interface Props {
    icon: React.ReactNode
    children: React.ReactNode
}

const LogisticsItem = (props: Props) => {
    const { icon = undefined, children } = props

  return (
    <li>
        {!!icon && (
            <span>
                {icon}
            </span>
        )}
        <span>{children}</span>
    </li>
  )
}

export default LogisticsItem