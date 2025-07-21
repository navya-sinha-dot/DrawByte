import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export  async function getExistingShapes(roomId:number){
        const res= await axios.get(`${HTTP_BACKEND}/chat/${roomId}`)
        const messages=res.data.messages;

        const shapes= messages.map((x:{message:string})=>{
            try {
                return JSON.parse(x.message);
            } catch (e) {
                return null;
            }
        }).filter(Boolean);
        return shapes;
    }
