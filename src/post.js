import React, { useEffect, useState } from 'react'
import './post.css';
import {db} from './firebase'
import firebase from "firebase/compat/app";


import Avatar from "@material-ui/core/Avatar";

//3:05
function Post({postId, user, username, caption, imageUrl}) {
   const [comments, setComments] = useState([]);
   const [comment, setComment] = useState('');

  useEffect(()=> {
    let unsubscribe;
    if(postId) {
      unsubscribe = db.collection('post').doc(postId).collection('comments').onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      })
    }
    return () => {
      unsubscribe();
    }
  }, [postId])
   //dependency


   const postComment = (event) =>  {
       event.preventDefault();
      if(user) {
       db.collection('post').doc(postId).collection('comments').add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
       });
       setComment('');
      }
      else{
        alert("login to comment")
      }
   }



  return (


    <div className="post">
        <div className='post_header'>
        <Avatar className="post_avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

           <div className='username'>  
           <h4>{username}</h4>
           {/* <h4 className='location'>location</h4> */}
           </div>

        </div>

      <img className="post_image" src={imageUrl}></img>
      <h4 className="post_text"><strong>{username}</strong>: {caption}</h4>

     <div className='post_comments'>
      {comments.map((comment)=> (
        <p>
        <strong>{comment.username}</strong> {comment.text}
        </p>
      ))}
     </div>
    
     <form className='comment'> 
      <input 
      className='comment_input'
      type="text"
      placeholder='add your comment ...'
      value={comment}
      onChange={(e)=> setComment(e.target.value)}
      />

      <button 
      className='comment_button'
      disabled={!comment}
      type="submit"
      onClick={postComment}
      >Post</button>
     </form>
    </div>
  )
}

export default Post