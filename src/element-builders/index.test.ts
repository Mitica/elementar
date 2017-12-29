
import { buildElement } from './index';
import test from 'ava';
import { CustomElement, ElementBuildData } from '../options';
import { ElementProps } from '../Element';

test('build customElements', t => {
    const node = {
        type: 'tag',
        name: 'div',
        tagName: 'div',
        children: [],
        childNodes: [],
        lastChild: null,
        firstChild: null,
        next: null,
        prev: null,
        nextSibling: null,
        previousSibling: null,
        parent: null,
        parentNode: null,
        nodeValue: null,
        attribs:
            { class: 'tab active' }
    } as CheerioElement;

    const element = buildElement(node, { customElements: [builder] });

    t.is(element.name, 'div-tab', 'converted to custom element');
});


const builder: CustomElement = {
    name: 'div-tab',

    build(node: CheerioElement): ElementBuildData {
        if (node.type === 'tag' && node.name === 'div' && node.attribs.class && /\btab\b/.test(node.attribs.class)) {
            return {
                name: 'div-tab',
                isContent: false,
                isLeaf: true,
            }
        }
    }
}