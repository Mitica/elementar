
import { ElementsBuilder } from './ElementsBuilder';
import test from 'ava';
import { cheerioFromHTML } from './utils';
import { TagElement } from './Element';

test('buildElements', t => {
    const $ = cheerioFromHTML('<div> some <span></span>text <p>in P text</p></div>');

    const builder = new ElementsBuilder();
    const elements = builder.build($.toArray());

    t.is(!!elements, true, 'elements must be valid');
    t.is(elements.length, 1, 'one root element');
    t.is(elements[0].children.length, 2, '2 children');
    t.is(elements[0].text(), ' some text in P text', 'concat text');
});

test('use onElement callback', t => {
    const $ = cheerioFromHTML('<div><p>Here</p> is the <span>answer</span><i>!</i></div>');

    const builder = new ElementsBuilder({
        onElement: function (element: CheerioElement) {
            if (element.tagName === 'p') {
                return 'ignore';
            }
            if (element.tagName === 'i') {
                return 'invalid';
            }
            if (element.tagName === 'span') {
                return {
                    name: 'span',
                    props: {},
                    isContent: false,
                    isLeaf: false
                };
            }
        }
    });
    const elements = builder.build($.toArray());

    t.is(!!elements, true, 'elements must be valid');
    t.is(elements.length, 1, 'one root element');
    t.is(elements[0].html(), '<div>Here is the <span>answer</span></div>', 'works node replace');
    t.is(elements[0].text(), 'Here is the answer', 'concat text');
});
