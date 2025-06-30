import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

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


export class Game{
    private canvas:HTMLCanvasElement;
    private ckt:CanvasRenderingContext2D;
    private existingShapes:Shape[];
    private roomId:number;
    private socket:WebSocket;
    private clicked :boolean;
    private startX:number;
    private startY:number;
    private selectedtool:Tool="circle"

    constructor(canvas:HTMLCanvasElement,roomId:number,socket:WebSocket){
        this.canvas=canvas;
        this.ckt= canvas.getContext("2d")!;
        this.existingShapes=[];
        this.roomId=roomId;
        this.socket=socket;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
        this.clicked=false;
        this.startX=0;
        this.startY=0;
    }

    setTool(tool:"circle"|"rectangle"|"pencil"){
        this.selectedtool=tool;
    }

   async init(){
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas(); 
    }

    initHandlers(){
          this.socket.onmessage=(event)=>{
                const message=JSON.parse(event.data)
                if(message.type=="chat"){
                    const parsedShape=JSON.parse(message.message)
                    this.existingShapes.push(parsedShape)
                    this.clearCanvas();
                }
            }
    }

    clearCanvas(){
        this.ckt.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ckt.fillStyle="rgba(0,0,0)"
        this.ckt.fillRect(0,0,this.canvas.width,this.canvas.height)

        this.existingShapes.map((shape)=>{
            if(shape.type=="rectangle"){
                  this.ckt.strokeStyle="rgba(255,255,255)"
                this.ckt.strokeRect(shape.x,shape.y,shape.width,shape.height)
            }else if(shape.type=="circle"){
                    
                    this.ckt.beginPath();
                    this.ckt.arc(shape.centerX,shape.centerY,Math.abs(shape.radius),0,Math.PI * 2);
                    this.ckt.stroke();
                    this.ckt.closePath();
                }
        })
    }

    initMouseHandlers(){
         this.canvas.addEventListener("mousedown",(e)=>{
            this.clicked=true;
            this.startX=(e.clientX);
            this.startY=(e.clientY);
            })


         this.canvas.addEventListener("mouseup",(e)=>{

                this.clicked=false;
                let width=e.clientX-this.startX;
                let height=e.clientY-this.startY;
                
                //@ts-ignore
                const selectedtool=this.selectedtool
                let shape:Shape | null=null;
                if(selectedtool=="rectangle"){
                shape={
                    
                    type:"rectangle",
                    x:this.startX,
                    y:this.startY,
                    width:width,
                    height:height
                    
                }
                
            }else if(selectedtool=="circle"){
                const radius=Math.max(width,height)/2;
                shape={
                    type:"circle",
                    radius:radius,
                    centerX:this.startX+ radius,
                    centerY:this.startY+radius
                }
                
            }
            if(!shape){
                return;
            }

            this.existingShapes.push(shape)

            this.socket.send(JSON.stringify({
                   type:"chat",
                   message:JSON.stringify({
                    shape
                   }),
                   roomId:this.roomId
                }))
             
            })

         
        this.canvas.addEventListener("mousemove",(e)=>{

            if(this.clicked){
                let width=e.clientX-this.startX;
                let height=e.clientY-this.startY;
                this.clearCanvas()
                this.ckt.strokeStyle="rgba(255,255,255)"

                //@ts-ignore
                const selectedtool=this.selectedtool;

                if(selectedtool=="rectangle"){
                this.ckt.strokeRect(this.startX,this.startY,width,height)}

                else if(selectedtool=="circle"){
                    const centerX=this.startX+width /2;
                    const centerY=this.startY+height / 2;
                    const radius=Math.max(width,height)/2;
                    this.ckt.beginPath();
                    this.ckt.arc(centerX,centerY,Math.abs(radius),0,Math.PI * 2);
                    this.ckt.stroke();
                    this.ckt.closePath();
                }

               
              
            } 
            })
    }
}