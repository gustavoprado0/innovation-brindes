import type { ProductAPI, Product, LoginResponse, User } from '@/types';

export function mapProduct(api: ProductAPI): Product {
    return {
        code: api.codigo,
        name: api.nome,
        reference: api.referencia,
        categoryCode: api.codigo_categoria,
        imageUrl: api.imagem,
        price: parseFloat(api.preco),
        description: api.descricao,
    };
}

export function mapProducts(api: ProductAPI[]): Product[] {
    return api.map(mapProduct);
}

export function mapUser(response: LoginResponse): User {
    return {
        id: response.dados_usuario.codigo_usuario,
        name: response.dados_usuario.nome_usuario,
        groupId: response.dados_usuario.codigo_grupo,
        groupName: response.dados_usuario.nome_grupo,
    };
}