
import debug from './debug';
import { IElement, Element, buildElementFromData } from './Element';
import { ELEMENTAR_OPTIONS, ElementarOptions, OnElementReturn } from './options';
import { buildElement } from './element-builders';

export class ElementsBuilder {
    private options: ElementarOptions

    constructor(options?: ElementarOptions) {
        this.options = { ...ELEMENTAR_OPTIONS, ...options }
    }

    build(nodes: CheerioElement[]): IElement[] {
        return this.buildElements(nodes, []);
    }

    private buildElements(nodes: CheerioElement[], elements: IElement[]): IElement[] {
        nodes.forEach(node => {
            let element: IElement
            if (typeof this.options.onElement === 'function') {
                const result = this.options.onElement(node);
                if (result === 'invalid') {
                    debug(`invalid node: ${node.name}`);
                    return;
                }
                else if (result === 'abstract') {
                    debug(`abstract node: ${node.name}`);
                    this.buildElements(node.children, elements);
                    return;
                }
                else if (result && result.name) {
                    element = buildElementFromData(result);
                    if (element) {
                        if (!element.isLeaf) {
                            this.buildElements(node.children, element.children);
                        }
                        elements.push(element);
                        return;
                    }
                }
            }
            // not created by onElement callback
            // if (!element) {
            element = buildElement(node, this.options);
            // }
            // not created locally
            if (!element) {
                debug(`not created element: ${node.name}`);
                return;
            }
            // some nodes can be invalid and be a special element: an youtube iframe
            if (!element.isContent && !this.isValidNode(node)) {
                debug(`invalid node: ${node.name}`);
                return;
            }
            if (!element.isLeaf) {
                this.buildElements(node.children, element.children);
            }
            this.addElement(elements, element);
        });

        return elements;
    }

    private addElement(elements: IElement[], element: IElement): boolean {
        if (this.isInvalidElement(element)) {
            debug(`invalid element: ${element.name}`);
            return false;
        }
        if (element.isText()) {
            const last = elements.length && elements[elements.length - 1] || null;
            if (last && last.isText()) {
                last.addData(element.text());
            } else {
                elements.push(element);
            }

            return true;
        }

        let ignoreElement = false;

        if (!element.isContent) {
            if (!element.children || element.children.length === 0) {
                // no content AND no children
                debug(`Leaf no content element: ${element.name}`);
                return false;
            }
            // no isContent children
            ignoreElement = !element.children.find(item => item.isContent);

            // is abstract
            ignoreElement = ignoreElement || this.options.abstractElements.indexOf(element.name) > -1;
        }

        // ignore element
        if (ignoreElement) {
            if (!element.isLeaf && element.children) {
                debug(`Add childs of a Ignored elemenet: ${element.name}`);
                element.children.forEach(child => this.addElement(elements, child));
            }
            return false;
        }

        elements.push(element);

        return true;
    }

    private isInvalidElement(element: IElement) {
        return !element.hasContent()
            && this.options.emptyElements.indexOf(element.name) < 0;
    }

    private isValidNode(node: CheerioElement) {
        if (node.type === 'text') {
            return true;
        }
        if (node.type === 'tag' && this.options.invalidElements.indexOf(node.name) < 0) {
            return true;
        }

        return false;
    }
}
