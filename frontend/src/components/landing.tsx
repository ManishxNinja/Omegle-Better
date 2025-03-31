import { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const[name,setName] = useState();
  const value = (event: any) => {
    setName(event.target.value);
    console.log(name);
  }
  return ( 
    <div className="flex">
      <input onChange={value}></input>
      <Link to={`/room/?name=${name}`} >Join</Link>
    </div>
   );
}
 
export default Landing;