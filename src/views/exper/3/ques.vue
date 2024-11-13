<template>
    <div class="question-box">
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
                        <td v-for="v in props.questionSelectText" @click="radioEvent(`${questionId}_${i}`, v);">
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