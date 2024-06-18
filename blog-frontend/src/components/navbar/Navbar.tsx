import Link from 'next/link'
import { Icons } from '../Icons'
import NavItems from './NavItems'
import Drawer from './Drawer'
import UserAccountNav from './UserAccountNav'
import { Rss } from 'lucide-react'
// import Weather from '../weather/Weather'

const Navbar = () => {
  return (
    <div className="absolute inset-x-0 top-0 z-30 h-16 w-full">
      <header className="relative">
        <div className="mx-auto w-full px-2.5 md:px-20">
          <div className="flex h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <Icons.home className="h-6 w-6 fill-white hover:fill-orange-400" />
              </Link>
            </div>

            <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
              <NavItems />
            </div>

            <div
              className="ml-8 transition-transform hover:rotate-[360deg] hover:cursor-pointer hover:text-orange-400"
              title="RSS"
            >
              <Link href="/RSS.xml" target="_blank">
                <Rss />
              </Link>
            </div>

            {/* <div className="ml-8 hidden lg:block">
              <Weather />
            </div> */}

            <div className="ml-auto flex h-full items-center">
              <UserAccountNav />
              <div className="ml-4 flow-root lg:ml-6 lg:hidden">
                <Drawer />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
