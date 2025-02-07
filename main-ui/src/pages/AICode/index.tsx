import { useEffect, useState } from 'react';
import MonacoEditor, { monaco, EditorDidMount } from 'react-monaco-editor';
import datas from './testData';
import style from './index.module.less';

const RenderMenuList = (prpos: {
  obj: any;
  selectFile: (opt: { value: string; language: string }) => void;
}) => {
  const { obj, selectFile } = prpos;
  return Object.entries(obj).map(([key, value], index) => {
    // 如果value是字符串
    if (typeof value === 'string') {
      // 获取后缀名出
      const suffix = value.split('.').pop();
      return (
        <li
          key={index}
          onClick={() => {
            selectFile({
              value,
              language: suffix === 'js' ? 'javascript' : suffix,
            });
          }}
        >
          <strong>{key}</strong>
        </li>
      );
    }
    return (
      <>
        {key && <li>{key}</li>}
        {key ? (
          <ul>
            <RenderMenuList obj={value} selectFile={selectFile} />
          </ul>
        ) : (
          <RenderMenuList obj={value} selectFile={selectFile} />
        )}
      </>
    );
  });
};

const Index = () => {
  const [value, setValue] = useState({
    value: '',
    language: 'javascript',
  });
  const editorDidMount: EditorDidMount = (editor) => {};

  return (
    <div className={style.menu_box}>
      <ul>
        <RenderMenuList
          obj={datas.codes}
          selectFile={(e) => {
            console.log(e);
            setValue({ ...value, ...e });
          }}
        />
      </ul>
      <div className={style.code_box} id="code">
        <MonacoEditor
          theme={'vs-dark'}
          {...value}
          editorDidMount={editorDidMount}
        />
      </div>
    </div>
  );
};
export default Index;
