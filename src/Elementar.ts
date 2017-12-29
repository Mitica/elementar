
import { IElement } from './Element';
import { ElementarOptions, ELEMENTAR_OPTIONS } from './options';
import { cheerioFromHTML } from './utils';
import { ElementsBuilder } from './ElementsBuilder';

export class Elementar {
    constructor(private elements: IElement[]) {
        if (!elements || !Array.isArray(elements)) {
            throw new Error(`Argument 'elements' must be an Array`);
        }
    }

    html(): string {
        return this.elements.map(element => element.html()).join('');
    }

    xml(): string {
        return this.elements.map(element => element.xml()).join('');
    }

    text(): string {
        return this.elements.map(element => element.text()).join('');
    }
}

export function fromHtml(html: string, options?: ElementarOptions): Elementar {
    if (typeof html !== 'string') {
        throw new Error(`'html' parameter is invalid`);
    }
    options = { ...ELEMENTAR_OPTIONS, ...options }

    const builder = new ElementsBuilder(options);

    const $ = cheerioFromHTML(html);

    const elements = builder.build($.toArray());

    return new Elementar(elements);
}
