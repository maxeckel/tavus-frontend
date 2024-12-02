import { SelectProps } from "@radix-ui/react-select";
import { JSX } from "react/jsx-runtime";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select";

export function LanguageSelect(props: JSX.IntrinsicAttributes & SelectProps) {
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