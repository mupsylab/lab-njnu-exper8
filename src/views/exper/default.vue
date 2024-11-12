<template>
    <div id="exp"></div>
</template>

<script setup lang="ts">
import { initJsPsych } from 'jspsych';
import { onMounted, render, h } from 'vue';

import jsPsychHtmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

import { useCheckBrowserInfo } from "../../store/browserCheck";
import { useLoaderAssets } from '../../store/loadAssetsToBlob';
import endExp from "../../components/endExp.vue";
import questionnaire from '../../components/questionnaire/default.vue';
import Session from '../../utils/session';
import { getUuid } from '../../utils/random';

const loader = useLoaderAssets();
const cbi = useCheckBrowserInfo();
const jsPsych = initJsPsych({
    display_element: "exp"
});

const timeline: object[] = [{
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<span id='a1'>0</span>/<span id='a2'>1</span>",
    on_load() {
        // 初始化代码放这里
        if (!loader.isInit) {
            // 进行加载，同时避免vue的热更新
            loader.addAssets("./assets/logo/logo.svg");
            loader.addAssets("./assets/logo/logo_64_64.png");
            loader.addAssets("./assets/logo/logo_128_128.png");
        }
        loader.startLoad();

        const totalNumDom = document.querySelector("#a2") as HTMLDivElement;
        const countNumDom = document.querySelector("#a1") as HTMLDivElement;

        const i = setInterval(() => {
            if (cbi.isInit && loader.isFinish) {
                clearInterval(i);
                jsPsych.finishTrial({
                    type: "init-function"
                });
            } else {
                const { len, left, loading } = loader.progress;
                totalNumDom.innerText = len.toString();
                countNumDom.innerText = (len - left + loading).toFixed(2);
            }
        }, 100);
    }
}];

timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='box'></div>",
    on_load() {
        render(h(questionnaire, {
            ques: [
                { name: "aa1", quesType: "text", title: "6666", placeholder: "请输入需要的文本", valid: [{ required: true }] },
                { name: "aa2", quesType: "radio", title: "测试单选题", choices: ["1", "2"] },
                { name: "aa3", quesType: "checkbox", title: "测试多选题", choices: ["1", "2"] },
                { name: "aa4", quesType: "switch", title: "测试选项卡", choices: ["1", "2"] },
            ],
            onEndTrial(data) {
                console.log(data);
                // jsPsych.finishTrial(data);
            }
        }), document.querySelector("#box") as Element);
    }
});

timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='box'></div>",
    on_load() {
        const uuid = getUuid();
        jsPsych.data.write(cbi.browser);
        render(h(endExp, {
            onEndTrial() {
                new Session().offlineSave(jsPsych.data.get().csv(), uuid);
            }
        }), document.querySelector("#box") as Element);
    }
});

onMounted(() => {
    jsPsych.run(timeline);
});
</script>