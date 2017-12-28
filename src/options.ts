
export interface ElementarOptions {
    readonly omitNodes?: RegExp
    readonly invalidNodes?: RegExp
    readonly emptyNodes?: RegExp
}

export const ELEMENTAR_OPTIONS: ElementarOptions = {
    omitNodes: /^div$/,
    invalidNodes: /^script|style$/,
    emptyNodes: /^html|head|body|td|th$/,
}

export const LEEF_NODES = /^img|iframe|meta|link$/;