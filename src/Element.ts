
import { XmlEncode } from './xml';

const CONTENT_ELEMENT_NAME_REG = /^iframe|img|meta|link$/;

export type ElementProps = { [index: string]: string }

export interface IElement {
    readonly name: string
    readonly props: ElementProps
    xml(): string
    text(): string
    html(): string
    prop(name: string, value?: string): string
    hasContent(): boolean
    isParent(): boolean
    isText(): boolean
    asText(): TextElement
    asParent(): ParentElement
}

export class Element implements IElement {
    readonly name: string
    readonly props: ElementProps

    constructor(name: string, props?: ElementProps) {
        if (typeof name !== 'string' || name.trim().length < 1) {
            throw new Error(`Element name is required!`);
        }
        this.name = name.trim().toLowerCase();
        this.props = props || {};
    }

    isParent() { return false; }
    isText() { return false; }

    asText(): TextElement {
        return null;
    }
    asParent(): ParentElement {
        return null;
    }

    text(): string {
        return '';
    }

    // addChild(child: IElement) {
    //     return this.children.push(child);
    // }

    hasContent(): boolean {
        return CONTENT_ELEMENT_NAME_REG.test(this.name);
    }

    prop(name: string, value?: string): string {
        if (typeof name !== 'string' || !name) {
            throw new Error(`'name' parameter is invalid`);
        }
        if (value === null) {
            delete this.props[name];
        } else if (value !== undefined) {
            this.props[name] = value;
        }

        return this.props[name];
    }

    xml(): string {
        const content = this.contentXML();
        let props = '';
        if (this.props && Object.keys(this.props).length) {
            props = ' ' + Object.keys(this.props).map(prop => `${prop}="${XmlEncode(this.props[prop])}"`).join(' ');
        }
        if (content) {
            return `<${this.name}${props}>${XmlEncode(content)}</${this.name}>`;
        }
        return `<${this.name}${props} />`;
    }

    protected contentXML(): string {
        return '';
    }

    html(): string {
        return this.xml();
    }
}

export class ParentElement extends Element {
    readonly children: IElement[] = []

    constructor(name: string, props?: ElementProps) {
        super(name, props);
    }

    hasContent(): boolean {
        return !!this.children.find(item => item.hasContent());
    }

    contentXML(): string {
        return this.children.map(item => item.xml()).join('');
    }

    isParent() { return true; }

    text(): string {
        return this.children.map(item => item.text()).join('');
    }
    asParent(): ParentElement {
        return this;
    }
}

export class TextElement extends Element {

    constructor(public content?: string, props?: ElementProps) {
        super('text', props);
    }

    xml(): string {
        return `<text>${XmlEncode(this.text())}</text>`;
    }

    hasContent(): boolean {
        return true;
    }

    isText() { return true; }

    text(): string {
        return this.content;
    }

    add(text: string) {
        return this.content += text;
    }
    asText(): TextElement {
        return this;
    }

    html(): string {
        return this.text();
    }
}
