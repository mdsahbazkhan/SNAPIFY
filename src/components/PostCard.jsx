import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
function PostCard({$id,title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-300 rounded-xl p-4'>
            <div className='w-full justify-center mb-3'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl w-full h-auto'style={{height: '150px' }}/>
                
            </div>
            <h2 className='text-sm font-bold '>{title}</h2>
        </div>
      
    </Link>
  )
}

export default PostCard
