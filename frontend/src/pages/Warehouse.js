import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Warehouse = () =>{
    const wh = [
        {id: 1, name: "HCM-Q9"},
        {id: 1, name: "HN-BGw"},
        {id: 1, name: "DON-BH"},
        {id: 1, name: "DAN-DN"},
    ];
    return(
        <>
            <div className="text-4xl font-bold">Kho hàng</div>
            <div className="flex mb-8 border p-4">
                {wh.map((wh)=>(
                    <div className="w-1/4 m-2 border-2 bg-gray-800 hover:bg-gray-900 transition-all hover:scale-105 text-white">
                        <div className="flex justify-center p-2"><FontAwesomeIcon icon={faWarehouse} size="2xl"/></div>
                        <div className="flex justify-center p-2 text-2xl">HCM-Q9</div>
                    </div>   
                ))}                 
            </div>            
        </>
    );
}
export default Warehouse;