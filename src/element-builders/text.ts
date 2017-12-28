
import { IElement, TextElement } from '../Element';

export default function build(node: CheerioElement): IElement {
    if (node.type === 'text') {
        return new TextElement(node.data);
    }
}
