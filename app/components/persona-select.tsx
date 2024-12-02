import { SelectProps } from "@radix-ui/react-select";
import { JSX } from "react/jsx-runtime";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select";

export function PersonaSelect({personas, ...rest}: {personas: any[], id: string, name: string} & SelectProps) {
    return (
        <Select {...rest}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Please select..." />
            </SelectTrigger>
            <SelectContent>
                {personas.map(persona => (
                    <SelectItem value={persona.persona_id} key={persona.persona_id}>{persona.persona_name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}