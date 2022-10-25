import DOMMatrix from './matrixBase';

class Matrix {
  matrix;
  otherProps;
  constructor({ matrix, otherProps }: { matrix?: any; otherProps?: any }) {
    if (!(matrix instanceof DOMMatrix)) {
      this.matrix = new DOMMatrix();
    } else {
      this.matrix = matrix;
    }
    this.otherProps = otherProps;
  }
  mutiVertex({ x, y }) {
    let { a, b, c, d, e, f } = this.matrix;
    return {
      x: a * x + c * y + e,
      y: b * x + d * y + f,
    };
  }
  mutiVertexReturnArray([x, y]) {
    const result = this.mutiVertex({ x, y });
    const decimal = 10;
    return [Math.round(result.x), Math.round(result.y)];
  }
  toArray() {
    let { a, b, c, d, e, f } = this.matrix;
    return [a, b, c, d, e, f];
  }
  getMatrix() {
    return this.matrix;
  }
  invertMatrix() {
    const { matrix, otherProps } = this;
    return new Matrix({
      matrix: matrix.inverse(),
      otherProps,
    });
  }
}

export default Matrix;
