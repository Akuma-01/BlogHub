import { Client, Databases, ID, Permission, Query, Role, Storage } from "appwrite";
import conf from '../conf/conf';

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

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument({
				databaseId: conf.appwriteDatabaseId,
				collectionId: conf.appwriteCollectionId,
				documentId: ID.unique(),
				data: {
					title,
					slug,
					content,
					featuredImage,
					status,
					userId,
				},
			})
		} catch (error) {
			console.log("Appwrite service :: createPost :: error", error);
		}
	}

	async updatePost(documentId, { title, slug, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument({
				databaseId: conf.appwriteDatabaseId,
				collectionId: conf.appwriteCollectionId,
				documentId,
				data: {
					title,
					slug,
					content,
					featuredImage,
					status,
				},
			});
		} catch (error) {
			console.log("Appwrite service :: updatePost :: error", error);
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument({
				databaseId: conf.appwriteDatabaseId,
				collectionId: conf.appwriteCollectionId,
				documentId: slug,
			})
			return true;
		} catch (error) {
			console.log("Appwrite service :: deletePost :: error", error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument({
				databaseId: conf.appwriteDatabaseId,
				collectionId: conf.appwriteCollectionId,
				documentId: slug,
			})
		} catch (error) {
			console.log("Appwrite service :: getPost :: error", error);
			return false;
		}
	}

	async getPostBySlug(slug) {
		try {
			const posts = await this.databases.listDocuments({
				databaseId: conf.appwriteDatabaseId,
				collectionId: conf.appwriteCollectionId,
				queries: [Query.equal("slug", slug)],
			})

			return posts.documents[0]
		} catch (error) {
			console.log("Appwrite service :: getPostBySlug :: error", error)
			return false
		}
	}


	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments({
				databaseId: conf.appwriteDatabaseId,
				collectionId: conf.appwriteCollectionId,
				queries,
			})
		} catch (error) {
			console.log("Appwrite service :: getPosts :: error", error);
			return false;
		}
	}

	// file upload service
	async uploadFile(file) {
		try {
			return await this.bucket.createFile({
				bucketId: conf.appwriteBucketId,
				fileId: ID.unique(),
				file,
				permissions: [
					Permission.read(Role.users()),
				],
			})
		} catch (error) {
			console.log("Appwrite service :: uploadFile :: error", error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile({
				bucketId: conf.appwriteBucketId,
				fileId,
			})
			return true;
		} catch (error) {
			console.log("Appwrite service :: deleteFile :: error", error);
			return false;
		}
	}

	getFilePreview(fileId) {
		return this.bucket.getFileView({
			bucketId: conf.appwriteBucketId,
			fileId
		});
	}
}

const service = new Service();
export default service;
