"use client"

import { useRef, useState, useEffect, ChangeEvent, ChangeEventHandler } from "react"
import { Input } from "@/components/ui/input"
import { Button} from "@/components/ui/button"

export default function Countdown (){
    const[duration, setDuration] = useState<number | string>("");
    const[timeLeft, setTimeLeft] = useState<number> (0);// this state is to tell remaining time
    const[isActive, setIsActive] = useState<boolean>(false);// is timer running or not
    const[isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null >(null);  //this is reference to remember the timer id so that you can control timer's start, duration , restart and pause


    const handleSetDuration = (): void => {
        if(typeof duration === "number" && duration> 0){
            setTimeLeft(duration);//time left state updated
            setIsActive(false);// reset timer
            setIsPaused(false);// reset timer
            if(timerRef.current){//if any previous time is active, clear it and run current time
                clearInterval(timerRef.current)
            }
        }
    };

    const handleStart =(): void =>{// this makes start button working as it is pressed
        if(timeLeft >0){ //this condition checks that timer ka waqat abhi katam nahi hua
            setIsActive(true); //keeps timer active
            setIsPaused(false);//rukay huay timer ko active
        }
    };

    const handlePause = ():void =>{
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){//if any previous time is active, clear it and run current time
                clearInterval(timerRef.current)
        }
    }
};
const handleReset = ():void => {
    setIsPaused(false);
            setIsActive(false);
            setTimeLeft(typeof duration ==="number"?duration:0)
                if(timerRef.current){
                    clearInterval(timerRef.current)
                
            }
};
useEffect(()=>{
    if(isActive && !isPaused) {
        timerRef.current = setInterval(()=>{// it will minus 1 sec from timer
            setTimeLeft((prevTime)=> {// it will update timer's value until 0 and stop at 0
                if( prevTime <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prevTime -1;
            });
        },1000)
    }
    return () => {
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    };
}, [isActive, isPaused])
const formatTime = (time:number): string =>{ //time will be converted into minutes
    const minutes = Math.floor(time/60);
    const seconds = time % 60;// it will convert minutes into seconds
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`// if a user has added 9 sec then 0 be added before 9
};
const handleDurationChange = (e: ChangeEvent<HTMLInputElement>):void =>{// this function will set time whenever a user puts time init
    setDuration(Number(e.target.value)|| "")// it will ensure that all value should be converted in number
}

return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-200">
      <h1 className="text-3xl font-bold mb-4">Countdown Timer</h1>
      <Input
        type="number"
        value={duration}
        onChange={handleDurationChange}
        placeholder="Enter duration in seconds"
        className="w-full max-w-md mb-4"
      />
      <Button onClick={handleSetDuration} className="mb-4">
        Set Duration
      </Button>
      <div className="text-5xl font-bold mb-4">
        {formatTime(timeLeft)}
      </div>
      <div className="flex">
      <Button onClick={handleStart} className="mb-4">
        Start
      </Button>
      <Button onClick={handlePause} className="mb-4">
        Pause
      </Button>
      <Button onClick={handleReset} className="mb-4">
        Reset
      </Button>
    </div>
    </div>
  );
}
 