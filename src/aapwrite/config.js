import { conf } from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.aapwriteURL)
      .setProject(conf.aapwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({
    title,
    slug,
    content,
    featureImage,
    status,
    userId,
    name,
  }) {
    try {
      return await this.database.createDocument(
        conf.aapwriteDatabaseId,
        conf.aapwriteArticleCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
          name,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost ::", error);
    }
  }
  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      await this.database.updateDocument(
        conf.aapwriteDatabaseId,
        conf.aapwriteArticleCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: updatePost ::", error);
      return false;
    }
  }
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.aapwriteDatabaseId,
        conf.aapwriteArticleCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost ::", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.aapwriteDatabaseId,
        conf.aapwriteArticleCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost ::", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.aapwriteDatabaseId,
        conf.aapwriteArticleCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts ::", error);
      return false;
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.aapwriteImageStorageId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: uploadFile ::", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.aapwriteImageStorageId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteFile ::", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.aapwriteImageStorageId, fileId);
  }

  async getProfile(email) {
    try {
      const queries = [Query.equal("email", `${email}`)];
      return await this.database.listDocuments(
        conf.aapwriteDatabaseId,
        conf.aapwriteProfileCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getProfile ::", error);
      return false;
    }
  }
  async createProfile({ username, email, discription, Avatar }) {
    try {
      return await this.database.createDocument(
        conf.aapwriteDatabaseId,
        conf.aapwriteProfileCollectionId,
        ID.unique(),
        {
          username,
          email,
          discription,
          Avatar,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createProfile ::", error);
    }
  }
  async updateProfile(slug, { username, email, discription, Avatar }) {
    try {
      await this.database.updateDocument(
        conf.aapwriteDatabaseId,
        conf.aapwriteProfileCollectionId,
        slug,
        {
          username,
          email,
          discription,
          Avatar,
        }
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: updatePost ::", error);
      return false;
    }
  }
}

const service = new Service();

export default service;
