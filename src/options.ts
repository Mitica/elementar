
export interface ElementarOptions {
    readonly omitElements?: RegExp
    readonly invalidElements?: RegExp
    readonly emptyElements?: RegExp
}

export const ELEMENTAR_OPTIONS: ElementarOptions = {
    omitElements: /^div$/,
    invalidElements: /^script|style$/,
    emptyElements: /^html|head|body|td|th$/,
}
