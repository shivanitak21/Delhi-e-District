import { useSyncExternalStore } from "react";
import { isSignedIn, subscribeAuth } from "@/lib/auth";

export function useAuth() {
  return useSyncExternalStore(subscribeAuth, isSignedIn, () => false);
}
