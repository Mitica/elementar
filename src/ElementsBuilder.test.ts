
import { ElementsBuilder } from './ElementsBuilder';
import test from 'ava';
import { cheerioFromHTML } from './utils';
import { ParentElement } from './Element';

test('buildElements', t => {
    const $ = cheerioFromHTML('<div> some <span></span>text <p>in P text</p></div>');

    const builder = new ElementsBuilder();
    const elements = builder.build($.toArray());

    t.is(!!elements, true, 'elements must be valid');
    t.is(elements.length, 1, 'one root element');
    t.is((<ParentElement>elements[0]).children.length, 2, '2 children');
    t.is(elements[0].text(), ' some text in P text', 'concat text');
});
