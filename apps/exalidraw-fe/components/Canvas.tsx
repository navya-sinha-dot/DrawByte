"use client"
import { initDraw } from "@/draw";
import { Socket } from "dgram";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {Circle, Pencil, RectangleHorizontalIcon} from "lucide-react"
import { Game } from "@/draw/Game";

export type Tool="circle"|"rectangle"|"pencil"

export function Canvas({roomId,socket}:{roomId:number,socket:WebSocket}){
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const [selectedtool, setselectedtool]=useState<Tool>("circle")
    const [game,setGame]=useState<Game>();

    useEffect(()=>{
       game?.setTool(selectedtool);
    },[selectedtool,game])


    
    useEffect(()=>{

    if(canvasRef.current){
        const g=new Game(canvasRef.current,roomId,socket);
        setGame(g);
    }

    },[canvasRef])

    return <div className="h-100vh overflow-hidden">
          <canvas  ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
          <TopBar selectedtool={selectedtool} setselectedtool={setselectedtool}/>
      
    </div>
}

function TopBar({selectedtool,setselectedtool}:{
    selectedtool:Tool,
    setselectedtool:(s:Tool)=>void 
}){
    return <div className="fixed top-10 left-10">
        <div className="flex gap-2">
            <IconButton activated ={selectedtool==="pencil"}icon={<Pencil/>} onClick={()=>{setselectedtool("pencil")}}/>
            <IconButton activated ={selectedtool==="rectangle"} icon={<RectangleHorizontalIcon/>} onClick={()=>{setselectedtool("rectangle")}}/>
            <IconButton activated ={selectedtool==="circle"} icon={<Circle/>} onClick={()=>{setselectedtool("circle")}}/>
        </div>
    </div>

}
