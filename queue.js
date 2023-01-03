class Queue{
    constructor(cap){
        this.arr = []
        this.cap = cap
        this.size = 0
        this.head = 0
        this.tail = 0
    }

    push(elem){
        if(this.size == this.cap){
            console.error('NOT ENOUGH SPACE')
            return
        }
        this.arr[this.tail] = elem
        this.tail++;
        if(this.tail === this.cap){
            this.tail = 0
        }
        this.size++
    }

    peek(){
        return this.arr[this.head]
    }

    pop(){
        if(this.size === 0){
            console.error('QUEUE IS EMPTY')
            return
        }
        let x = this.arr[this.head]
        this.head++;
        if(this.head === this.cap){
            this.head = 0
        }
        this.size--;
    }
}