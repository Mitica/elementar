
import { IElement, TextElement, TagElement } from '../Element';
import elementBuild from './element';
import youtubeBuild from './youtube';
import { ElementarOptions, CustomElement, ElementBuildData, ELEMENTAR_OPTIONS } from '../options';

export function buildElement(node: CheerioElement, options: ElementarOptions): IElement {
    options = options || ELEMENTAR_OPTIONS;
    if (node.type === 'text') {
        return new TextElement({ data: node.data });
    }

    const localBuilders: CustomElement[] = [youtubeBuild, elementBuild];

    const BUILDERS: CustomElement[] = (options.customElements || []).concat(localBuilders);

    for (var i = 0; i < BUILDERS.length; i++) {
        const builder = BUILDERS[i];
        let data: ElementBuildData;
        try {
            data = builder.build(node, options);
        } catch (e) {
            throw new Error(`Error on building element(${builder.name}): ${e.message}`);
        }
        if (data) {
            return new TagElement(data.name, data);
        }
    }
}
