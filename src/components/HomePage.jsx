import {useState, useEffect, useRef} from 'react'


export default function HomePage(props){
    const {setFile, setAudioStream} = props


    const {recordingStatus, setRecordingStatus} = useState('inactive')
    const {audioChunks, setAudioChunks} = useState([])
    const {duration, setDuration} = useState(0)
    const mediaRecorder = useRef(null)

    const mimeType = 'audio/webm'


    function startRecording(){
        let tempStream;
        console.log("Start recording...")
        try{
            const streamData = navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        }
        catch(err) {
            console.log(err.message)
            return
        }

        setRecordingStatus('recording')

        const media = new mediaRecorder(tempStream, {type: mimeType})
        mediaRecorder.current = media
        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (e) => {
            if (typeof e.data === 'undefined'){return}
            if (e.data.size === 0){return}
            localAudioChunks.push(e.data)
        }
        setAudioChunks(localAudioChunks)
    }


    function stopRecording(){
        setRecordingStatus('inactive')
        console.log('Stoping the recording...')
        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, {type: mimeType})
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }
    }

    useEffect(() => {
        if (recordingStatus === 'inactive'){return}

        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000)

        return () => clearInterval(interval)
    })


    return (
        <main className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center p-4 text-center pb-20" >
            <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl" >
                Free
                <span className="text-blue-400 bold">
                    Scribe
                </span>
            </h1>
            <h3 className="font-medium">
                Record
                <span className="text-blue-400">
                    <i class="fa-solid fa-arrow-right mx-3"></i>
                </span>
                Transcribe
                <span className="text-blue-400">
                    <i class="fa-solid fa-arrow-right mx-3"></i>
                </span>
                Translate
            </h3>
            <button onClick={recordingStatus === 'inactive' ? startRecording : stopRecording} className="flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn rounded-xlg text-blue-400 px-4 py-2">
                <p className="text-blue-400">{recordingStatus === 'inactive' ? 'Record' : 'Stop Recording'}</p>
                <div className='flex items-center gap-2' >
                    {duration && (
                        <p className='text-sm' >{Math.floor(duration / 60)}:{duration % 60}</p>
                    )}
                    <i className={"fa-solid fa-microphone" + (recordingStatus === 'recording' ? "text-rose-400" : "")}></i>
                </div>
            </button>
            <p className="text-base">
                Or 
                <label className="gap-4 text-blue cursor-pointer text-blue-400 duration-200 mx-2" >
                    Upload 
                    <input  
                    type="file"
                    accept=".mp3,.wav"
                    className="hidden"
                    onChange={(e) => {
                        const tempFile = e.target.files[0]
                        setFile(tempFile)
                    }}
                    >
                        
                    </input>
                </label>
                a mp3 or wav file
            </p>
            <p className="italic text-slate-500">Free Now, Free Forever</p>
        </main>
    )
}


