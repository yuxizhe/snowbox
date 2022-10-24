import { useState, useEffect } from 'react';
import { getParameters } from 'codesandbox/lib/api/define';

const CSB_API_ENDPOINT = 'https://codesandbox.io/api/v1/sandboxes/define';

/**
 * 在 react 18 中需要新的 render 方式，这个函数用来处理不同的 jsx 模式。
 * @param  { 'react-dom' | 'react-dom/client'} clientRender
 * @returns code string
 */
const genReactRenderCode = (clientRender: 'react-dom' | 'react-dom/client', extraCode: string): string => {
  if (clientRender === 'react-dom') {
    return `
import React from 'react';
import ReactDOM from 'react-dom';
${extraCode}
import App from './App';
    
ReactDOM.render(
  <App />,
  document.getElementById('root'),
);`;
  }
  if (clientRender === 'react-dom/client') {
    return `
import React from 'react';
import { createRoot } from "react-dom/client";
${extraCode}
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);`;
  }
};

function getTextContent(raw: string) {
  const elm = document.createElement('span');

  elm.innerHTML = raw;
  const text = elm.textContent;
  elm.remove();

  return text;
}

/**
 * get serialized data that use to submit to codesandbox.io
 * @param opts  previewer props
 */
function getCSBData(opts: any) {
  const isTSX = Boolean(opts.sources._.tsx);
  const ext = isTSX ? '.tsx' : '.jsx';
  const files: Record<
    string,
    {
      content: string;
      isBinary: boolean;
    }
  > = {};
  const deps: Record<string, string> = {};
  const CSSDeps = Object.values(opts.dependencies).filter((dep) => dep.css);
  const appFileName = `src/App${ext}`;
  const entryFileName = `src/index${ext}`;

  // generate dependencies
  Object.entries(opts.dependencies).forEach(([dep, { version }]) => {
    deps[dep] = version;
  });

  // add react-dom dependency
  if (!deps['react-dom']) {
    deps['react-dom'] = deps.react || 'latest';
  }

  // append sandbox.config.json
  files['sandbox.config.json'] = {
    content: JSON.stringify(
      {
        template: 'create-react-app',
      },
      null,
      2,
    ),
    isBinary: false,
  };

  // append package.json
  files['package.json'] = {
    content: JSON.stringify(
      {
        name: opts.title,
        description: getTextContent(opts.description || 'snowbox 三端同构组件库'),
        main: entryFileName,
        dependencies: deps,
        // add TypeScript dependency if required, must in devDeps to avoid csb compile error
        devDependencies: isTSX ? { typescript: '^4' } : {},
      },
      null,
      2,
    ),
    isBinary: false,
  };

  // append index.html
  files['public/index.html'] = {
    content: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <style>
      @media only screen and (max-width: 700px) {
        html,
        body {
          /* 14/(375/100) */
          font-size: 3.73333333333vw;
        }
      }

      @media only screen and (min-width: 700px) {
        html,
        body {
          font-size: 20px;
        }
      }

      @font-face {
        font-family: 'DIN-Medium';
        src: url('https://assets.imedao.com/ugc/snowflake/font/DIN_Medium.ttf') format('truetype');
      }
      
      #root {
        display: flex;
        height: 100vh;
      }
    </style>
    <title>snowbox</title>
  </head>

  <body>
    <noscript> You need to enable JavaScript to run this app. </noscript>
    <div id="root"></div>
  </body>
</html>

  `,
    isBinary: false,
  };

  // append entry file
  files[entryFileName] = {
    content: genReactRenderCode(
      // react 18 需要使用新的 render 方式
      deps?.['react-dom']?.startsWith('18.') || deps.react === 'latest' ? 'react-dom/client' : 'react-dom',
      CSSDeps.map(({ css }) => `import '${css}';`).join('\n'),
    ),
    isBinary: false,
  };

  // append other imported local files
  Object.entries(opts.sources).forEach(([filename, { tsx, jsx, content }]) => {
    // handle primary content
    files[filename === '_' ? appFileName : 'src/' + filename] = {
      content: tsx || jsx || content,
      isBinary: false,
    };
  });

  return getParameters({ files });
}

/**
 * use CodeSandbox.io
 * @param opts  previewer opts
 * @note  return a open function for open demo on codesandbox.io
 */
export default (opts: any | null, api: string = CSB_API_ENDPOINT) => {
  const [handler, setHandler] = useState<(...args: any) => void | undefined>();

  useEffect(() => {
    if (opts) {
      const form = document.createElement('form');
      const input = document.createElement('input');
      const data = getCSBData(opts);

      form.method = 'POST';
      form.target = '_blank';
      form.style.display = 'none';
      form.action = api;
      form.appendChild(input);
      form.setAttribute('data-demo', opts.title || '');

      input.name = 'parameters';
      input.value = data;

      document.body.appendChild(form);

      setHandler(() => () => form.submit());

      return () => form.remove();
    }
  }, [opts]);

  return handler;
};
