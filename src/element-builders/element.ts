
import { IElement, Element, ParentElement, ElementProps } from '../Element';
import { ElementarOptions, CustomElement, ElementBuildData } from '../options';

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
    time: /^datetime$/,
};

const builder: CustomElement = {
    name: 'element',

    build(node: CheerioElement, options?: ElementarOptions): ElementBuildData {
        if (node.type === 'tag') {
            const isContent = options.contentElements.test(node.name);
            const props: ElementProps = {}

            Object.keys(node.attribs).forEach(prop => {
                if (PROPS[node.name].test(prop) && node.attribs[prop]) {
                    props[prop] = node.attribs[prop];
                }
            });

            return {
                name: node.name,
                isContent,
                isParent: true
            }
        }
    }
}

export default builder;
