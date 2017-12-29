
import { IElement, Element, ParentElement } from '../Element';
import { ElementarOptions } from '../options';

const PROPS: { [index: string]: RegExp } = {
    html: /^lang|dir$/,
    iframe: /^src|height|width$/,
    img: /^title|alt|src$/,
    a: /^title|href$/,
    meta: /^charset|content|property|name$/,
    link: /^href|rel|type|title|sizes|hreflang$/,
    bdo: /^dir$/,
    q: /^cite$/,
    blockquote: /^cite$/,
};

export default function build(node: CheerioElement, options: ElementarOptions): IElement {
    if (node.type === 'tag') {
        const isContent = options.contentElements.test(node.name);
        const element = new ParentElement(node.name, {}, isContent);

        Object.keys(node.attribs).forEach(key => {
            if (PROPS[element.name].test(key)) {
                element.prop(key, node.attribs[key]);
            }
        });

        return element;
    }
}
