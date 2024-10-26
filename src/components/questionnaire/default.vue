<script setup lang="ts">
import { ElButton, ElForm, ElSelect, ElOption, ElFormItem, ElInput, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElDivider } from "element-plus";
import { reactive, toRaw } from "vue";

import { Ques, quesAnswerType } from "./default";

const emits = defineEmits(["endTrial"]);
const props = defineProps<{
    ques: Ques[] | undefined
}>();
const prop: Ques[] = props.ques ?? [
    { name: "aa1", quesType: "text", title: "测试填空题", placeholder: "请输入需要的文本" },
    { name: "aa2", quesType: "radio", title: "测试单选题", choices: ["1", "2"] },
    { name: "aa3", quesType: "checkbox", title: "测试多选题", choices: ["1", "2"] },
    { name: "aa4", quesType: "switch", title: "测试选项卡", choices: ["1", "2"] },
    { name: "aa5", quesType: "switch", title: "测试选项卡", choices: ["1", "2"] },
    { name: "aa6", quesType: "switch", title: "测试选项卡", choices: ["1", "2"] },
];

const form = reactive((function () {
    const obj: { [key: string]: any } = {};
    prop.forEach(item => {
        obj[item.name] = quesAnswerType[item.quesType];
    });
    return obj;
})());

const submit = () => { emits('endTrial', toRaw(form)); }
const ss = () => {
    const dom = document.querySelector("form");
    dom?.dispatchEvent(new SubmitEvent("submit"));
}
</script>

<template>
    <div class="questionnaire">
        <ElForm :model="form" @submit.prevent="submit" label-position="top" size="default">
            <template v-for="ques in prop">
                <ElFormItem v-if="ques.quesType == 'text'">
                    <div>{{ ques.title }}</div>
                    <ElInput :name="ques.name" 
                        :readonly="ques.readonly ?? false"
                        :show-password="ques.showPassword ?? false" 
                        :placeholder="ques.placeholder"
                        v-model="form[ques.name]" />
                </ElFormItem>
                <ElFormItem v-if="ques.quesType == 'radio'">
                    <div>{{ ques.title }}</div>
                    <ElRadioGroup v-model="form[ques.name]">
                        <div v-for="choice, i in ques.choices">
                            <ElRadio :value="i">{{ choice }}</ElRadio>
                        </div>
                    </ElRadioGroup>
                </ElFormItem>
                <ElFormItem v-if="ques.quesType == 'checkbox'">
                    <div>{{ ques.title }}</div>
                    <ElCheckboxGroup v-model="form[ques.name]">
                        <div v-for="choice, i in ques.choices">
                            <ElCheckbox :value="i">{{ choice }}</ElCheckbox>
                        </div>
                    </ElCheckboxGroup>
                </ElFormItem>
                <ElFormItem v-if="ques.quesType == 'switch'">
                    <div>{{ ques.title }}</div>
                    <ElSelect v-model="form[ques.name]">
                        <ElOption v-for="c, i in ques.choices" :label="c" :value="i"></ElOption>
                    </ElSelect>
                </ElFormItem>
                <ElDivider />
            </template>
            <div>
                <ElButton type="danger">上一页</ElButton>
                <ElButton type="primary" @click="ss">下一页</ElButton>
            </div>
        </ElForm>
    </div>
</template>

<style scoped>
.questionnaire {
    max-width: 100vw;
    text-align: left;
    user-select: none;
}
</style>

<style>
.el-form-item__content,
.el-radio-group {
    display: block;
}
</style>