import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z.string().min(1, "Description is required.").max(65535).optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
  assignedToUserId: z.string().min(1, 'AssignedToUserId is required.').max(255).optional().nullable(),
})

export const userRegisterSchema = z.object ({
  name:z.string().min(1, "User name is required").max(255),
  email: z.string().email({message: "Invalid email address."}),
  password: z.string().min(6, 'Minimun 6 characters are required.')

})

export const userSigninSchema = z.object ({
  email: z.string().email({message: "Invalid email address."}),
  password: z.string().min(6, 'Minimun 6 characters are required.')

})


export const emailSchema = z.object ({
  email: z.string().email({message: "Invalid email address."}),
})

export const passwordSchema = z.object ({
  password: z.string().min(6, 'Minimun 6 characters are required.'),
  verifyToken: z.string()
})


