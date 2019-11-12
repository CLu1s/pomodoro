import React from "react";
import audio from '../media/sci_fi_beep.mp3'


function PlayAudio({callback}){
  setTimeout(()=>callback(),3000)
  return(
    <div>
      <audio src={audio} controls autoPlay/>
    </div>
  )
}

export default PlayAudio