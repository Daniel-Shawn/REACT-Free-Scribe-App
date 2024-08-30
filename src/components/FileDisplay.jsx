export default function FileDisplay(props){
    const {file, setAudioStream, audioReset} = props

    return(
        <main className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center p-4 text-center pb-20 w-fit max-w-full mx-auto" >
            <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl" >
                Your 
                <span className="text-blue-400 bold">
                    File
                </span>
            </h1>
            <div className="mx-auto flex flex-col text-left my-4" >
                <h3 className="font semibold" >Name</h3>
                <p>{file ? file.name : 'Custom audio'}</p>
            </div>
            <div className="flex items-center justify-between gap-4" >
                <button className="text-slate-400 hover:text-blue-400" onClick={audioReset} >Reset</button>
                <button className="specialBtn p-2 rounded-lg text-blue-400 flex-items-center gap-2" >
                    <p>Transcribe</p>
                    <i className="fa-solid fa-pen-nib" ></i>
                </button>
            </div>
        </main>
    )
}