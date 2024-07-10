// import conf from "../conf/conf";
// import { Client, Databases, ID, Storage } from "appwrite";

// export class Service {
//   client = new Client();
//   databases;
//   bucket;

//   constructor() {
//     this.client
//       .setEndpoint(conf.appwriteUrl)
//       .setProject(conf.appwriteProjectId);
//     this.databases = new Databases(this.client);
//     this.bucket = new Storage(this.client);
//   }

//   //Document

//   //create doc
//   async createPost({ title, content, featuredImage, status, userId }) {
//     try {
//       const uniqueId = ID.unique();
//       return await this.databases.createDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         uniqueId,
//         {
//           title,
//           content,
//           featuredImage,
//           status,
//           userId,
//         }
//       );
//     } catch (error) {
//       console.log("Appwrite service :: createPost :: error", error);
//     }
//   }

//   //Update doc
//   async updatePost(slug, { title, content, featuredImage, status }) {
//     try {
//       return await this.databases.updateDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         slug,
//         {
//           title,
//           content,
//           featuredImage,
//           status,
//         }
//       );
//     } catch (error) {
//       console.log("Appwrite service :: updatePost :: error", error);
//     }
//   }

//   async deletePost(slug) {
//     try {
//       await this.databases.deleteDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         slug
//       );
//       return true;
//     } catch (error) {
//       console.log("Appwrite service :: deletePost :: error", error);
//       return false;
//     }
//   }

//   //Get doc
//   async getPost(slug) {
//     try {
//       return await this.databases.getDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         slug
//       );
//     } catch (error) {
//       console.log("Appwrite serive :: getPost :: error", error);
//       return false;
//     }
//   }

//   //List doc

//   async getPosts() {
//     try {
//       return await this.databases.listDocuments(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
       
//       );
//     } catch (error) {
//       console.log("Appwrite serive :: getPosts :: error", error);
//       return false;
//     }
//   }
 


//   //File

//   //file upload service
//   async uploadFile(file) {
//     try {
//       return await this.bucket.createFile(
//         conf.appwriteBucketId,
//         ID.unique(),
//         file
//       );
//     } catch (error) {
//       console.log("Appwrite service :: uploadFile:: error", error);
//       return false;
//     }
//   }
//   //Delete File
//   async deleteFile(fileId) {
//     try {
//       await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
//       return true;
//     } catch (error) {
//       console.log("Appwrite service :: deleteFile:: error", error);
//       return false;
//     }
//   }
//   //FilePreview
//   getFilePreview(fileId) {
//     return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
//   }
  
// }

// const service = new Service();
// export default service;

import conf from "../conf/conf";
import { Client, Databases, ID, Storage } from "appwrite";
import authService from './auth'; // Import the AuthService

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Document

  // Create doc
  async createPost({ title, content, featuredImage, status, userId }) {
    try {
      const uniqueId = ID.unique();
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        uniqueId,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  // Update doc
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const post = await this.getPost(slug);

      if (post.userId !== await this.getCurrentUserId()) {
        throw new Error("Unauthorized");
      }

      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      const post = await this.getPost(slug);

      if (post.userId !== await this.getCurrentUserId()) {
        throw new Error("Unauthorized");
      }

      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // Get doc
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  // List doc
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // File

  // File upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile:: error", error);
      return false;
    }
  }

  // Delete File
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile:: error", error);
      return false;
    }
  }

  // FilePreview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }

  // Helper method to get the current user's ID
  async getCurrentUserId() {
    try {
      const user = await authService.getCurrentUser();
      return user.$id;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUserId :: error", error);
      throw new Error("Unable to get current user");
    }
  }
}

const service = new Service();
export default service;
