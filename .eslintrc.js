module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'prettier'],
  rules: {
    'no-unused-vars': ['off'], // 사용하지 않는 변수가 있을때 빌드에러가 나던 규칙 해제
    'no-console': ['off'], // 콘솔을 쓰면 에러가 나던 규칙 해제
    'react/function-component-definition': [
      2,
      { namedcomponents: 'arrow-function' },
    ],
    'react-hooks/exhaustive-deps': ['off'], // hooks의 의존성배열이 충분하지 않을때 강제로 의존성을 추가하는 규칙을 완화
    'react/jsx-props-no-spreading': [1, { custom: 'ignore' }], // props spreading을 허용하지 않는 규칙 해제
    'react/prop-types': 0, // prop-types를 선언해주어야하는 규칙 해제
    'no-param-reassign': 0, // 파라미터 변경을 허용하지 않는 규칙 해제
    'no-alert': 0, // alert 제한 규칙 해제
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/mocks/*', '**/*.test.js', '**/*.spec.js'] },
    ], // mock server devdependency 사용 제한 규칙 해제
    'prettier/prettier': ['error', { endOfLine: 'auto' }], //  End Line Sequnce 규칙 해체
    'arrow-body-style': ['off'], // arrow function 사용 시 return 키워드 및 중괄호를 사용하지 말고 바로 값을 반환하도록 선언하는 규칙 해제
    'prefer-arrow-callback': ['off'], // 결과를 변경하지 않고 화살표 함수로 대체할 수 있는 항목에 대해 오류가 발생하는 규칙 해제
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // 확장자가 js인 파일에서 jsx 허용되지 않는 규칙 해제
    'react/button-has-type': 'off', // 버튼 타입 지정 에러 해제
    'jsx-a11y/media-has-caption': [
      2,
      {
        audio: ['Audio'],
        video: ['Video'],
        track: ['Track'],
      },
    ], // media caption 규칙 해제
    'no-useless-escape': 0, // 유효성 검사 시 특수문자 에러로 인식하는 규칙 해제
    'no-shadow': 0, // 상위에 선언된 변수 사용하지 못하는 규칙 해제
    'react/jsx-no-bind': ['off'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  }, // 프로젝트에서 절대 경로를 설정했을 때 eslint도 맞춰 설정
};
