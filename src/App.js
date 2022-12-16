import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './post';
import {db} from './firebase';

//1:25:00


function App() {

  const [posts, setposts] = useState([
    // {
    
    //   username: "cleverqazi",
    //   caption: "WOW",
    //   imageUrl:"https://images.pexels.com/photos/10733390/pexels-photo-10733390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    // },
    // {
      
    //   username: "abhi",
    //   caption: "WOW",
    //   imageUrl:"https://images.pexels.com/photos/10733390/pexels-photo-10733390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    // }
  ]);


   useEffect(()=> {
     db.collection('post').onSnapshot(snapshot => {
      setposts(snapshot.docs.map(doc=> ({
        id: doc.id,
        post: doc.data()
      })));
     })
   }, []);
 



  return (


    <div className="app">
 
            {/* header /////////////////////////////////////////////////////////*/}


         <div className="app_header">
  
             <img className="app_header_img" 
             src="https://edigitalagency.com.au/wp-content/uploads/instagram-logo-text-black-png.png" alt="">
             </img>

         </div>
    <h1>
    Lorem ipsum dolor
    </h1>


    

 {/* post ////////////////////////////////////////////////////////////////// */}

  {
    posts.map(({post, id})=> {
      return <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}  />
    })
  }
 
{/* 
  <Post username="cleverqazi" caption="wow it works" imageUrl="https://images.pexels.com/photos/5624397/pexels-photo-5624397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
  <Post username="cleverqazi" caption="wow works" imageUrl="https://images.pexels.com/photos/5624397/pexels-photo-5624397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
  <Post username="cleverqazi" caption="wow it works" imageUrl="https://images.pexels.com/photos/5624397/pexels-photo-5624397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /> */}
  



  </div>
    
  );
}

export default App;