export default {
    computed: {
        flattenTree() {
            const flatten = function (node) {
                let arr = [];
                node.forEach(item => {
                    arr.push(item);
                    if (item.children) {
                        arr.push(...flatten(item.children));
                    }
                });
                return arr;
            };
            return flatten(this.tree);
        }
    }
}