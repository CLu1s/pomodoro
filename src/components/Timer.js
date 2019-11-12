import React, { useState, useEffect } from "react";
import PlayAudio from './PlayAudio'

function Timer() {
  const pomodoroInterval = 25;
  const shortBrake = 5
  const longBreak = 15
  const pomodoros = 4
  const [time, setTime] = useState(pomodoroInterval * 60);
  const [pomodoro, setPomodoro] = useState(1)
  const [restFlag, setRestFlag] = useState(false)
  const [audioStatus, setAudioStatus] = useState(false)
  const [buttonText, setButtonText] = useState("Pause")
  const [label, setLabel] = useState("Pomodoro")
  useEffect(() => {
    if(buttonText === 'Pause'){
      if (time !== 0 ) {
        setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else {
        pomodoroCount()
      }
    }
  });
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  function pomodoroCount(){
    let message
    let pomodoroCount = pomodoro
    let interval
    let flag
    let label
    if(pomodoro < pomodoros && !restFlag){
      message = "Tiempo de un brake";
      interval = shortBrake
      flag = true
      label = 'Pomodoro'
    }else if(pomodoro < pomodoros && restFlag ){
      message = "Es hora de regresar a trabajar!"
      pomodoroCount = pomodoro + 1
      interval = pomodoroInterval
      flag = false
      label = message
    }else if(pomodoro >= pomodoros){
      message = "Un merecido descanso largo!"
      pomodoroCount = 1
      interval = longBreak
      flag = true
      label = message
    } 
    notifyMe(message)
    setAudioStatus(true)
    setLabel(label)
    setPomodoro(pomodoroCount)
    setTime(interval * 60)
    setRestFlag(flag)
  }
  function pauseAndResume(){
    let newText
    if(buttonText === 'Pause'){
      newText = 'Resume'
    }else{
      newText = 'Pause'
    }
    setButtonText(newText)
  }
  function notifyMe(message) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      new Notification(message);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  }
  
  return (
    <div>
      <h2>{label === 'Pomodoro' ? `${label}: ${pomodoro}`: label}</h2>
      <h2>
        {minutes < 10 ? `0${minutes}`: minutes} :  {seconds < 10 ? `0${seconds}` :seconds}
      </h2>
      <div> <button onClick={pauseAndResume} >{buttonText}</button> </div>
      { audioStatus && <PlayAudio  callback={()=>setAudioStatus(false)}/> }
    </div>
  );
}

export default Timer;
