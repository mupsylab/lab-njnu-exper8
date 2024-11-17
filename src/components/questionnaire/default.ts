import type { FormItemRule } from 'element-plus'

interface BaseQues {
    readonly name: string;
    readonly title: string;
    readonly id?: string;
    readonly disabled?: boolean;
    readonly required?: boolean;
    readonly valid?: FormItemRule[]
}

// 基础填空题
interface TextQues extends BaseQues {
    readonly quesType: "text";
    readonly placeholder?: string;
    readonly readonly?: boolean;
    readonly showPassword?: boolean;
}

// 基础单选题
interface RadioQues extends BaseQues {
    readonly quesType: "radio";
    readonly choices: string[] | number[]
}

// 基础多选题
interface CheckboxQues extends BaseQues {
    readonly quesType: "checkbox";
    readonly choices: string[] | number[]
}

// 选择单选题
interface SwitchQues extends BaseQues {
    readonly quesType: "switch";
    readonly choices: string[]
}

// 单独描述题
interface DescQues extends BaseQues {
    readonly quesType: "desc";
    readonly desc: string
}

// 日期选择题
interface DateQues extends BaseQues {
    readonly quesType: "date";
}

type Ques = TextQues | RadioQues | CheckboxQues | SwitchQues | DescQues | DateQues;
const quesAnswerType = {
    text: "",
    radio: "",
    checkbox: [],
    switch: "",
    desc: "",
    date: ""
}
export { quesAnswerType };
export type { Ques };
