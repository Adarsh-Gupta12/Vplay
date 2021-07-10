import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
 const userSignin = useSelector((state) => state.userSignin);
 const { userInfo } = userSignin;
   let history = useHistory();
  useEffect(() => {
    if (!userInfo) {
       history.push('/signin');
    }
  }, [history, userInfo]);

  return (
    <>
    <div>
     <Link to={'/bookslot'}>  
      <button>Book your slot</button>
     </Link>
    </div>
    <br></br>
    <div>
      <Link to={'/slotlist'}>
        <button>View your slots</button>
      </Link>
    </div>
    </>
  );
}
