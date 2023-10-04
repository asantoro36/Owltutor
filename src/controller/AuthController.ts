
export const validateAuthCode = (code: string) => {
    return code === "123ABC"
}

export const loginUser = (formData: any) => {
    const userEmail = formData.username; // es el email en este caso
    const userDataJSON = localStorage.getItem(userEmail);

    if (userDataJSON) {
        try {
            const userData = JSON.parse(userDataJSON);

                if (userData.password === formData.password) {
                    localStorage.setItem('token', formData.username);
                    return userData;
            }
        } catch (error) {
            console.error('Error al analizar el JSON del usuario:', error);
        }
    }
    return null;
};


export const LogoutUser = () => {
    localStorage.removeItem('token');
}