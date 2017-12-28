
import { IElement, Element, ParentElement } from '../Element';
import { LEEF_NODES } from '../options';

const PROPS: { [index: string]: RegExp } = {
    html: /^lang|dir$/,
    iframe: /^src|height|width$/,
    img: /^title|alt|src$/,
    a: /^title|href$/,
};

export default function build(node: CheerioElement): IElement {
    if (node.type === 'tag') {
        const element = LEEF_NODES.test(node.name) ? new Element(node.name) : new ParentElement(node.name);

        Object.keys(node.attribs).forEach(key => {
            if (PROPS[element.name].test(key)) {
                element.prop(key, node.attribs[key]);
            }
        });

        return element;
    }
}
