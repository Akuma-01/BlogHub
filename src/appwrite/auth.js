import { Account, Client, ID } from "appwrite";
import conf from '../conf/conf';

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);

		this.account = new Account(this.client)
	}

	async createAccount({ email, password, name }) {
		try {
			await this.account.create({
				userId: ID.unique(),
				email: email,
				password: password,
				name: name
			});

			return this.login({ email, password });

		} catch (error) {
			console.error("Error creating account:", error);
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession({ email, password });
		} catch (error) {
			console.error("Error logging into account:", error);
			throw error;
		}

	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (e) {
			console.log("Appwrite service :: getCurrentUser :: error", e);
			return null;
		}
	}

	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			console.log("Appwrite service :: logout :: error", error);
		}
	}
}

const authService = new AuthService();

export default authService;
