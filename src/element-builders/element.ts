
import { IElement, Element, ElementProps } from '../Element';
import { ElementarOptions, CustomElement, ElementBuildData } from '../options';

const builder: CustomElement = {
    name: 'element',

    build(node: CheerioElement, options: ElementarOptions): ElementBuildData {
        if (node.type === 'tag') {
            const isContent = options.contentElements.indexOf(node.name) > -1;
            const props: ElementProps = {}
            if (options && options.elementProps) {
                Object.keys(node.attribs).forEach(prop => {
                    if (options.elementProps[node.name]
                        && options.elementProps[node.name].indexOf(prop) > -1
                        && node.attribs[prop]) {
                        props[prop] = node.attribs[prop];
                    }
                });
            }

            return {
                name: node.name,
                isContent,
                isLeaf: false
            }
        }
    }
}

export default builder;
