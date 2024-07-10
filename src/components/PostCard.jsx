



import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "./index";

function PostCard({ $id, title, featuredImage }) {
  const [deleting, setDeleting] = useState(() => {
    // Initialize the deleting state from localStorage
    return localStorage.getItem(`deleting-${$id}`) === 'true' ? true : false;
  });
  const navigate = useNavigate();

  const deletePost = () => {
    if (deleting) return; // Prevent multiple deletion requests

    if (window.confirm("Are you sure you want to delete this post?")) {
      setDeleting(true); // Set deleting state to true to disable the button

      appwriteService.deletePost($id)
        .then((status) => {
          if (status) {
            appwriteService.deleteFile(featuredImage);
            navigate("/");
          }
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
        })
        .finally(() => {
          // Reset deleting state regardless of deletion result
          setDeleting(false);
          // Clear the deleting state from localStorage
          localStorage.removeItem(`deleting-${$id}`);
        });
    }
  };

  useEffect(() => {
    // Save the deleting state to localStorage whenever it changes
    localStorage.setItem(`deleting-${$id}`, deleting);
  }, [$id, deleting]);

  return (
    <div className='w-full bg-gray-300 rounded-xl p-4'>
      <Link to={`/post/${$id}`}>
        <div className='w-full  mb-3' >
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl w-full h-72' style={{height:'250px'}} />
        </div>
        <h2 className='text-lg font-bold '>{title}</h2>
      </Link>
      
      <div className="flex justify-between items-center mt-2 flex-col sm:flex-row w-full">
  <button
    onClick={deletePost}
    className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mt-2 sm:mt-0 ${deleting ? 'opacity-50 pointer-events-none' : ''}`}
  >
    {deleting ? 'Deleting...' : 'Delete'}
  </button>
  <Link
    to={`/edit-post/${$id}`}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mt-2 sm:mt-0"
  >
    Edit
  </Link>
</div>

    </div>
  );
}

export default PostCard;
