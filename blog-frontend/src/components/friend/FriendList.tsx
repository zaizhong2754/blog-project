'use client'

import Image from 'next/image'
import Link from 'next/link'

const FriendList = ({ friendList }: { friendList: Array<any> }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-3">
      {friendList.map((item: any) => (
        <div key={item.id}>
          <Link
            className="group flex h-20 items-center gap-2 rounded-md p-4 hover:bg-blue-400"
            href={item.address}
            title={item.name}
            target="_blank"
          >
            <div className="h-16 w-16 overflow-hidden rounded-full group-hover:hidden">
              <Image
                className="h-full w-full"
                src={item.logo}
                width="0"
                height="0"
                sizes="100vw"
                alt=""
              />
            </div>
            <div className="flex-1 truncate text-center">
              <div className="truncate text-2xl">{item.name}</div>
              <div className="truncate text-sm" title={item.description}>
                {item.description}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default FriendList
