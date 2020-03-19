import React from "react";
import ReactDOM from "react-dom";
import "./styles.less";

interface IProps {
  value: number;
  precision?: number;
  onClose?: () => void;
  onOK?: (value: number) => void;
}

interface IState {
  value: string;
}

export class Keyboard extends React.PureComponent<IProps, IState> {
  state: IState = {
    value: String(this.props.value)
  };
  componentDidMount() {
    document.addEventListener("click", this.onOutClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.onOutClick);
  }

  onNum = (v: string) => {
    const { precision } = this.props;
    let value = this.state.value;
    if (value === "0") {
      if (v === ".") {
        value += ".";
      } else {
        value = v;
      }
    } else {
      if (v !== "." || value.indexOf(".") < 0) {
        if (!precision || (value.split(".")[1] || "").length < precision) {
          value += v;
        }
      }
    }

    this.setState({
      value
    });
  };
  onBack = () => {
    let { value } = this.state;
    if (value.length > 1) {
      value = value.substr(0, value.length - 1);
    } else if (value !== "0") {
      value = "0";
    }
    this.setState({
      value
    });
  };

  onOutClick = (ev: MouseEvent) => {
    let { target } = ev as any;
    while (target && target.className !== "mni-keyboard" && target.parentNode) {
      target = target.parentNode;
    }

    console.log("target", target);

    if (!target || target === document) {
      this.onClose();
    }
  };

  onClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  onOK = () => {
    const { onOK } = this.props;
    if (onOK) {
      onOK(Number(this.state.value));
    }
  };

  componentWillReceiveProps(newProps: IProps) {
    if (newProps.value !== this.props.value) {
      this.setState({
        value: String(newProps.value)
      });
    }
  }

  render() {
    const { value } = this.state;

    return ReactDOM.createPortal(
      <div className="mni-keyboard">
        <div className="mni-valueReview">{value}</div>
        <div className="mni-tdiv">
          <table cellSpacing="0" cellPadding="0">
            <tbody>
              <tr>
                <td className="mni-paynum" onClick={() => this.onNum("1")}>
                  1
                </td>
                <td className="mni-paynum" onClick={() => this.onNum("2")}>
                  2
                </td>
                <td className="mni-paynum" onClick={() => this.onNum("3")}>
                  3
                </td>
                <td onClick={() => this.onBack()}>
                  <div className="mni-keybordReturn" />
                </td>
              </tr>
              <tr>
                <td className="mni-paynum" onClick={() => this.onNum("4")}>
                  4
                </td>
                <td className="mni-paynum" onClick={() => this.onNum("5")}>
                  5
                </td>
                <td className="mni-paynum" onClick={() => this.onNum("6")}>
                  6
                </td>
                <td rowSpan={3} className="mni-pay" onClick={this.onOK}>
                  确定
                </td>
              </tr>
              <tr>
                <td className="mni-paynum" onClick={() => this.onNum("7")}>
                  7
                </td>
                <td className="mni-paynum" onClick={() => this.onNum("8")}>
                  8
                </td>
                <td className="mni-paynum" onClick={() => this.onNum("9")}>
                  9
                </td>
              </tr>
              <tr>
                <td onClick={this.onClose}>
                  <div className="mni-keybordStop" />
                </td>
                <td className="mni-paynum" onClick={() => this.onNum("0")}>
                  0
                </td>
                <td className="mni-paynum" onClick={() => this.onNum(".")}>
                  .
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>,
      document.body
    );
  }
}
