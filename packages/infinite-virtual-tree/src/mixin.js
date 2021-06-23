export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        defaultExpand: {
            type: Boolean,
            default: false,
        },
        timeout: {
            // 刷新频率
            type: Number,
            default: 10,
        },
        option: {
            // 配置对象
            type: Object,
            default: () => ({
                height: 500, // 滚动容器的高度
                itemHeight: 25, // 单个item的高度
            }),
        },
        lazy: {
            // 是否懒加载
            type: Boolean,
            default: false,
        },
        load: {
            type: [Function, undefined],
            default: undefined,
        },
        treeOptions:{
            type:Array,
            default:()=>[]
        }
    }
}