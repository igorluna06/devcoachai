export interface UpdatePasswordDTO {
    userId: number;
    oldPassword: string;
    newPassword: string;
}