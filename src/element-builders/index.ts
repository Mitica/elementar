
import { IElement, Element, TextElement } from '../Element';
import textBuild from './text';
import elementBuild from './element';

const BUILDERS: ((node: CheerioElement) => IElement)[] = [
    textBuild, elementBuild
];

export function buildElement(node: CheerioElement): IElement {
    for (var i = 0; i < BUILDERS.length; i++) {
        const element = BUILDERS[i](node);
        if (element !== undefined) {
            return element;
        }
    }
}
