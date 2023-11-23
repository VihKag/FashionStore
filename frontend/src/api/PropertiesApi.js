import axios from 'axios';
const API_LIST_COLOR = "http://localhost:8080/api/products/color";
const API_LIST_SIZE ="http://localhost:8080/api/products/size";

const getListColor = async () =>{
    try{
        const response = await axios.get(API_LIST_COLOR);
        return response;
    }catch(err){
        console.error(err);
    };

}
const getListSize = async () =>{
    try{
        const response = await axios.get(API_LIST_SIZE);
        return response;
    }catch(err){
        console.error(err);
    };

}
export {getListColor, getListSize};