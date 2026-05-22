export function calculateAge(birthDate: Date): number {
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const birthMonth = today.getMonth() - birthDate.getMonth();

    if (
        birthMonth < 0 ||
        (birthMonth === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}