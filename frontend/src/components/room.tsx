import { useSearchParams } from "react-router-dom";

const Room = () => {
  const[searchParams,setSearchParams] = useSearchParams();
  const name = searchParams.get("name")? searchParams.get("name"): "Room";
  return ( 
    <div>
      {name}
    </div>
   );
}
 
export default Room;