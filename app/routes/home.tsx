import type {Route} from "./+types/home";
import {LanguageSelect} from "~/components/language-select";
import {PersonaSelect} from "~/components/persona-select";
import {useFetcher} from "react-router";
import {useState} from "react";
import {Button} from "~/components/ui/button";
import {Label} from "~/components/ui/label";
import {Textarea} from "~/components/ui/textarea";
import {Input} from "~/components/ui/input";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "AI Avatar Demo"},
    ];
}

export async function loader() {
    const url = "https://tavusapi.com/v2/personas?persona_type=user&limit=20"
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "x-api-key": import.meta.env.VITE_TAVUS_API_KEY,
        }
    });

    const {data: personas} = await response.json();

    return personas;
}

export default function Home({loaderData}: Route.ComponentProps) {
    const fetcher = useFetcher();
    const errors = fetcher.data?.errors;
    const [selectedPersona, setSelectedPersona] = useState(null);

    const changePersona = (persona_id) => {
        const persona = loaderData.find(persona => persona.persona_id === persona_id);

        setSelectedPersona(persona);
    }

    return (
        <>
            <header className="border-b border-gray-200 h-16 flex items-center px-4">
                <h1 className="text-2xl">Create Conversation</h1>
            </header>

            <main className="flex flex-col gap-8 p-4">
                <div className="flex justify-center">
                    <fetcher.Form method={"POST"} action="/conversations" className="grid grid-cols-2 gap-8 w-1/2">
                        <div className="col-span-full flex flex-col gap-2 items-start justify-center">
                            <Label htmlFor="conversation_name" className="text-md">Conversation Name:</Label>
                            <Input name="conversation_name" required/>
                            {errors?.conversation_name ? errors.conversation_name._errors.map((error: string, index: number) => (
                                <p className="col-span-full text-red-600" key={`name_error_${index}`}>{error}</p>
                            )) : null}
                        </div>

                        <div className="flex flex-col gap-2 items-start justify-center">
                            <Label htmlFor="language" className="text-md">Language:</Label>
                            <LanguageSelect name="language"/>
                            {errors?.language ? errors.language._errors.map((error: string, index: number) => (
                                <p className="col-span-full text-red-600" key={`name_error_${index}`}>{error}</p>
                            )) : null}
                        </div>

                        <div className="flex flex-col gap-2 items-start justify-center">
                            <Label htmlFor="persona" className="text-md">Persona:</Label>
                            <PersonaSelect name="persona" personas={loaderData} onValueChange={changePersona}/>
                            {errors?.persona_id ? errors.persona_id._errors.map((error: string, index: number) => (
                                <p className="col-span-full text-red-600" key={`name_error_${index}`}>{error}</p>
                            )) : null}
                        </div>

                        <div className="col-span-full flex flex-col gap-2 items-start justify-center">
                            <Label htmlFor="greeting" className="text-md">Greeting:</Label>
                            <Textarea name="greeting"/>
                        </div>

                        <div className="col-span-full flex flex-col gap-2 items-start justify-center">
                            <Label htmlFor="context" className="text-md">Context:</Label>
                            <Textarea name="context"/>
                        </div>

                        <input type="hidden" name="persona_id" value={selectedPersona?.persona_id}/>
                        <input type="hidden" name="replica_id" value={selectedPersona?.default_replica_id}/>

                        {fetcher.state === "idle"
                            ? <Button type="submit" className="col-span-full" size="lg">Create Conversation</Button>
                            :
                            <Button type="button" className="col-span-full" size="lg" disabled>Creating Conversation...
                                Please wait.</Button>
                        }
                    </fetcher.Form>
                </div>
            </main>
        </>
    );
}
