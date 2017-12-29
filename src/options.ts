
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
}

// export const CONTENT_NODES = /^img|iframe|meta|link$/;

export const ELEMENTAR_OPTIONS: ElementarOptions = {
    invalidElements: /^(frameset|frame|script|style|form|button|input|select|map|textarea)$/,
    emptyElements: /^(html|head|body|td|th)$/,
    contentElements: /^(img|iframe|meta|link)$/,
    ignoreElements: /^(ins|strong|b|abbr|acronym|bdo|big|cite|em|i|kbd|label|samp|small|span|sub|sup|tt)$/,
}

export function mergeDefaultOptions(options: ElementarOptions) {
    return { ...ELEMENTAR_OPTIONS, ...options };
}
