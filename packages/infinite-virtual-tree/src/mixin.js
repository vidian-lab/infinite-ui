export default {
    props: {
        tree: {
            type: Array,
            required: true,
            default() {
                return [];
            },
        },
        defaultExpand: {
            type: Boolean,
            required: false,
            default: false,
        },
        timeout: {
            //刷新频率
            type: Number,
            default: 10,
        },
        option: {
            // 配置对象
            type: Object,
            required: true,
            default() {
                return {
                    height: 500, //滚动容器的高度
                    itemHeight: 25, // 单个item的高度
                };
            }
        },
        nodeKey: {
            type: String,
            default: 'id'
        }
    }
}