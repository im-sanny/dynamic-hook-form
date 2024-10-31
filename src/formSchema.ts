import { z } from 'zod';

const workExperienceScheme = z.discriminatedUnion('hasWorkExperience', [
    z.object({
        hasWorkExperience: z.literal(true),
        companyName: z.string().min(1),
    }),
    z.object({
        hasWorkExperience: z.literal(false)
    })
]);

const formSchema = z.object({
    fullName: z.string().min(1),
}).and(workExperienceScheme);

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValues: FormSchema = {
    fullName: "",
    hasWorkExperience: false,
}

export { formDefaultValues, formSchema, type FormSchema }