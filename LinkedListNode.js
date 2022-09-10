export class LinkedListNode {
    constructor(item) {
        this.item = item;
        this.next = null;
    }
    get item(){
        return this.item;
    }
    get next(){
        return this.next;
    }
    setNext(node) {
        this.next = node;
    }
}