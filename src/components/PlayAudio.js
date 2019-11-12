import React, { useState, useEffect } from "react";
import audio from '../media/sci_fi_beep.mp3'

const AudioPlayback = React.forwardRef((props, ref) =>(
  <audio src={audio} controls autoPlay/>
))

function PlayAudio(){
  const [ref, setRef] = useState()
  useEffect(()=>setRef(React.createRef()),[ref])
  // useEffect(()=>ref.current.play())
  console.log(ref)
  return(
    <div>
      <AudioPlayback ref={ref} />
    </div>
  )
}

export default PlayAudio