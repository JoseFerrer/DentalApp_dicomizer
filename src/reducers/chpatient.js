
const initialState = {
    choosen: []
};

const patientInfo = ( state = initialState, action ) => {
    switch (action.type) {
        case "PATIENT": {
            return {
                choosen: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default patientInfo;