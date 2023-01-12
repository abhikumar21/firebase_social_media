import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

//2:11:00 


function App() {

  const [posts, setPosts] = useState([
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  
  const style = {
    position: 'absolute', 
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 8,
    pb: 2,
  };

  useEffect(()=> {
  const unsubscribe =  auth.onAuthStateChanged((authUser)=> {
      if(authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser);
      }
      else{
        setUser(null);
        //user logged out
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);



   useEffect(()=> {
     db.collection('post').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc=> ({
        id: doc.id,
        post: doc.data()
      })));
     })
   }, []);
 

   const [openSignin, setOpenSignin] = useState(false);
   const handleOpen_i = ()  => {
    setOpenSignin(true);
   }
   const handleClose_i= () => {
    setOpenSignin(false);
   }

   const [open, setOpen] = useState(false);
   const handleOpen = () => {
     setOpen(true);
   };
   const handleClose = () => {
     setOpen(false);
   };


   const signUp =(event) => {
     event.preventDefault();

     auth.createUserWithEmailAndPassword(email, password)
     .then((authUser)=> {
      alert("sign up successful")
      return authUser.user.updateProfile({
        displayName: username
      })
     }).catch((error) => alert(error.message));

   }

   const signIn =(event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .then(alert("login successful"))
    .catch((error)=> alert(error.message));

    setOpenSignin(false);
   }

 


  return (
   <div className="app">
  


          {/* header ///////////////////*/}
         <div className="app_header">
             <img className="app_header_img" 
             src="https://edigitalagency.com.au/wp-content/uploads/instagram-logo-text-black-png.png" alt="">
             </img>

             {user ? (
            <Button onClick={()=> auth.signOut()}>Logout</Button>
          ): (
                         <div className='applogin'>
             <Button onClick={handleOpen_i}>Sign In</Button>
             <Button onClick={handleOpen}>Sign Up</Button>
             </div>
          )}
         </div>

          {/* modal ////////////// */}
          <div>
          <Modal
               open={openSignin}
               onClose={handleClose_i}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
             >
            <Box sx={style}>
             <form  className='app_signup'>
               <h2 id="child-modal-title">SocialRing</h2>

               <Input
               autoComplete='on' 
               placeholder='email'
               type="text"
               value={email}
               onChange={(e)=> setEmail(e.target.value)}
               />
               <Input 
               autoComplete='on'
               placeholder='password'
               type="text"
               value={password}
               onChange={(e)=> setPassword(e.target.value)}
               />
              <Button type="submit" onClick={signIn} className='submitbtn' >Sign In</Button>
  
             </form>
           </Box>
          </Modal>

          <Modal
             open={open}
             onClose={handleClose}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
           >
           <Box sx={style}>
            <form  className='app_signup'>
             <h2 id="child-modal-title">SocialRing</h2>
             <Input 
             autoComplete='on'
             type="text"
             placeholder='username'
             value={username}
             onChange={(e)=> setUsername(e.target.value)}
             />

             <Input
             autoComplete='on' 
             placeholder='email'
             type="text"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             />
             <Input 
             autoComplete='on'
             placeholder='password'
             type="text"
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
             />
             <Button type="submit" onClick={signUp} className='submitbtn' >Sign Up</Button>
  
             </form>
            </Box>
          </Modal>

          </div> 


        {/* sidebar//////////////// */}
      <div className='content'>

        <div className='sidebar'>
          <button className='btn'>
            Home
          </button>

          <button className='btn'>
            Search
          </button>

          <button className='btn'>
            Explore
          </button>

          <button className='btn'>
            News
          </button>

          <button className='btn'>
            Messages
          </button>

          <button className='btn'>
            Notifications
          </button>

          <button className='btn'>
            Upload Profile
          </button>
        </div>

          {/* post //////////////// */}
     <div className='post_group'>
       {
         posts.map(({post, id})=> {
           return <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}  />
         })
       }
      </div>

    <div className='image_upload'>
    {user?.displayName ? (
      <ImageUpload username={user.displayName}/>
    ) : (
      <h3>Login to upload posts</h3>
    )}
    </div>
    </div>

    </div>
    
  );
};

export default App;

