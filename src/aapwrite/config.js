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
  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.aapwriteDatabaseId,
        conf.aapwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
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
        conf.aapwriteCollectionId,
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
        conf.aapwriteCollectionId,
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
        conf.aapwriteCollectionId,
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
        conf.aapwriteCollectionId,
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
        conf.aapwriteStorageId,
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
      await this.bucket.deleteFile(conf.aapwriteStorageId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteFile ::", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.aapwriteStorageId, fileId);
  }
}

const service = new Service();

export default service;
