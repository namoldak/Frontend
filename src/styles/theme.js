const pixelToRem = (size) => `${size / 16}rem`;

const fontSizes = {
  title: pixelToRem(42), // 임시 폰트 사이즈 px 뜻함
  subTitle: pixelToRem(30),
  paragraph: pixelToRem(18),
};

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  darkGray: '#333333', // 진한 회색
  gray: '#666666', // 기본 회색
  lightGray: '#939393', // 연한 회색
  lightBeige: '#F5ECD9', // 베이지색
  beige: '#F5C86F', // 연한 황갈색
  yellowBrown: '#E7AA47', // 황갈색
  lightBrown: '6E3D12', // 밝은 갈색
  brown: '#643B11', // 갈색
  text: '#321D07', // 짙은 갈색
};

const common = {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  flexBetween: `
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  absoluteCenter: `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

const theme = {
  fontSizes,
  colors,
  common,
};

export default theme;

/* theme 적용 예) 
1. theme 파일을 import 하지 않는 경우

const Test = styled.div`
${({ theme }) => theme.common.flexCenter}
background: ${({ theme }) => theme.colors.primary1};
`

2. theme 파일을 import 하는 경우
import theme from '../../../styles/theme';

const Test = styled.div`
  ${theme.common.borderLine};
  background-color: ${theme.colors.bgColor2};
`
*/
