import Redis from "ioredis";
import {config} from "./config.js";

const redis = new Redis({
    host:"redis",
    port:config.REDIS_PORT,
    
});



export default redis