import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type PencilShape = {
    type: "pencil";
    points: { x: number; y: number }[];
    color?: string;
};

type Shape =
    | {
          type: "rectangle";
          x: number;
          y: number;
          width: number;
          height: number;
          color?: string;
      }
    | {
          type: "circle";
          centerX: number;
          centerY: number;
          radius: number;
          color?: string;
      }
    | PencilShape;


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
    private currentPencilPoints: { x: number; y: number }[] | null = null;
    private color: string = "#ffffff";

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

    setTool(tool: Tool) {
        this.selectedtool = tool;
    }

    setColor(color: string) {
        this.color = color;
    }

   async init(){
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas(); 
    }

    initHandlers(){
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type == "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape);
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
                  this.ckt.strokeStyle=shape.color || "#ffffff";
                this.ckt.strokeRect(shape.x,shape.y,shape.width,shape.height)
            }else if(shape.type=="circle"){
                    
                    this.ckt.beginPath();
                    this.ckt.strokeStyle=shape.color || "#ffffff";
                    this.ckt.arc(shape.centerX,shape.centerY,Math.abs(shape.radius),0,Math.PI * 2);
                    this.ckt.stroke();
                    this.ckt.closePath();
                }else if(shape.type=="pencil"){
                    this.ckt.strokeStyle=shape.color || "#ffffff";
                    this.drawPencil(shape.points);
                }
        })
    }

    initMouseHandlers(){
         this.canvas.addEventListener("mousedown", (e) => {
            this.clicked = true;
            this.startX = e.clientX;
            this.startY = e.clientY;
            if (this.selectedtool === "pencil") {
                this.currentPencilPoints = [{ x: e.clientX, y: e.clientY }];
            }
        });


         this.canvas.addEventListener("mouseup",(e)=>{
                // (No eraser logic in mouseup)
                if (this.selectedtool === "pencil" && this.currentPencilPoints) {
                    // Finish pencil stroke
                    this.currentPencilPoints.push({ x: e.clientX, y: e.clientY });
                    const shape: PencilShape = {
                        type: "pencil",
                        points: this.currentPencilPoints,
                        color: this.color,
                    };
                    this.existingShapes.push(shape);
                    this.socket.send(
                        JSON.stringify({
                            type: "chat",
                            message: JSON.stringify({ shape }),
                            roomId: this.roomId,
                        })
                    );
                    this.currentPencilPoints = null;
                    this.clicked = false;
                    this.clearCanvas();
                    return;
                }
                this.clicked = false;
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
                    height:height,
                    color: this.color
                }
                
            }else if(selectedtool=="circle"){
                let width = e.clientX - this.startX;
                let height = e.clientY - this.startY;
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;
                const radius = Math.max(width, height) / 2;
                shape = {
                    type: "circle",
                    radius: Math.abs(radius),
                    centerX,
                    centerY,
                    color: this.color
                }
                
            }
            if(!shape){
                return;
            }

            this.existingShapes.push(shape)

            this.socket.send(JSON.stringify({
                   type:"chat",
                   message:JSON.stringify({ shape }),
                   roomId:this.roomId
                }))
             
            })

         
        this.canvas.addEventListener("mousemove",(e)=>{

            if(this.clicked){
                this.clearCanvas()
                this.ckt.strokeStyle=this.color;

                //@ts-ignore
                const selectedtool=this.selectedtool;

                if(selectedtool=="rectangle"){
                let width=e.clientX-this.startX;
                let height=e.clientY-this.startY;
                this.ckt.strokeRect(this.startX,this.startY,width,height)}

                else if(selectedtool=="circle"){
                    let width=e.clientX-this.startX;
                    let height=e.clientY-this.startY;
                    const centerX=this.startX+width /2;
                    const centerY=this.startY+height / 2;
                    const radius=Math.max(width,height)/2;
                    this.ckt.beginPath();
                    this.ckt.arc(centerX,centerY,Math.abs(radius),0,Math.PI * 2);
                    this.ckt.stroke();
                    this.ckt.closePath();
                }else if(selectedtool=="pencil"){
                    if (this.currentPencilPoints) {
                        this.currentPencilPoints.push({ x: e.clientX, y: e.clientY });
                        this.ckt.strokeStyle=this.color;
                        this.drawPencil(this.currentPencilPoints);
                    }
                }

               
              
            } 
            })
    }

    drawPencil(points: { x: number; y: number }[]) {
        if (points.length < 2) return;
        this.ckt.beginPath();
        this.ckt.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ckt.lineTo(points[i].x, points[i].y);
        }
        this.ckt.stroke();
        this.ckt.closePath();
    }
}