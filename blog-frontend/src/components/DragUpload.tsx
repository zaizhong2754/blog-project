'use client'

import Image from 'next/image'
import { Icons } from './Icons'
import { useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'

const DragUpload = ({
  img,
  disabled,
  fileHandler,
  onFileRemove
}: {
  img: string
  disabled: boolean
  fileHandler: (files: FileList | null | undefined) => void
  onFileRemove: () => void
}) => {
  const [showMark, setShowMark] = useState(false)

  const fileInput = useRef<HTMLInputElement>(null)
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    fileHandler(files)
  }
  const onFileChange = () => {
    const files = fileInput.current?.files
    fileHandler(files)
  }
  return (
    <div className="relative h-44 w-44  rounded-xl border border-dashed border-gray-300 hover:border-blue-400">
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-2 hover:cursor-pointer"
        onDragEnter={e => !disabled && e.preventDefault()}
        onDragOver={e => !disabled && e.preventDefault()}
        onDrop={onDrop}
        onClick={() => !disabled && fileInput.current?.click()}
      >
        <Icons.upload className="h-14 w-14 fill-gray-300" />
        <div className="text-center text-sm">
          <div>将图片拖到此处，或</div>
          <span className="text-blue-400">点击上传</span>
        </div>
      </div>
      {img && (
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-white"
          onMouseEnter={() => setShowMark(true)}
          onMouseLeave={() => setShowMark(false)}
        >
          <Image
            className="h-full w-full"
            src={img}
            width="0"
            height="0"
            sizes="100vw"
            alt=""
          />
          {showMark && (
            <div
              className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-gray-400 opacity-50"
              onClick={() => onFileRemove()}
            >
              <Trash2 className="h-6 w-6" />
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInput}
        className="hidden h-full w-full hover:cursor-pointer"
        disabled={disabled}
        type="file"
        multiple
        onChange={onFileChange}
      />
    </div>
  )
}

export default DragUpload
