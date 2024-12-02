import { SelectProps } from "@radix-ui/react-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select";

export function LanguageSelect(props: SelectProps & {id: string, name: string}) {
    return (
        <Select {...props}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Please select..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="german">German</SelectItem>
            </SelectContent>
        </Select>

    )
}