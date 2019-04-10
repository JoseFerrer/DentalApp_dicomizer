import React from "react";
import { Button } from "semantic-ui-react";

class Previous extends React.Component {

  render() {
    const { isActive } = this.props;
    if (isActive === false) return null;

    return (
      <Button inverted color='blue' onClick={() => this.props.goToPreviousStep()}>
        Previous
      </Button>
    );
  }
}

export { Previous };
