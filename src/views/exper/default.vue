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

const loader = useLoaderAssets();
const cbi = useCheckBrowserInfo();
const jsPsych = initJsPsych({
    display_element: "exp"
});

const t = false;
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

import trial1_1 from './1a/trial1_1.vue';
import trial1_2 from './1b/trial1_2.vue';
import questionnaire from '../../components/questionnaire/default.vue';
import ques from './3/ques.vue';
import trial4 from './4/trial4.vue';
import Instr4 from './4/instr4.vue';
import Instr from './instr.vue';
import Naodao from '../../utils/naodao';
import Session from '../../utils/session';
import { getUuid } from '../../utils/random';

timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='box'></div>",
    on_load() {
        render(h(Instr, {
            onEndTrial() {
                jsPsych.finishTrial({});
            }
        }), document.querySelector("#box") as Element);
    }
});

// 1a
timeline.push({
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        choices: ["NO_KEYS"],
        stimulus: "<div id='box'></div>",
        on_load() {
            render(h(trial1_1, {
                word: "老道",
                onEndTrial(data: string) {
                    jsPsych.finishTrial({
                        word: "老道",
                        value: data,
                        save: true,
                        trial_type_self: "question_trial_1a"
                    });
                }
            }), document.querySelector("#box") as Element);
        }
    }],
    conditional_function() {
        return t;
    }
});

// 1b
timeline.push({
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        choices: ["NO_KEYS"],
        stimulus: "<div id='box'></div>",
        on_load() {
            render(h(trial1_2, {
                pinyin: ["lǎo", "dào"],
                desc: "描述人 (做事) 老练、周全，各方面都能够顾及",
                onEndTrial(data: String[]) {
                    jsPsych.finishTrial({
                        pinyin: ["lǎo", "dào"].join(" "),
                        value: data.join(),
                        save: true,
                        trial_type_self: "question_trial_1b"
                    });
                }
            }), document.querySelector("#box") as Element);
        }
    }],
    conditional_function() {
        return !t;
    }
});

// 2
timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='box'></div>",
    on_load() {
        render(h(questionnaire, {
            ques: [
                {
                    quesType: "desc",
                    name: "q0",
                    title: "",
                    desc: "您需要根据屏幕上呈现的问题进行选择，选择时请用鼠标点击对应选项即可，在完成后<strong>请按“提交”继续。</strong>"
                },
                {
                    quesType: "radio",
                    name: "q1",
                    title: "以下哪个词更适合“描述人（做事）老练、周全”",
                    choices: ["老道", "老到"],
                    valid: [
                        { message: "请选择合适的选项进行提交", required: true }
                    ]
                }
            ],
            onEndTrial(data) {
                jsPsych.finishTrial({
                    value: ["老道", "老到"].indexOf(data["q1"]) + 1,
                    save: true,
                    trial_type_self: "question_trial_2"
                });
            }
        }), document.querySelector("#box") as Element);
    }
});

// 3
timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='box'></div>",
    on_load() {
        render(h(ques, {
            questionId: "q1",
            questionTitle: "",
            questionSubTitle: ["请你对“老道”一词的熟悉程度进行评分", "请你对“老到”一词的熟悉程度进行评分"],
            questionSelectText: ["非常不熟悉", "比较不熟悉", "有点不熟悉", "一般熟悉", "有点熟悉", "比较熟悉", "非常熟悉"],
            onEndTrial(data: { [key: string]: String }) {
                jsPsych.data.write({
                    value: data["q1_0"],
                    save: true,
                    trial_type_self: "question_trial_3_q1"
                });
                jsPsych.data.write({
                    value: data["q1_1"],
                    save: true,
                    trial_type_self: "question_trial_3_q2"
                });
                jsPsych.finishTrial({});
            }
        }), document.querySelector("#box") as Element);
    }
});

