<script setup lang="ts">
import { ElButton, ElMessage } from 'element-plus';

const emits = defineEmits(["endTrial"]);
const props = defineProps({
    pinyin: Array<String>,
    desc: String
});

const inputTextResult = (function() {
    const res: String[] = [];
    props.pinyin?.forEach(_ => {
        res.push("");
    });
    return res;
})();
const inputText = (e: Event, i: number) => {
    const dom = e.target as HTMLInputElement;
    dom.value = dom.value[dom.value.length - 1];

    inputTextResult[i] = dom.value;
}
const endTrial = () => {
    if (inputTextResult.join("").length == props.pinyin?.length) {
        emits('endTrial', inputTextResult);
    } else {
        ElMessage.error("输入词少于拼音数量");
    }
}
</script>

<template>
    <div>
        <div class="text-box">
            <div class="text" :style="`--len: ${props.pinyin?.length};`" v-for="p, i in props.pinyin">
                <div class="pinyin">{{ p }}</div>
                <div class="word">
                    <input type="text" @input="inputText($event, i);" />
                </div>
            </div>
            <div>{{ props.desc }}</div>
        </div>
        <div class="button-box">
            <ElButton type="primary" @click="endTrial">提交</ElButton>
        </div>
    </div>
</template>

<style scoped>
.text-box {
    display: block;
    text-align: center;
}

.button-box {
    margin: 24px 0 0 0;
    text-align: center;
}

.text {
    display: inline-block;
    width: 72px;
    text-align: center;
}

.text .pinyin {
    display: block;
    width: 64px;
    text-align: center;
}

.text .word {
    display: block;
    width: 62px;
    height: 62px;
    background-image: linear-gradient(0deg, var(--font-desc) 50%, transparent 51%, transparent 100%),
        linear-gradient(90deg, var(--font-desc) 50%, transparent 51%, transparent 100%);
    background-size: 2px 10px, 10px 2px;
    background-position: 30px 0px, 0px 30px;
    background-repeat: repeat-y, repeat-x;
    border: 1px solid var(--font-desc);
    box-sizing: content-box;
    overflow: hidden;
}

.text .word input[type=text] {
    width: 64px;
    height: 64px;
    margin: 0;
    padding: 0;
    border: none;
    font-size: 48px;
    line-height: 64px;
    text-align: center;
    background-color: transparent;
    color: var(--font-color);
}
</style>