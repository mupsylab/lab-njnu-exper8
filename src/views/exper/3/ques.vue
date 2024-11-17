<template>
    <div class="question-box">
        <div class="instr-box">
            <p>您需要根据屏幕上呈现的问题进行选择，选择时请用鼠标点击对应选项或拖动相应滑块即可，在完成后<strong>请按“空格键”继续。</strong></p>
        </div>
        <div class="question-title">{{ props.questionTitle }}</div>
        <div class="question-table">
            <table>
                <colgroup>
                    <col width="30%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                </colgroup>
                <tbody>
                    <tr>
                        <td></td>
                        <td style="font-weight: 700;" v-for="t in props.questionSelectText">{{ t }}</td>
                    </tr>
                    <tr v-for="v, i in props.questionSubTitle">
                        <td style="text-align: left;">
                            <span style="font-weight: 700;">题目{{ i + 1 }}:</span>
                            <span style="font-size: 20px;">{{ v }}</span>
                        </td>
                        <td v-for="v, j in props.questionSelectText" @click="radioEvent(`${questionId}_${i}`, (j + 1).toString());">
                            <input type="radio" :name="`${questionId}_${i}`" :value="v" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';

const props = defineProps({
    questionId: String,
    questionTitle: String,
    questionSubTitle: Array<String>,
    questionSelectText: Array<String>
});
const emits = defineEmits(["endTrial"]);

const result: { [key: string]: String } = {};
const radioEvent = (key: string, value: String) => {
    result[key] = value;
}
const keyboardEvent = (e: KeyboardEvent) => {
    const { key } = e;

    if (key == " " && Object.keys(result).length == props.questionSubTitle?.length) {
        emits("endTrial", result);
        document.body.parentElement?.removeEventListener("keypress", keyboardEvent);
    } else {
        ElMessage.error("请选择全部的选项")
    }
}
onMounted(() => {
    document.body.parentElement?.addEventListener("keypress", keyboardEvent);
});
</script>

<style scoped>
.instr-box {
    margin: 0 0 100px 0;
}

p {
    font-size: 24px;
    line-height: 48px;
}

.question-box {
    width: 1200px;
    margin: 20px 0;
    font-size: 24px;
    font-weight: 400;
    user-select: none;
}

.question-title {
    font-weight: 700;
    text-align: left;
}

.question-table table {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
}

.question-table table input[type=radio] {
    width: 32px;
    height: 32px;
}

.question-table table td {
    padding: 15px 0;
}
</style>