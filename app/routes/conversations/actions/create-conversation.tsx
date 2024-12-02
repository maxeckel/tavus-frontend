import {
    data,
    redirect
} from "react-router";
import {z} from "zod";
import {Conversation} from "~/types/conversation";
import {createConversation} from "~/lib/tavus-api";
import {Route} from "../../../../.react-router/types/app/routes/conversations/actions/+types/create-conversation";

const CreateConversationSchema = z.object({
    conversation_name: z.string()
        .min(1, {message: "The Name is required"})
        .max(255, {message: "The Name must be less than 255 characters"}),
    replica_id: z.string()
        .min(1, {message: "The Replica ID is required"}),
    persona_id: z.string()
        .min(1, {message: "The Persona is required"}),
    context: z.optional(z.string()),
    greeting: z.optional(z.string()),
    language: z.union([z.literal("english"), z.literal("german")])
})


export async function action({request}: Route.ActionArgs) {
    const formData = Object.fromEntries(await request.formData());

    const validationResult = CreateConversationSchema.required().safeParse(formData);

    if (!validationResult.success) {
        return data({
            errors: validationResult.error.format()
        }, {status: 400});
    }

    const conversationDetails: Conversation = {
        replica_id: validationResult.data.replica_id,
        persona_id: validationResult.data.persona_id,
        conversation_name: validationResult.data.conversation_name,
        context: validationResult.data.context,
        greeting: validationResult.data.greeting,
        language: validationResult.data.language,
    }

    const conversationId = await createConversation(conversationDetails);

    return redirect(`/conversations/${conversationId}`);
}