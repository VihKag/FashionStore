import axios from 'axios';
const API_ADD_PRODUCT = 'http://localhost:8080/api/products/create';
const API_GET_PRODUCTDETAILS = 'http://localhost:8080/api/products/details';
const API_GET_PRODUCT = 'http://localhost:8080/api/products';
const addProduct = async (products)=>{
    try{
        const response = await axios.post(API_ADD_PRODUCT,products);
        return response;
    }catch (error){
        return console.log("Create failed",error);;
    }
}

const getProductDetails = async (page)=>{
    try{
        const response = await axios.get(API_GET_PRODUCTDETAILS,{
            params: {
                page: page,
            }
        });
        return response.data;
    }catch (error){
        return console.log("Get Product Details Failed", error);
    }
}

const getProduct= async (page)=>{
    try{
        const response = await axios.get(API_GET_PRODUCT,{
            params: {
                page: page,
            }
        });
        return response.data;
    }catch (error){
        return console.log("Get Product Details Failed", error);
    }
}
export {addProduct, getProductDetails, getProduct};