import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Usuário é obrigatório.')
    .email('Email inválido.'),

  password: z
    .string()
    .min(1, 'Senha é obrigatória.')
    .min(3, 'Senha deve ter pelo menos 3 caracteres.')
});

export type LoginFormData = z.infer<typeof loginSchema>;