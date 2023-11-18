import UserCustomer from "../components/Table/UserCustomer";
import UserSale from "../components/Table/UserSale";

const User = ()=>{
    return(
        <>          
            <div className="mb-8 border p-4">
            <UserSale />
            </div>
            <div className="mb-8 border p-4">
            <UserCustomer />
            </div>
            
        </>
    );
}
export default User;