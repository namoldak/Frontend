module.exports = {
    env: {
        "browser": true,
        "es2021": true
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
    overrides: [
    ],
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: ['react', 'import', 'prettier'],
    rules: {
        'no-unused-vars': ['off'], // 사용하지 않는 변수가 있을때 빌드에러가 나던 규칙 해제
        'no-console': ['off'], // 콘솔을 쓰면 에러가 나던 규칙 해제
        'react/function-component-definition': [
          2,
          { namedcomponents: 'arrow-function' },
        ],
        'react-hooks/exhaustive-deps': ['warn'], // hooks의 의존성배열이 충분하지 않을때 강제로 의존성을 추가하는 규칙을 완화
        'react/jsx-props-no-spreading': [1, { custom: 'ignore' }], // props spreading을 허용하지 않는 규칙 해제
        'react/prop-types': 0, // prop-types를 선언해주어야하는 규칙 해제
        'no-param-reassign': 0, // 파라미터 변경을 허용하지 않는 규칙 해제
        'no-alert': 0, // alert 제한 규칙 해제
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: ['**/mocks/*'] },
        ], // mock server devdependency 사용 제한 규칙 해제
      },
}
