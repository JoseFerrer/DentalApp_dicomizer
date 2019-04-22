
const initialState = {
    mwl: 0,
    aetitle: "",
    patselected: false,
    technician: ""
};

const getworklist = ( state = initialState, action ) => {
    switch (action.type) {
        case "EN_MWL": {
            return {
                ...state,
                mwl: 1,
                patselected: false
            }
        }
        case "GOTO_TABLE": {
            return {
                ...state,
                mwl: 1,
                patselected: false
            }
        }
        case "GOTOMWL": {
            return {
                ...state,
                patselected: false
            }
        }
        case "AETITLE": {
            return {
                ...state,
                aetitle: action.payload
            }
        }
        case "PATSELECTED": {
            return {
                ...state,
                patselected: true
            }
        }
        case "TECHNICIAN": {
            return {
                ...state,
                technician: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default getworklist;