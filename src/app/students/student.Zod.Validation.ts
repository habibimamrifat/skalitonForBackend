import { z } from 'zod';

const installmentSchema = z.object({
  submissanDate :z.union([z.date() , z.string()]).transform((val)=>(typeof val === "string" ? new Date(val) : val)),
  installmentMonth:z.union([z.date() , z.string()]).transform((val)=>(typeof val === "string" ? new Date(val) : val)),
  installmentAmmounnt:z.number().min(1000),
})

// Name validation schema
const nameValidationZodSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20 characters')
    .trim()
    .refine(
      (value) => /^[A-Z][a-z]*$/.test(value),
      'First name must be capitalized and only contain letters'
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .max(20, 'Last name cannot be more than 20 characters')
    .trim()
    .min(1)
    .refine(
      (value) => /^[A-Za-z]*$/.test(value),
      'Last name can only contain letters'
    ),
});

// Guardian validation schema
const guardianValidationZodSchema = z.object({
  fathersName: z.string().min(1, 'Father\'s name is required'),
  fathersOccupation: z.string().min(1, 'Father\'s occupation is required'),
  fathersMobileNo: z.string().min(1, 'Father\'s mobile number is required'),
  mothersName: z.string().min(1, 'Mother\'s name is required'),
  mothersOccupation: z.string().min(1, 'Mother\'s occupation is required'),
  mothersMobileNo: z.string().min(1, 'Mother\'s mobile number is required'),
});

// Student validation schema
const studentValidationZodSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  passWord:z.string().min(1, 'ID is required').max(20),
  name: nameValidationZodSchema, // Reference the nested name schema
  birthDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    'Invalid birth date format'
  ),
  gender: z.enum(['Male', 'female']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  contactNo: z.string().min(1, 'Contact number is required'),
  emmergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  email: z.string().email('Invalid email format'),
  gurdian: guardianValidationZodSchema, // Reference the nested guardian schema
  profileImg: z.string().url().optional(),
  isActive: z.enum(['active', 'inactive']).default('active'),
  isDeleted:z.boolean().default(false),
  deposit:z.array(installmentSchema)
});

export default studentValidationZodSchema;
