export type Conversation = {
    replica_id: string;
    persona_id: string;
    conversation_name: string;
    context: string;
    greeting: string;
    language: "english" | "german";
}