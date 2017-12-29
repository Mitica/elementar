
import { XmlEncode } from './xml';
import debug from './debug';

export type ElementProps = { [index: string]: string }

// export type ElementType = 'text' | 'tag';

export interface IElement {
    // readonly type
    readonly name: string
    readonly props: ElementProps
    readonly isContent: boolean
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
    readonly isContent: boolean

    constructor(name: string, props?: ElementProps, isContent?: boolean) {
        if (typeof name !== 'string' || name.trim().length < 1) {
            throw new Error(`Element name is required!`);
        }
        this.name = name.trim().toLowerCase();
        this.props = props || {};
        this.isContent = typeof isContent === 'boolean' ? isContent : false;
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
        return this.isContent;
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
        const content = this.formatXmlContent();
        let props = '';
        if (this.props && Object.keys(this.props).length) {
            props = ' ' + Object.keys(this.props).map(prop => `${prop}="${XmlEncode(this.props[prop])}"`).join(' ');
        }
        if (content) {
            return `<${this.name}${props}>${content}</${this.name}>`;
        }
        return `<${this.name}${props} />`;
    }
    html(): string {
        const content = this.formatHtmlContent();
        let props = '';
        if (this.props && Object.keys(this.props).length) {
            props = ' ' + Object.keys(this.props).map(prop => `${prop}="${XmlEncode(this.props[prop])}"`).join(' ');
        }
        if (content) {
            return `<${this.name}${props}>${content}</${this.name}>`;
        }
        return `<${this.name}${props} />`;
    }

    protected formatXmlContent(): string {
        return '';
    }
    protected formatHtmlContent(): string {
        return '';
    }
}

export class ParentElement extends Element {
    readonly children: IElement[] = []

    constructor(name: string, props?: ElementProps, isContent?: boolean) {
        super(name, props, isContent);
    }

    hasContent(): boolean {
        return this.isContent || !!this.children.find(item => item.hasContent());
    }

    protected formatXmlContent(): string {
        return this.children.map(item => item.xml()).join('');
    }
    protected formatHtmlContent(): string {
        return this.children.map(item => item.html()).join('');
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
        super('text', props, true);
    }

    hasContent() {
        return this.content && this.content.trim().length > 0;
    }

    xml(): string {
        return `<text>${XmlEncode(this.text())}</text>`;
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
