
const initialState = {
    mwl: false,
    aetitle: "",
    patselected: false
};

const getworklist = ( state = initialState, action ) => {
    switch (action.type) {
        case "EN_MWL": {
            return {
                ...state,
                mwl: true
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
        default: {
            return state;
        }
    }
}

export default getworklist;