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

const languageKnowledgeSchema = z.discriminatedUnion('knowsOtherLanguages', [
    z.object({
        knowsOtherLanguages: z.literal(true),
        languages: z.array(
            z.object({
                name: z.string().min(1),
            })
        )
    }),
    z.object({
        knowsOtherLanguages: z.literal(false)
    })
])

const formSchema = z.object({
    fullName: z.string().min(1),
}).and(workExperienceScheme)
.and(languageKnowledgeSchema)

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValues: FormSchema = {
    fullName: "",
    hasWorkExperience: false,
    knowsOtherLanguages: false,
}

export { formDefaultValues, formSchema, type FormSchema }