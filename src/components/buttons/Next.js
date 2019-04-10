import React from "react";
import { Button } from "semantic-ui-react";

class Next extends React.Component {

  render() {
    const { isActive } = this.props;
    if (isActive === false) return null;

    return (
      <Button inverted color='teal' onClick={() => this.props.goToNextStep()} >
        Next
      </Button>
    );
  }
}

export { Next };
