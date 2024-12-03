import {LanguageSelect} from "~/components/language-select";
import {PersonaSelect} from "~/components/persona-select";
import {useFetcher} from "react-router";
import {useState} from "react";
import {Button} from "~/components/ui/button";
import {Label} from "~/components/ui/label";
import {Textarea} from "~/components/ui/textarea";
import {Input} from "~/components/ui/input";
import {Persona} from "~/types/persona";
import {getAllPersonas} from "~/lib/tavus-api";
import {Route} from "../../../.react-router/types/app/routes/conversations/+types/create";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "AI Avatar Demo"},
    ];
}

export async function loader() {
    return await getAllPersonas();
}

export default function Create({loaderData}: Route.ComponentProps) {
    const fetcher = useFetcher();
    const errors = fetcher.data?.errors;
    const [selectedPersona, setSelectedPersona] = useState<Persona|null>(null);

    const changePersona = (persona_id : string) => {
        const persona = loaderData.find(persona => persona.persona_id === persona_id);
        
        if (! persona) {
            throw `Persona with id ${persona_id} not found`;
        }

        setSelectedPersona(persona);
    }

    return (
        <>
            <header className="border-b border-gray-200 h-16 flex items-center px-4 mb-8">
                <h1 className="text-2xl">Create Conversation</h1>
            </header>

            <main className="flex flex-col gap-8 p-4">
                <div className="flex justify-center">
                    <fetcher.Form method={"POST"} action="/conversations" className="grid grid-cols-2 gap-8 w-1/2">
                        <div className="col-span-full flex flex-col gap-2 items-start justify-start">
                            <Label htmlFor="conversation_name" className="text-md">Conversation Name:</Label>
                            <Input id="conversation_name" name="conversation_name" required/>
                            {errors?.conversation_name ? errors.conversation_name._errors.map((error: string, index: number) => (
                                <p className="col-span-full text-red-600" key={`name_error_${index}`}>{error}</p>
                            )) : null}
                        </div>

                        <div className="flex flex-col gap-2 items-start justify-start">
                            <Label htmlFor="language" className="text-md">Language:</Label>
                            <LanguageSelect id="language" name="language"/>
                            {errors?.language ? errors.language._errors.map((error: string, index: number) => (
                                <p className="col-span-full text-red-600" key={`name_error_${index}`}>{error}</p>
                            )) : null}
                        </div>

                        <div className="flex flex-col gap-2 items-start justify-start">
                            <Label htmlFor="persona" className="text-md">Persona:</Label>
                            <PersonaSelect id="persona" name="persona" personas={loaderData} onValueChange={changePersona}/>
                            {errors?.persona_id ? errors.persona_id._errors.map((error: string, index: number) => (
                                <p className="col-span-full text-red-600" key={`name_error_${index}`}>{error}</p>
                            )) : null}
                        </div>

                        <div className="col-span-full flex flex-col gap-2 items-start justify-start">
                            <Label htmlFor="greeting" className="text-md">Greeting:</Label>
                            <Textarea id="greeting" name="greeting"/>
                        </div>

                        <div className="col-span-full flex flex-col gap-2 items-start justify-start">
                            <Label htmlFor="context" className="text-md">Context:</Label>
                            <Textarea id="context" name="context"/>
                        </div>

                        <input type="hidden" name="persona_id" value={selectedPersona?.persona_id}/>
                        <input type="hidden" name="replica_id" value={selectedPersona?.default_replica_id}/>

                        {fetcher.state === "idle"
                            ? <Button type="submit" className="col-span-full" size="lg">Create Conversation</Button>
                            : <Button type="button" className="col-span-full" size="lg" disabled>Creating Conversation...
                                Please wait.</Button>
                        }
                    </fetcher.Form>
                </div>
            </main>
        </>
    );
}
