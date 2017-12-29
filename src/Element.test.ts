
import { TagElement, TextElement } from './Element';
import test from 'ava';

test('Element constructor', t => {
    let element = new TagElement('test');
    t.is(element.name, 'test', 'invalid element name');
    t.is(!!element.props, true, 'invalid element props');
    t.is(Object.keys(element.props).length, 0, '0 element props');
    t.is(element.xml(), '<test />', 'invalid XML');

    element = new TagElement('article', { props: { id: '123', class: 'js-article' } });
    t.is(element.name, 'article', 'invalid element name');
    t.is(!!element.props, true, 'invalid element props');
    t.is(Object.keys(element.props).length, 2, '2 element props');
    t.is(element.props['id'], '123', 'not set props:id');
    t.is(element.props['class'], 'js-article', 'not set props:class');
    t.is(element.xml(), '<article id="123" class="js-article" />', 'invalid XML');

    element = new TextElement({ data: 'sample text' });
    t.is(element.name, 'text', 'invalid element name');
    t.is(element.data, 'sample text', 'invalid data');
    t.is(element.data, element.text(), 'invalid data text');
    t.is(element.xml(), '<text>sample text</text>', 'invalid XML');
});
