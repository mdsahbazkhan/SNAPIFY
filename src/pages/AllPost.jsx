// import React, { useState, useEffect } from "react";
// import { Container, PostCard } from "../components";
// import appwriteService from "../appwrite/config";

// function AllPost() {
//   const [posts, setPosts] = useState([]);
    

 
//   useEffect(() => {}, [])
//   appwriteService.getPosts([]).then((posts) => {
//       if (posts) {
//           setPosts(posts.documents)
//       }
//   })
  
 
//   return (
//     <div className="w-full py-8">
//       <Container  >
//         <div className=" flex flex-wrap">
//           {posts.map((post) => (
//             <div key={post.$id} className="p-2 w-1/3">
//               <PostCard {...post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }


// export default AllPost;
import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full py-8 text-center">
      <Container>
        {loading ? (
          <h1 className="text-3xl font-bold hover:text-white">Loading...</h1>
        ) : posts.length === 0 ? (
          <h1 className="text-3xl font-bold hover:text-white">No post available</h1>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/3">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPost;
