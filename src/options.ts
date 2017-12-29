
export interface ElementarOptions {
    /**
     * Invalid elements: script, style
     */
    readonly invalidElements?: RegExp
    /**
     * Accepted empty elements: html, head, body, td, th
     */
    readonly emptyElements?: RegExp
    /**
     * Elements that represent some content: text, image, video, meta, widget, iframe
     */
    readonly contentElements?: RegExp

    /**
     * Elements to ignore: b, strong, u, i, ins
     */
    readonly ignoreElements?: RegExp

    /**
     * Custom element builders
     */
    readonly customElements?: CustomElement[]
}

// export const CONTENT_NODES = /^img|iframe|meta|link$/;

export const ELEMENTAR_OPTIONS: ElementarOptions = {
    invalidElements: /^(frameset|frame|iframe|script|style|form|button|input|select|map|textarea)$/,
    emptyElements: /^(html|head|body|td|th)$/,
    contentElements: /^(img|meta|link)$/,
    ignoreElements: /^(ins|strong|b|abbr|acronym|bdo|big|cite|em|i|kbd|label|samp|small|span|sub|sup|tt)$/,
}

export interface ElementBuildData {
    name: string
    props?: { [index: string]: string }
    isContent: boolean
    isLeaf: boolean
}

export interface CustomElement {
    name: string
    build(node: CheerioElement, options?: ElementarOptions): ElementBuildData
}

export function mergeDefaultOptions(options: ElementarOptions) {
    return { ...ELEMENTAR_OPTIONS, ...options };
}
