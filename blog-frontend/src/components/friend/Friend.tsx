'use client'

import FriendList from './FriendList'
import FriendForm from './FriendForm'
import { list } from '@/actions/friend'
import { useEffect, useState } from 'react'

const Friend = () => {
  const [friendList, setFriendList] = useState([])

  const getFriendList = async () => {
    const res = await list()
    if (res.code === 0) {
      console.log(res)
      setFriendList(res.data)
    }
  }

  useEffect(() => {
    getFriendList()
  }, [])

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white p-5 shadow-md  hover:shadow-2xl">
        <FriendList friendList={friendList} />
      </div>
      <div
        id="comment-section"
        className="mt-10 overflow-hidden rounded-lg bg-white p-5 shadow-md  hover:shadow-2xl"
      >
        <FriendForm getFriendList={getFriendList} />
      </div>
    </>
  )
}

export default Friend
