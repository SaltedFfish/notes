## vue2.x

### 具名插槽

`<slot :name="slotName"></slot>`

1. `<template #slotName></template>`
2. `<template v-slot:slotName></template>`

`<slot :name="slotName" :xxx="yyy"></slot>`

### 作用域插槽

**可以结构：#slotName="{yyy}" 或 slot-scope:slotName="{yyy}"**

1. `<template #slotName="xxx">{{xxx.yyy}}</template>`
2. `<template slot-scope:slotName="xxx">{{xxx.yyy}}</template>`

## vue.3.x

```vue
<!-- 父组件 -->
<template>
    <div>
        <Child>
            <!-- 默认插槽 -->
            <div>可以省略v-slot:default</div>
            <div v-slot:default>也可以加上v-slot:default</div>
            <!-- 具名插槽 -->
            <div v-slot:one>one插槽</div>
            <!-- 动态显示 -->
            <template v-slot:[dynamicSlot]>v-slot:[slotName]</template>
            <button @click="changeSlot">v-slot:[slotName]动态改变slot</button>
            <!-- 插槽传值 -->
            <template v-slot:four="slotProps">
                <div>{{ slotProps.addd }}</div>
                <div v-for="(item,index) in slotProps.list" :key="index">
                    {{ item.name }}
                </div>
            </template>
        </Child>
     <div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const dynamicSlot = ref<string>('two')
const changeSlot = ():void => {
    dynamicSlot.value = 'three' // 可以动态改变插槽名
}
</script>
<!-- 子组件 -->
<template>
    <div>
        <!-- 默认插槽 -->
        <slot></slot>
        <!-- 具名插槽 -->
        <slot name="one"></slot>
        <!-- 可以v-slot:[slotName]使用动态插槽，该slotName由变量控制 -->
        <slot name="two"></slot>
        <slot name="three"></slot>
        <!-- 父组件中可以通过v-slot:slotName="slotProps"接收slot参数 -->
        <slot name="four" :list="list" :addd="addd"></slot>
     <div>
</template>
<script lang="ts" setup>
import { reactive, ref, useSlots } from "vue";
const addd = ref<string>('啊对对对')
const list = reactive<{name:string}[]>([
    { name: 'John' },
    { name: 'Irelia' },
])
const slots = useSlots();
console.log(slots)
const defaultSlot = slots.default() // 获取默认插槽，多个的话是个数组
// const slotName = slots.slotName() // slot.插槽名 获取具名插槽
</script>
```
