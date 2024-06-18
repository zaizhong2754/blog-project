'use client'

import { MOTTOS } from '@/config'
import { mottoStateMachine } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'

const Motto = () => {
  const el = useRef(null)

  useEffect(() => {
    const mottoStateArray = mottoStateMachine(MOTTOS)
    const typed = new Typed(el.current, {
      strings: [...mottoStateArray],
      typeSpeed: 100,
      loop: true,
      backSpeed: 50
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div className="text-center font-serif text-xl md:text-3xl">
      <span ref={el} />
    </div>
  )
}

export default Motto
