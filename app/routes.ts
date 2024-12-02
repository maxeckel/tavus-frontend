import {
    type RouteConfig,
    index,
    route
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    
    route("conversations", "routes/actions/create-conversation.tsx"),
    route("conversations/:id", "routes/conversations/conversation.tsx"),
] satisfies RouteConfig;
