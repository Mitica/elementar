
import { IElement, TextElement, Element } from './element';

export interface ElementsBuilderOptions {
    readonly omitElements?: RegExp
    readonly invalidElements?: RegExp
    readonly emptyElements?: RegExp
}

export class ElementsBuilder {
    private options: ElementsBuilderOptions

    constructor(options?: ElementsBuilderOptions) {
        this.options = options || {};
    }

    build(nodes: CheerioElement[]): IElement[] {
        return this.buildElements(nodes, []);
    }

    private buildElements(nodes: CheerioElement[], elements: IElement[]): IElement[] {
        nodes.forEach(node => {
            // console.log('element', element);
            if (node.type === 'text') {
                this.addElement(elements, new TextElement(node.data));
                return;
            }

            const rootElement = new Element(node.name);
            this.buildElements(node.children, rootElement.children);
            this.addElement(elements, rootElement);
        });

        return elements;
    }

    private addElement(elements: IElement[], element: IElement): boolean {
        if (!this.isValidElement(element)) {
            return false;
        }
        if (element instanceof TextElement) {
            const last = elements.length && elements[elements.length - 1] || null;
            if (last && last instanceof TextElement) {
                last.content += element.content;
                return
            }
        }

        elements.push(element);

        return true;
    }

    private isValidElement(element: IElement) {
        // return true;
        return element.hasContent();
    }
}
