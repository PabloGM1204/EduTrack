// Datos del usuario en el log
export interface StrapiUser{
    id: number,
    username: string,
    email: string
}

// Datos del usuario para que el strapi confirme en el login
export interface StrapiLoginPayload{
    identifier: string,
    password: string
}

// Datos del usuario para que el strapi confirme en el register
export interface StrapiRegisterPayLoad{
    email: string,
    password: string,
    username: string
}

// Respuesta del login
export interface StrapiLoginResponse{
    jwt: string,
    user: StrapiUser
}

// Respuesta del register
export interface StrapiRegisterResponse{
    jwt: string,
    user: StrapiUser
}

// Datos para la tabla de ExtendedUser
export interface StrapiExtendedUser{
    name: string,
    surname: string,
    user_id: number,
    picture?: string
}