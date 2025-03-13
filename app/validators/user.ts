import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)

export const createUserValidator = vine.compile(
  vine.object({
    isAdmin: vine.accepted().optional(),
    avatar: vine.file({
      extnames: ['jpg', 'jpeg', 'png'],
    }),
    email: vine.string().trim().minLength(1).maxLength(254).email(),
    password: vine.string().trim().minLength(8),
    fullName: vine.string().trim().minLength(1).maxLength(254),
    course: vine.string().trim().minLength(1).maxLength(254),
  })
)
