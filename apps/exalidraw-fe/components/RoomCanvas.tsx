"use client"

import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}:{roomId:number}){
    const [socket, setsocket] = useState<WebSocket | null>(null);
    const prevRoomId = useRef<number | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1MDc0ODY0OH0.bA9poO7ZOOpOfPPXXmmepvdnqN8juJMX34pScV2dvrQ`);
        ws.onopen = () => {
            setsocket(ws);
        };
        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        // Leave previous room if any
        if (prevRoomId.current !== null) {
            socket.send(JSON.stringify({ type: "leave_room", roomId: prevRoomId.current }));
        }
        // Join current room
        socket.send(JSON.stringify({ type: "join_room", roomId }));
        prevRoomId.current = roomId;
    }, [roomId, socket]);

    if (!socket) {
        return <div> Connecting to server....</div>;
    }
    return <div>
        <Canvas roomId={roomId} socket={socket}/>
    </div>;
}