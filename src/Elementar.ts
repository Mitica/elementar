
import { IElement } from './element';
import { ElementarOptions, ELEMENTAR_OPTIONS } from './options';
import { cheerioFromHTML } from './utils';
import { ElementsBuilder } from './ElementsBuilder';

export function elementar(html: string, options?: ElementarOptions): IElement[] {
    if (typeof html !== 'string') {
        throw new Error(`'html' parameter is invalid`);
    }
    options = { ...ELEMENTAR_OPTIONS, ...options }

    const builder = new ElementsBuilder(options);

    const $ = cheerioFromHTML(html);

    const elements = builder.build($.toArray());

    return elements;
}
