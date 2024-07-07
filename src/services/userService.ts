import User, { UserCreationAttributes } from "../models/user";

class UserService {
	public async createUser(userData: UserCreationAttributes): Promise<User> {
		const user = await User.create(userData);

		return user;
	}

	public async loginUser(email: string, password: string): Promise<User | null> {
		const user = await User.findOne({ where: { email, password } });

		return user;
	}

	public async deleteUser(id: number): Promise<number> {
		const result = await User.destroy({ where: { id } });

		return result;
	}
}

export default new UserService();
