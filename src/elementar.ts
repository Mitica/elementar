
import { IElement } from './element';
// import * as cheerio from 'cheerio';
// import { cheerioFromHTML } from './utils';

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

export function elementar(html: string, options?: ElementarOptions): IElement[] {
    if (typeof html !== 'string') {
        throw new Error(`'html' parameter is invalid`);
    }
    options = { ...ELEMENTAR_OPTIONS, ...options }

    // const $ = cheerioFromHTML(html);

    return [];
}
