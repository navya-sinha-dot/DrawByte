"use client"
import { initDraw } from "@/draw";
import { Socket } from "dgram";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {Circle, Pencil, RectangleHorizontalIcon} from "lucide-react"
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rectangle" | "pencil";

export function Canvas({roomId,socket}:{roomId:number,socket:WebSocket}){
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const [selectedtool, setselectedtool]=useState<Tool>("circle")
    const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
    const [game,setGame]=useState<Game>();

    useEffect(()=>{
       game?.setTool(selectedtool);
    },[selectedtool,game])

    useEffect(()=>{
      game?.setColor?.(selectedColor);
    },[selectedColor,game])

    useEffect(()=>{
    if(canvasRef.current){
        const g=new Game(canvasRef.current,roomId,socket);
        setGame(g);
    }
    },[canvasRef, roomId, socket])

    return <div className="h-100vh overflow-hidden">
          <canvas  ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
          <TopBar selectedtool={selectedtool} setselectedtool={setselectedtool} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
      
    </div>
}

const COLORS = [
  "#d3d3d3", // light gray
  "#ff8a8a", // pink
  "#4caf50", // green
  "#4fa3ff", // blue
  "#b86b21", // brown
  "#7ecbff", // light blue
];

function TopBar({selectedtool,setselectedtool,selectedColor,setSelectedColor}:{
    selectedtool:Tool,
    setselectedtool:(s:Tool)=>void,
    selectedColor: string,
    setSelectedColor: (c: string) => void
}){
    return (
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-row items-center gap-6 bg-[#23232a] rounded-xl px-6 py-3 shadow-lg border border-[#23232a]">
        {/* Tool icons */}
        <div className="flex items-center gap-2">
          <IconButton activated={selectedtool==="pencil"} icon={<Pencil/>} onClick={()=>{setselectedtool("pencil")}}/>
          <IconButton activated={selectedtool==="rectangle"} icon={<RectangleHorizontalIcon/>} onClick={()=>{setselectedtool("rectangle")}}/>
          <IconButton activated={selectedtool==="circle"} icon={<Circle/>} onClick={()=>{setselectedtool("circle")}}/>
        </div>
        {/* Color swatches */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-300 mr-2">Stroke</span>
          {COLORS.map((color) => (
            <button
              key={color}
              className={`w-7 h-7 rounded-md border-2 transition-colors ${selectedColor === color ? "border-blue-400" : "border-transparent"}`}
              style={{ background: color }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
    );
}
