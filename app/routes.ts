import {
    type RouteConfig,
    index,
    route
} from "@react-router/dev/routes";

export default [
    index("routes/conversations/create.tsx"),
    
    route("conversations", "routes/conversations/actions/create-conversation.tsx"),
    route("conversations/:id", "routes/conversations/conversation.tsx"),
] satisfies RouteConfig;