// 4
timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: [" "],
    stimulus: "<div id='box'></div>",
    on_load() {
        render(h(Instr4), document.querySelector("#box") as Element);
    }
}, {
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        choices: ["NO_KEYS"],
        stimulus: "<div id='box'></div>",
        on_load() {
            const { word, dim } = jsPsych.getAllTimelineVariables();
            const ll: { [key: string]: string } = {
                "道德": "用于描述人的道德品格或道德品质（包括积极与消极）",
                "能力": "用于描述人可用来完成某一项目标或者任务的综合素质（这里的目标和任务不包括人际交往）",
                "社交能力": "用于描述人的人际交往能力",
                "外貌": "用于描述人的长相、身材等",
                "社会经济地位": "用于描述人的社会地位和经济水平等",
            };
            render(h(trial4, {
                title: `【${word}】可以用于描述某个人的【${dim}】`,
                desc: `${dim}: ${ll[dim]}`,
                optionLabelMin: "非常不同意",
                optionLabelMax: "非常同意",
                onEndTrial(data: String) {
                    jsPsych.finishTrial({
                        word: word,
                        dim: dim,
                        value: data,
                        trial_type_self: "question_trial_4",
                        save: true
                    });
                }
            }), document.querySelector("#box") as Element);
        }
    }],
    timeline_variables: jsPsych.randomization.factorial({
        word: ["老到"],
        dim: ["道德", "能力", "社交能力", "外貌", "社会经济地位"]
    })
});

timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='box'></div>",
    on_load() {
        render(h(questionnaire, {
            ques: [
                {
                    quesType: "desc",
                    name: "q0",
                    title: "",
                    desc: "您需要根据屏幕上呈现的问题进行选择，选择时请用鼠标点击对应选项即可，在完成后<strong>请按“提交”继续。</strong>"
                },
                {
                    quesType: "radio",
                    name: "q1",
                    title: "请你对“老道”、“老到”两个词语的相对熟悉程度进行选择",
                    choices: ["对“老道”更熟悉", "对“老到”更熟悉"],
                    valid: [
                        { message: "请选择合适的选项进行提交", required: true }
                    ]
                }
            ],
            onEndTrial(data) {
                jsPsych.finishTrial({
                    value: ["对“老道”更熟悉", "对“老到”更熟悉"].indexOf(data["q1"]) + 1,
                    save: true,
                    trial_type_self: "question_trial_3_q3"
                });
            }
        }), document.querySelector("#box") as Element);
    }
});

timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='box'></div>",
    on_load() {
        render(h(questionnaire, {
            ques: [
                {
                    quesType: "text",
                    name: "name",
                    title: "请输入自己的姓名",
                    valid: [
                        { message: "请输入自己的名字", required: true }
                    ]
                },
                {
                    quesType: "radio",
                    name: "gender",
                    title: "请选择你的性别",
                    choices: ["男", "女"],
                    valid: [
                        { message: "请选择你的性别", required: true }
                    ]
                },
                {
                    quesType: "date",
                    name: "birthday",
                    title: "请输入你的生日",
                    valid: [
                        { message: "请输入你的生日", required: true }
                    ]
                },
                {
                    quesType: "radio",
                    name: "education",
                    title: "请选择你的学历",
                    choices: ["小学以下", "小学", "初中", "高中", "大学", "硕士", "博士", "其他"],
                    valid: [
                        { message: "请选择你的学历", required: true }
                    ]
                }
            ],
            onEndTrial(data) {
                jsPsych.data.get().addToAll(data);
                jsPsych.finishTrial({ });
            }
        }), document.querySelector("#box") as Element);
    }
});

const nd = new Naodao();
nd.getData = () => {
    return jsPsych.data.get().csv();
}
timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='box'></div>",
    on_load() {
        jsPsych.data.write(cbi.browser);
        render(h(endExp, {
            onEndTrial() {
                // nd.save()
                new Session().offlineSave(jsPsych.data.get().csv(), getUuid());
            }
        }), document.querySelector("#box") as Element);
    }
});

onMounted(() => {
    jsPsych.run(timeline);
});
</script>