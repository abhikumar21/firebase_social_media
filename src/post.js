import React from 'react'
import './post.css';

import Avatar from "@material-ui/core/Avatar";
// 49:00

function post({ username, caption, imageUrl}) {
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

    </div>
  )
}

export default post