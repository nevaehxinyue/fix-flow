import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
  createdByUserId: z.string().min(1, "User id is required.").max(255),
  severity: z.enum(["CRITICAL", "MAJOR", "MEDIUM", "MINOR"]),
  projectId: z.string()
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  severity: z.enum(["CRITICAL", "MAJOR", "MEDIUM", "MINOR"]).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Comment is required.").max(65535),
  createdByUserId: z.string().min(1, "Invalid User.").max(255),
  belongedToIssueId: z.number().min(1, "Issue ID is required."),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Project name is required.").max(255),
  description: z.string().max(65535).optional().nullable(),
  createdByUserId: z.string().min(1, "Invalid User.").max(255),
  status: z.enum(["OPEN", "COMPLETED"]).optional(),
  // assignedToUsers: z.array(z.string().min(1, 'Invalid User ID.').optional().nullable())
});

export const patchProjectSchema = z.object({
  title: z.string().min(1, "Project name is required.").max(255).optional(),
  description: z.string().max(65535).optional().nullable(),
  status: z.enum(["OPEN", "COMPLETED"]).optional(),
});

export const userRegisterSchema = z.object({
  name: z.string().min(1, "User name is required").max(255),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, "Minimun 6 characters are required."),
});

export const userSigninSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, "Minimun 6 characters are required."),
});

export const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export const passwordSchema = z.object({
  password: z.string().min(6, "Minimun 6 characters are required."),
  verifyToken: z.string(),
});

export const userProfileUpdateSchema = z.object({
  name: z.string().min(1, "Username is required.").max(255).optional(),
  password: z.string().optional().nullable(),
  confirmPassword: z.string().optional().nullable(),
});
// refine((data) => {
//   if(data.password || data.confirmPassword) {
//     return data.password === data.confirmPassword
//   }
//   return true;
// }, {message: "Passwords do not match.", path: ["confirmPassword"]})
