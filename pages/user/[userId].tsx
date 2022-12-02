import React from 'react'
import { GetServerSidePropsContext } from 'next'

interface Props {
    id: string
    username: string
}

const UserProfile = (props: Props) => {
    const { id = '', username = '' } = props

  return (
    <div>
        <p>{username} with id {id}</p>
    </div>
  )
}

export default UserProfile

// this only executes on the server after deployment and also on our developement server here, but it's not statically pre-generated
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params, req, res } = context

    return {
        props: {
            id: params?.userId,
            username: 'Max'
        }
    }
}