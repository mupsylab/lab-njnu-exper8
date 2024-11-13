<script setup lang="ts">
import { ElButton, ElForm, ElSelect, ElOption, ElFormItem, ElInput, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElDivider } from "element-plus";
import type { FormInstance, FormRules, FormItemRule } from 'element-plus'
import { reactive, ref, toRaw } from "vue";

import { Ques, quesAnswerType } from "./default";

const emits = defineEmits(["endTrial"]);
const props = defineProps<{ ques: Ques[] }>();
const propQues: Ques[] = props.ques ?? [
    { name: "aa1", quesType: "text", title: "测试填空题", placeholder: "请输入需要的文本", valid: [{ required: true }] },
    { name: "aa2", quesType: "radio", title: "测试单选题", choices: ["1", "2"] },
    { name: "aa3", quesType: "checkbox", title: "测试多选题", choices: ["1", "2"] },
    { name: "aa4", quesType: "switch", title: "测试选项卡", choices: ["1", "2"] },
];

const form = reactive((function () {
    const obj: { [key: string]: any } = {};
    propQues.forEach(item => {
        obj[item.name] = quesAnswerType[item.quesType];
    });
    return obj;
})());
const rules = reactive<FormRules>((function () {
    const obj: { [key: string]: Array<FormItemRule> } = {};
    propQues.forEach(item => {
        obj[item.name] = [];
        item.valid?.forEach(rule => {
            obj[item.name].push(rule);
        });
    });
    return obj;
})());

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            emits("endTrial", toRaw(form));
        } else {
            console.log(fields)
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const formRef = ref<FormInstance>();
</script>

<template>
    <div class="questionnaire">
        <ElForm ref="formRef" status-icon :rules="rules" :model="form" @submit.prevent label-position="top" size="default">
            <template v-for="ques in propQues">
                <ElFormItem :prop="ques.name">
                    <div class="title">{{ ques.title }}</div>
                    <template v-if="ques.quesType == 'text'">
                        <ElInput :name="ques.name" :readonly="ques.readonly ?? false"
                            :show-password="ques.showPassword ?? false" :placeholder="ques.placeholder"
                            v-model="form[ques.name]" />
                    </template>
                    <template v-if="ques.quesType == 'radio'">
                        <ElRadioGroup v-model="form[ques.name]">
                            <div v-for="choice, i in ques.choices">
                                <ElRadio style="--el-radio-font-size: 24px;" :value="choice" :label="choice" />
                            </div>
                        </ElRadioGroup>
                    </template>
                    <template v-if="ques.quesType == 'checkbox'">
                        <ElCheckboxGroup v-model="form[ques.name]">
                            <div v-for="choice, i in ques.choices">
                                <ElCheckbox :value="choice" :label="choice" />
                            </div>
                        </ElCheckboxGroup>
                    </template>
                    <template v-if="ques.quesType == 'switch'">
                        <ElSelect v-model="form[ques.name]">
                            <ElOption v-for="choice, i in ques.choices" :label="choice" :value="choice"></ElOption>
                        </ElSelect>
                    </template>
                </ElFormItem>
                <ElDivider />
            </template>
            <div style="text-align: center;">
                <ElButton type="danger" @click="resetForm(formRef);">清除</ElButton>
                <ElButton type="primary" @click="submitForm(formRef);">提交</ElButton>
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

.questionnaire .title {
    height: 48px;
    font-size: 24px;
    line-height: 1.5em;
}
</style>

<style>
.el-radio-group {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.el-radio {
    color: var(--font-color);
}
</style>