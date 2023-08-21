import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const Protected = (props) => {
    let Component = props.component;
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem("user-info")) {
          navigate("/register");
        }
      }, []);

  return (
    <div>
        <Component />
    </div>
  )
}

export default Protected