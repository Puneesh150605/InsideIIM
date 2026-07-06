import { Annotation } from '@langchain/langgraph';
export const ResearchStateAnnotation = Annotation.Root({
    company: Annotation({
        reducer: (_, next) => next,
        default: () => '',
    }),
    horizon: Annotation({
        reducer: (_, next) => next,
        default: () => '1-3y',
    }),
    apiKey: Annotation({
        reducer: (_, next) => next,
        default: () => undefined,
    }),
    provider: Annotation({
        reducer: (_, next) => next,
        default: () => 'demo',
    }),
    logs: Annotation({
        reducer: (curr, next) => [...curr, ...next],
        default: () => [],
    }),
    marketData: Annotation({
        reducer: (curr, next) => ({ ...curr, ...next }),
        default: () => ({}),
    }),
    competitiveData: Annotation({
        reducer: (curr, next) => ({ ...curr, ...next }),
        default: () => ({}),
    }),
    sentimentData: Annotation({
        reducer: (curr, next) => ({ ...curr, ...next }),
        default: () => ({}),
    }),
    valuationData: Annotation({
        reducer: (curr, next) => ({ ...curr, ...next }),
        default: () => ({}),
    }),
    finalReport: Annotation({
        reducer: (_, next) => next,
        default: () => null,
    }),
    error: Annotation({
        reducer: (_, next) => next,
        default: () => undefined,
    }),
});
