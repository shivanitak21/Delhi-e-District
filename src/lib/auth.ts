const AUTH_KEY = "edistrict-signed-in";
const AUTH_EVENT = "edistrict-auth-change";

export function isSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function signIn(): void {
  window.localStorage.setItem(AUTH_KEY, "1");
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function signOut(): void {
  window.localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function subscribeAuth(listener: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === AUTH_KEY || event.key === null) listener();
  };
  window.addEventListener(AUTH_EVENT, listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(AUTH_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}
