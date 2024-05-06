let hh = {
    dd: [1, 2, 3, 4, 5],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.dd.length) {
                    const result = { value: this.dd[index], done: false };
                    index++;
                    return result;
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    },
};
for (let x of hh) {
    console.log(x);
}