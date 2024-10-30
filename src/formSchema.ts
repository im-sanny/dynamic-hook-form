import { z } from 'zod';

const formSchema = z.object({
    fullName: z.string().min(1),
})

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValues: FormSchema = {
    fullName: "",
}

export {formDefaultValues, formSchema, type FormSchema}