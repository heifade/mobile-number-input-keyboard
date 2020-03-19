import React from "react";
import { Keyboard } from "../keyboard";

interface IProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

interface IState {
  value: number;
  keyboardShow: boolean;
}

export class NumberInput extends React.PureComponent<IProps, IState> {
  state: IState = {
    value: this.props.value,
    keyboardShow: false
  };
  onChange = (value: number) => {
    const { onChange } = this.props;
    this.setState({
      keyboardShow: false
    });
    if (onChange) {
      onChange(value);
    }
  };

  onOpenKeyboard = (show: boolean) => {
    this.setState({
      keyboardShow: show
    });
  };

  render() {
    const { disabled, value } = this.props;
    const { keyboardShow } = this.state;
    return (
      <div>
        <div onClick={() => !disabled && this.onOpenKeyboard(true)}>{String(value)}</div>
        {keyboardShow && <Keyboard value={value} onOK={this.onChange} onClose={() => this.onOpenKeyboard(false)} precision={2} />}
      </div>
    );
  }
}
