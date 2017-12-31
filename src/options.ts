
export interface ElementarOptions {
    /**
     * Invalid elements: script, style
     */
    readonly invalidElements?: string[]
    /**
     * Accepted empty elements: html, head, body, td, th
     */
    readonly emptyElements?: string[]
    /**
     * Elements that represent some content: text, image, video, meta, widget, iframe
     */
    readonly contentElements?: string[]

    /**
     * Elements to ignore: b, strong, u, i, ins
     */
    readonly ignoreElements?: string[]

    /**
     * Custom element builders
     */
    readonly customElements?: CustomElement[]

    /**
     * Element properties to keep
     */
    readonly elementProps?: { [index: string]: string[] }

    /**
     * 
     */
    readonly onElement?: OnElementFunction
}

export const ELEMENTAR_OPTIONS: ElementarOptions = {
    invalidElements: ['frameset', 'frame', 'iframe', 'script', 'style', 'form', 'button', 'input', 'select', 'map', 'textarea'],
    emptyElements: ['html', 'head', 'body', 'td', 'th'],
    contentElements: ['img', 'meta', 'link'],
    ignoreElements: ['ins', 'strong', 'b', 'abbr', 'acronym', 'bdo', 'big', 'cite', 'em', 'i', 'kbd', 'label', 'samp', 'small', 'span', 'sub', 'sup', 'tt'],
    elementProps: {
        html: ['lang', 'dir'],
        iframe: ['src', 'height', 'width'],
        img: ['title', 'alt', 'src'],
        a: ['title', 'href'],
        meta: ['charset', 'content', 'property', 'name'],
        link: ['href', 'rel', 'type', 'title', 'sizes', 'hreflang'],
        bdo: ['dir'],
        q: ['cite'],
        blockquote: ['cite'],
        time: ['datetime'],
    },
}

export interface OnElementFunction {
    (element: CheerioElement): OnElementReturn
}

export type OnElementReturn = 'ignore' | 'invalid' | ElementBuildData;

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
