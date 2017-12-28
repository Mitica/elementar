
export interface ElementarOptions {
    readonly omitElements?: string[]
    readonly invalidElements?: string[]
    readonly emptyElements?: string[]
}

export const ELEMENTAR_OPTIONS: ElementarOptions = {
    omitElements: ['div'],
    invalidElements: ['script', 'style'],
    emptyElements: ['html', 'head', 'body', 'td', 'th'],
}
