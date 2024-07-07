export interface UserDTO {
	email: string;
	password: string;
	name: string;
	lastName: string;
}

export interface LoginDTO {
	email: string;
	password: string;
}

export interface UserResponse {
	code: number;
	status: string;
	message: string;
	id: number;
}

export interface AuthResponse {
	message: string;
}
