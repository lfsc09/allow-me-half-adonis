import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().minLength(1).maxLength(254).email(),
    password: vine.string().trim().minLength(8),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().minLength(1).maxLength(254).email().optional(),
    password: vine.string().trim().minLength(8).optional(),
  })
)
