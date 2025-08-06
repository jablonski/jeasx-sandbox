import Cap from "@cap.js/server";

if (!globalThis.cap) {
  const cache = { tokens: new Map(), challenges: new Map() };
  globalThis.cap = new Cap({
    storage: {
      challenges: {
        store: async (token, challengeData) => {
          cache.challenges.set(token, challengeData);
        },
        read: async (token) => {
          const data = cache.challenges.get(token);
          return data?.expires > Date.now() ? data : null;
        },
        delete: async (token) => {
          cache.challenges.delete(token);
        },
        listExpired: async () => {
          const now = Date.now();
          return cache.challenges
            .entries()
            .filter(([, { expires }]) => expires < now)
            .map(([token]) => token)
            .toArray();
        },
      },
      tokens: {
        store: async (key, expires) => {
          cache.tokens.set(key, expires);
        },
        get: async (key) => {
          const expires = cache.tokens.get(key);
          return expires > Date.now() ? expires : null;
        },
        delete: async (key) => {
          cache.tokens.delete(key);
        },
        listExpired: async () => {
          const now = Date.now();
          return cache.tokens
            .entries()
            .filter(([, expires]) => expires < now)
            .map(([token]) => token)
            .toArray();
        },
      },
    },
  });
}

export default globalThis.cap;
