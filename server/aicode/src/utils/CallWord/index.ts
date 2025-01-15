import prompt from './prompt';

// 分前后端，前端的提示词生成工具库
type Platform = 'Front' | 'Back';

// 代码语言
type CodeLanguage =
  | 'JavaScript'
  | 'TypeScript'
  | 'Python'
  | 'Java'
  | 'C++'
  | 'C#'
  | 'Go'
  | 'PHP'
  | 'Ruby';

// 使用框架
type Framework =
  | 'React'
  | 'Vue'
  | 'Angular'
  | 'Node'
  | 'Django'
  | 'Spring'
  | 'Flask'
  | 'Laravel'
  | 'Ruby on Rails';
interface CallWordOptions {
  msg: string;
  platform?: Platform;
  codeLanguage?: CodeLanguage;
  framework?: Framework;
}

/**
 * @description: 组装生成提示词工具库
 */
export const Callword = (opt: CallWordOptions) => {
  const { msg } = opt;
  return `
  ${msg}
  ${prompt()}
  `;
};
