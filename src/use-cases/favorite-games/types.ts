import { Session } from "next-auth";

export type GetUserSession = () => Promise<Session | null>;
