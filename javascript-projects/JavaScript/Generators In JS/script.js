console.log("Generator");

// without storing in the memory
// generates on the fly
function* myGenerator() {
    let it = 0;
    // yield 1;
    // yield 2;
    // yield 3;
    // yield 4;
    while(true) {
        yield it++;
    }
}

const gen = myGenerator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());