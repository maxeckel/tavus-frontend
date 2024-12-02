import {Route} from "../../../.react-router/types/app/routes/conversations/+types/conversation";
import {
    DailyProvider,
    useCallFrame,
    useDailyEvent
} from "@daily-co/daily-react";
import {
    useCallback,
    useEffect,
    useRef
} from "react";
import {
    Link,
    useNavigate,
} from "react-router";
import {ArrowLeft} from "lucide-react";
import {getConversation} from "~/lib/tavus-api";

export async function loader({params}: Route.LoaderArgs) {
    const conversation_id = params.id;
    
    return await getConversation(conversation_id);
}

export default function Conversation({loaderData}: Route.ComponentProps) {
    const navigate = useNavigate();

    const callRef = useRef(null);

    const callFrame = useCallFrame({
        // @ts-ignore
        parentElRef: callRef,
        options: {
            url: loaderData,
            iframeStyle: {
                position: 'relative',
                width: '100%',
                height: '600px',
                minHeight: '800px',
            },
            showLeaveButton: true,
            showFullscreenButton: false,
            showParticipantsBar: false,

        },
        shouldCreateInstance: () => true,
    });

    useDailyEvent(
        "left-meeting",
        useCallback(() => {
            navigate("/");
        }, [])
    )

    callFrame?.join();

    return (
        <main>
            <header className="h-16 border-b border-gray-200 px-4 flex items-center">
                <Link to="/" className="flex gap-2"><ArrowLeft /> Go back</Link>
            </header>
            
            <DailyProvider callObject={callFrame}>
                <div className="flex justify-center items-center w-full h-screen">
                    <div ref={callRef} className="w-3/4 min-h-[800px]"/>
                </div>
            </DailyProvider>
        </main>
    );
} 