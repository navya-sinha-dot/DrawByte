import { HTTP_BACKEND } from "@/config";
import axios from "axios";


type Shape=
    {
    type:"rectangle";
    x:number;
    y:number;
    width:number;
    height:number;
} | {
    type:"circle";
    centerX:number;
    centerY:number;
    radius:number
}


export async function initDraw(canvas:HTMLCanvasElement,roomId:number,socket:WebSocket){
   const ckt= canvas.getContext("2d");

let existingShapes:Shape[] = await getExistingShapes(roomId);

            if(!ckt){
               return;
            }

            socket.onmessage=(event)=>{
                const message=JSON.parse(event.data)
                if(message.type=="chat"){
                    const parsedShape=JSON.parse(message.message)
                    existingShapes.push(parsedShape)
                    clearCanvas(existingShapes,ckt,canvas);
                }
            }
            
           clearCanvas(existingShapes,ckt,canvas);
            let clicked=false;
            let startX=0;
            let startY=0;

            canvas.addEventListener("mousedown",(e)=>{
                clicked=true;
                startX=(e.clientX);
                startY=(e.clientY);
            })


            canvas.addEventListener("mouseup",(e)=>{

                clicked=false;
                 let width=e.clientX-startX;
                let height=e.clientY-startY;
                
                //@ts-ignore
                const selectedtool=window.selectedtool
                let shape:Shape | null=null;
                if(selectedtool=="rectangle"){
                shape={
                    
                    type:"rectangle",
                    x:startX,
                    y:startY,
                    width:width,
                    height:height
                    
                }
                
            }else if(selectedtool=="circle"){
                const radius=Math.max(width,height)/2;
                shape={
                    type:"circle",
                    radius:radius,
                    centerX:startX+ radius,
                    centerY:startY+radius
                }
                
            }
            if(!shape){
                return;
            }

            existingShapes.push(shape)

            socket.send(JSON.stringify({
                   type:"chat",
                   message:JSON.stringify({
                    shape
                   })
                }))
             
            })


        canvas.addEventListener("mousemove",(e)=>{

            if(clicked){
                let width=e.clientX-startX;
                let height=e.clientY-startY;
                clearCanvas(existingShapes,ckt,canvas)
                ckt.strokeStyle="rgba(255,255,255)"

                //@ts-ignore
                const selectedtool=window.selectedtool;

                if(selectedtool=="rectangle"){
                ckt.strokeRect(startX,startY,width,height)}

                else if(selectedtool=="circle"){
                    const centerX=startX+width /2;
                    const centerY=startY+height / 2;
                    const radius=Math.max(width,height)/2;
                    ckt.beginPath();
                    ckt.arc(centerX,centerY,radius,0,Math.PI * 2);
                    ckt.stroke();
                    ckt.closePath();
                }

               
              
            } 
            })
           
        }  

    function clearCanvas(existingShapes:Shape[],ckt:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
        ckt.clearRect(0,0,canvas.width,canvas.height)
                ckt.fillStyle="rgba(0,0,0)"
                 ckt.fillRect(0,0,canvas.width,canvas.height)

        existingShapes.map((shape)=>{
            if(shape.type=="rectangle"){
                  ckt.strokeStyle="rgba(255,255,255)"
                ckt.strokeRect(shape.x,shape.y,shape.width,shape.height)
            }else if(shape.type=="circle"){
                    
                    ckt.beginPath();
                    ckt.arc(shape.centerX,shape.centerY,shape.radius,0,Math.PI * 2);
                    ckt.stroke();
                    ckt.closePath();
                }
        })
    }

    async function getExistingShapes(roomId:number){
        const res= await axios.get(`${HTTP_BACKEND}/chat/${roomId}`)
        const messages=res.data.messages;

        const shapes= messages.map((x:{message:string})=>{
            const messageData=JSON.parse(x.message)

            return messageData;
        })
        return shapes;
    }
