import { cn } from '@/lib/utils'
import AsideContent from '@/components/aside/AsideContent'

const PageWrapper = ({
  bannerClassName,
  contentClassName,
  title,
  motto,
  bannerToggle,
  children
}: {
  bannerClassName?: string
  contentClassName?: string
  title?: string
  motto?: React.ReactNode
  bannerToggle?: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <>
      <div
        className={cn(
          'relative bg-cover bg-center before:absolute before:z-10 before:h-full before:w-full before:bg-black before:bg-opacity-20',
          bannerClassName
        )}
      >
        <div className="absolute top-[43%] z-20 w-full px-3">
          <h1 className="text-center font-serif text-3xl md:text-5xl">
            {title}
          </h1>
          {motto}
        </div>
        <div className="group absolute bottom-3 z-20 flex w-full cursor-pointer justify-center">
          {bannerToggle}
        </div>
      </div>
      <div
        id="content"
        className={cn(
          'relative mx-auto grid w-full max-w-screen-2xl grid-cols-4 gap-4 bg-opacity-0 px-10 py-10 text-black',
          contentClassName
        )}
      >
        <div className="col-span-4 lg:col-span-3">{children}</div>
        <div className="col-span-4 lg:col-span-1">
          <AsideContent />
        </div>
      </div>
    </>
  )
}

export default PageWrapper
