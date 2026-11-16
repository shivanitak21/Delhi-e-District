import { describe, expect, it } from "vitest";
import { getLiveConfig, lookupServices, validateLiveUpgrade } from "@/lib/live-relay.server";

describe("voice assistant boundaries", () => {
  it("uses the selected supported language and defaults unknown languages to English", () => {
    expect(getLiveConfig("https://example.com/api/live?language=hi").language).toBe("Hindi");
    expect(getLiveConfig("https://example.com/api/live?language=unknown").language).toBe("English");
  });
  it("rejects cross-origin and missing-origin hosted calls", () => {
    const request = new Request("https://example.com/api/live", { headers: { upgrade: "websocket", origin: "https://other.com" } });
    expect(validateLiveUpgrade(request)?.status).toBe(403);
    expect(validateLiveUpgrade(new Request("https://example.com/api/live", { headers: { upgrade: "websocket" } }))?.status).toBe(403);
  });
  it("returns only existing prototype services and labels them as demo data", () => {
    const result = lookupServices({ slugs: ["income-certificate", "invented-service"] });
    expect(result.map((entry) => entry.slug)).toEqual(["income-certificate"]);
    expect(result[0]?.demo).toBe(true);
  });
});