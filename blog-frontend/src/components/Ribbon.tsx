'use client'

import PmRibbon from 'pm-ribbon'

const Ribbon = () => {
  const document = globalThis?.document

  return (
    <div className="fixed -z-10 h-full w-full">
      <PmRibbon canClickChange clickChangeDom={document} />
    </div>
  )
}

export default Ribbon
