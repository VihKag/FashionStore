import axios from 'axios';
const API_USER_CUSTOMERS = 'http://localhost:8080/api/customers/list';
const listcustomers = async ({page}) => {
    try{
        const response =await axios.get(API_USER_CUSTOMERS,{
            params:{
                page: page,

        }});
        return response.data;
        }
        catch(error){
            console.error(error);
        };
}

const API_USER_STAFFS = 'http://localhost:8080/api/admin/list';
const liststaffs = async ({page}) => {
    try{
        const response =await axios.get(API_USER_STAFFS,{
            params:{
                page: page,

        }});
        return response.data;
        }
        catch(error){
            console.error(error);
        };
}
export {listcustomers,liststaffs};

