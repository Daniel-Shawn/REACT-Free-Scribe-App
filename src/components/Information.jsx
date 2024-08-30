import React from 'react'
import { useState } from 'react'

export default function Information() {
    const [tab, setTab] = useState('transcription')

  return (
    <main className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center p-4 text-center pb-20 max-w-prose w-full mx-auto" >
            <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl whitespace-nowrap" >
                Your
                <span className="text-blue-400 bold">
                    Transcription
                </span>
            </h1>
            <div className="grid grid-cols-2 mx-auto bg-white shadow rounded full overflow-hidden items-center">
                <button onClick={() => {
                    setTab('transcription')
                }} className={tab === 'transcription' ? 'bg-blue-400 text-white' : 'px-4y'}>
                    Transcription
                </button>
                <button onClick={() => {
                    setTab('translation')
                }} className={tab === 'translation' ? 'bg-blue-400 text-white' : 'px-4y'}>
                    Translation
                </button>
            </div>
    </main>
  )
}
