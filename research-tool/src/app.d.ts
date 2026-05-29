/// <reference types="@cloudflare/workers-types" />

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				DB: D1Database;
				AI: Ai;
				VECTORIZE: VectorizeIndex;
				ANTHROPIC_API_KEY: string;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};
