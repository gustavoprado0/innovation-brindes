export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    status: 0 | 1;
    message: string;
    token_de_acesso: string;
    dados_usuario: {
        codigo_usuario: string;
        nome_usuario: string;
        codigo_grupo: string;
        nome_grupo: string;
    };
}

export interface ProductAPI {
    codigo: string;
    nome: string;
    referencia: string;
    codigo_categoria: string;
    imagem: string;
    preco: string;
    descricao: string;
}

export interface ProductFiltersAPI {
    nome_produto?: string;
    codigo_produto?: string;
}

export interface User {
    id: string;
    name: string;
    groupId: string;
    groupName: string;
}

export interface Product {
    code: string;
    name: string;
    reference: string;
    categoryCode: string;
    imageUrl: string;
    price: number;
    description: string;
}

export interface ProductFilters {
    name?: string;
    code?: string;
}

export type SortField = 'price' | 'name';
export type SortDirection = 'asc' | 'desc';

export interface Sorting {
    field: SortField;
    direction: SortDirection;
}