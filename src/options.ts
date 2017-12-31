
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
     * Ignore element, but not its children: b, strong, u, i, ins
     */
    readonly abstractElements?: string[]

    /**
     * Custom element builders
     */
    readonly customElements?: CustomElement[]

    /**
     * Element properties to keep
     */
    readonly elementProps?: { [index: string]: string[] }

    /**
     * Callback on element creating. You can invalidate, ignore or mutate elements.
     */
    readonly onElement?: OnElementFunction
}

export const ELEMENTAR_OPTIONS: ElementarOptions = {
    invalidElements: ['frameset', 'frame', 'iframe', 'script', 'style', 'form', 'button', 'input', 'select', 'map', 'textarea'],
    emptyElements: ['html', 'head', 'body', 'td', 'th'],
    contentElements: ['img', 'meta', 'link'],
    abstractElements: ['ins', 'strong', 'b', 'abbr', 'acronym', 'bdo', 'big', 'cite', 'em', 'i', 'kbd', 'label', 'samp', 'small', 'span', 'sub', 'sup', 'tt'],
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

export type OnElementReturn = 'invalid' | 'abstract' | ElementBuildData;

export interface ElementBuildData {
    /** Element tag name */
    name: string
    props?: { [index: string]: string }
    /** Is element a content: text, image, video, custom? */
    isContent: boolean
    /** Is element a leaf: ignore its children? */
    isLeaf: boolean
}

export interface CustomElement {
    name: string
    build(node: CheerioElement, options?: ElementarOptions): ElementBuildData
}

export function mergeDefaultOptions(options: ElementarOptions) {
    return { ...ELEMENTAR_OPTIONS, ...options };
}
