
import { ElementarOptions, ELEMENTAR_OPTIONS } from './options';
import { IElement } from './elements';

export function elementar(html: string, options?: ElementarOptions): IElement[] {
    if (typeof html !== 'string') {
        throw new Error(`'html' parameter is invalid`);
    }
    options = { ...ELEMENTAR_OPTIONS, ...options }

    return [];
}
