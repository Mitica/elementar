
import { Element } from './elements';
import test from 'ava';

test('Element constructor', t => {
    let element = new Element('test');
    t.is(element.name, 'test', 'invalid element name');
    t.is(!!element.props, true, 'invalid element props');
    t.is(Object.keys(element.props).length, 0, '0 element props');
    t.is(element.toXML(), '<test />', 'invalid XML');

    element = new Element('article', { id: '123', class: 'js-article' });
    t.is(element.name, 'article', 'invalid element name');
    t.is(!!element.props, true, 'invalid element props');
    t.is(Object.keys(element.props).length, 2, '2 element props');
    t.is(element.props['id'], '123', 'not set props:id');
    t.is(element.props['class'], 'js-article', 'not set props:class');
    t.is(element.toXML(), '<article id="123" class="js-article" />', 'invalid XML');
});
