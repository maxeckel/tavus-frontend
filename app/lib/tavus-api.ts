import {Persona} from "~/types/persona";
import {Conversation} from "~/types/conversation";
import { data } from "react-router";

const PERSONAS_BASE_URL = "https://tavusapi.com/v2/personas"
const CONVERSATIONS_BASE_URL = "https://tavusapi.com/v2/conversations";

export async function getAllPersonas() {
    const personaType = "user";
    const personaLimit = 20;
    
    const url = `${PERSONAS_BASE_URL}?persona_type=${personaType}&limit=${personaLimit}`;
    
    const {data: personas} : {data: Persona[]} = await fetchTavusApi(url, "GET");
    
    return personas;
}

export async function getConversation(conversationId: string): Promise<string> {
    const url = `${CONVERSATIONS_BASE_URL}/${conversationId}`;

    const {conversation_url} = await fetchTavusApi(url, "GET");
    
    return conversation_url;
}

export async function createConversation(conversationInfo : Conversation): Promise<string> {
    const body = {
        replica_id: conversationInfo.replica_id,
        persona_id: conversationInfo.persona_id,
        conversation_name: conversationInfo.conversation_name,
        conversational_context: conversationInfo.context,
        custom_greeting: conversationInfo.greeting,
        properties: {
            max_call_duration: 300, // 5 Minuten
            participant_left_timeout: 30,
            participant_absent_timeout: 300,
            enable_recording: false,
            enable_transcription: false,
            language: conversationInfo.language,
            apply_greenscreen: false,
        }
    };

    const {conversation_id} = await fetchTavusApi(CONVERSATIONS_BASE_URL, "POST", body);
    
    return conversation_id;
}

async function fetchTavusApi(url: string,  method : "GET" | "POST", payload : object|null = null) {
    const options: {
        method: string;
        headers: Record<string, string>;
        body?: string;
    } = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_TAVUS_API_KEY,
        },
    }
    
    if (payload !== null) {
        options.body = JSON.stringify(payload);
    }
    
    const response = await fetch(url, options);
    
    if (! response.ok) {
        throw data(response.statusText);
    } 

    return await response.json();
}
