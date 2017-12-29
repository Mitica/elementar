
import { IElement, Element, TextElement } from '../Element';
import textBuild from './text';
import elementBuild from './element';
import { ElementarOptions } from '../options';

const BUILDERS: ((node: CheerioElement, options: ElementarOptions) => IElement)[] = [
    textBuild, elementBuild
];

export function buildElement(node: CheerioElement, options: ElementarOptions): IElement {
    for (var i = 0; i < BUILDERS.length; i++) {
        const element = BUILDERS[i](node, options);
        if (element !== undefined) {
            return element;
        }
    }
}
