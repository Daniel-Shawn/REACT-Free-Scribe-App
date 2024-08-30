import { useState } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'

function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const isAudioAvailable = file || audioStream
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)

  function audioReset(){
    setFile(null)
    setAudioStream(null)
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full" >
      <section className="min-h-screen flex flex-col" >
        <Header />
        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay audioReset={audioReset} file={file} audioStream={audioStream} />
        ) : <HomePage setFile={setFile} setAudioStream={setAudioStream} />}
      </section>
      <h1 className="text-green-400"> H1 tag </h1>
      <footer>
        footer
      </footer>
    </div>
  )
}

export default App
