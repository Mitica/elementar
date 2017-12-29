
import { IElement, Element, ElementProps } from '../Element';
import { ElementBuildData, CustomElement } from '../options';

const builder: CustomElement = {
    name: 'youtube-video',

    build(node: CheerioElement): ElementBuildData {
        if (node.type === 'tag' && node.name === 'iframe') {
            const props: ElementProps = {};

            ['width', 'height', 'src'].forEach(prop => props[prop] = node.attribs[prop]);

            if (props.src) {
                const result = /^http?s:\/\/(?:www\.)?youtube.com\/embed\/([a-zA-Z0-9_-]+)/.exec(props.src);
                if (result) {
                    delete props['src'];
                    props.id = result[1];
                    if (!props.height) {
                        delete props.height;
                    }
                    if (!props.width) {
                        delete props.width;
                    }

                    return {
                        name: 'youtube-video',
                        props,
                        isContent: true,
                        isParent: false,
                    }
                }
            }
        }
    }
}

export default builder;
