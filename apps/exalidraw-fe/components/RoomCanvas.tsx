"use client"

import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}:{roomId:number}){
    const [socket,setsocket]=useState<WebSocket | null >(null);

    useEffect(()=>{
    
    const ws= new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1MDc0ODY0OH0.bA9poO7ZOOpOfPPXXmmepvdnqN8juJMX34pScV2dvrQ`)
    ws.onopen=()=>{
    setsocket(ws)
    ws.send(JSON.stringify({
        type:"join_room",
        roomId
    }))
    }
    },[])

    if(!socket){
        return <div> Connecting to server....</div>
    }
return <div>
        <Canvas roomId={roomId} socket={socket}/> 
    </div>
}