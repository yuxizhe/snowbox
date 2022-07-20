import { boxTypes } from '../Utils/props';

interface styleType {
  single: boxTypes;
  multiple: boxTypes;
}

const Styles: styleType = {
  single: {
    h: 12,
    br: 6,
    f: 9,
    px: 3.5,
  },
  multiple: {
    h: 12,
    f: 9,
    br: 6,
    px: 4,
  },
};

export default Styles;

export { Styles };
