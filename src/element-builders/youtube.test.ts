
import builder from './youtube';
import test from 'ava';

test('#build', t => {
    const validData = {
        type: 'tag',
        name: 'iframe',
        tagName: 'iframe',
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
            { src: 'https://www.youtube.com/embed/sQvzXwk_nJ4?rel=0', width: '500', height: '300' }
    } as CheerioElement;

    let element = builder.build(validData);

    t.is(!!element, true, 'built element');
    t.is(element.props.vid, 'sQvzXwk_nJ4', 'youtube id is correct');
    t.is(element.props.width, '500', 'youtube width is correct');
    t.is(element.props.height, '300', 'youtube width is correct');

    const invalidData = {
        type: 'tag',
        name: 'iframe',
        tagName: 'iframe',
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
            { src: 'https://www.youtube.com/VIDEo/sQvzXwk_nJ4?rel=0', width: '500', height: '300' }
    } as CheerioElement;

    element = builder.build(invalidData);

    t.is(!!element, false, 'no element');
});
