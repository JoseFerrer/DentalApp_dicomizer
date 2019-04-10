import React from "react";
import { Previous, Next, Send } from "../buttons";

class Step extends React.Component {

  render() {
    const {
      isActive,
      displayPrevious,
      displayNext,
      displaySubmit,
      component,
      children,
    } = this.props;

    if(isActive === false) return null;

    return (
      <React.Fragment>
        {component ? React.createElement(component) : children}
        <Previous
          isActive={displayPrevious}
          goToPreviousStep={() => this.props.goToPreviousStep()}
        />
        <Next
          isActive={displayNext}
          goToNextStep={() => this.props.goToNextStep()}
        />
        <Send isActive={displaySubmit} />
      </React.Fragment>
    );
  }
}

export { Step };