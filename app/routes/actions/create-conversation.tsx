import {Route} from "../../../.react-router/types/app/routes/actions/+types/create-conversation";
import {
    data,
    redirect
} from "react-router";
import {z} from "zod";

const CreateConversationSchema = z.object({
    conversation_name: z.string()
        .min(1, { message: "The Name is required" })
        .max(255, { message: "The Name must be less than 255 characters" }),
    persona_id: z.string()
        .min(1, { message: "The Persona is required" }),
    language: z.string()
        .min(1, { message: "The Language is required" }),
})


export async function action({request}: Route.ActionArgs) {
    const formData = Object.fromEntries(await request.formData());

    const validationResult = CreateConversationSchema.required().safeParse(formData);

    if (! validationResult.success) {
        console.log(validationResult.error.format())

        return data({
            errors: validationResult.error.format()
        }, {status: 400});
    }

    const body = JSON.stringify({
        replica_id: formData.replica_id,
        persona_id: formData.persona_id,
        conversation_name: formData.conversation_name,
        conversational_context: formData.context,
        custom_greeting: formData.greeting,
        properties: {
            max_call_duration: 300, // 5 Minuten
            participant_left_timeout: 30,
            participant_absent_timeout: 300,
            enable_recording: false,
            enable_transcription: false,
            language: formData.language,
            apply_greenscreen: false,
        }
    });
    
    const url = "https://tavusapi.com/v2/conversations"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "x-api-key": import.meta.env.VITE_TAVUS_API_KEY,
            "Content-Type": "application/json",
        },
        body,
    });
    
    if (response.ok) {
        const {conversation_id} = await response.json();
        
        return redirect(`/conversations/${conversation_id}`);
    }
    
    throw new Error(response.statusText);
}