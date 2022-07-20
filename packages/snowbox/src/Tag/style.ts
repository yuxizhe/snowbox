import { boxTypes } from '../Utils/props';

interface styleType {
  l: {
    fontStyle: boxTypes;
    boxStyle: boxTypes;
  };
  s: {
    fontStyle: boxTypes;
    boxStyle: boxTypes;
  };
}

const Styles: styleType = {
  l: {
    fontStyle: { f: 12, fw: '400' },
    boxStyle: {
      br: 2,
      px: 6,
      py: 2,
    },
  },
  s: {
    fontStyle: { f: 9, fw: '500' },
    boxStyle: {
      br: 2,
      px: 2,
      py: 1.5,
    },
  },
};

export default Styles;

export { Styles };
