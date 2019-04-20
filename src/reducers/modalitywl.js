
const initialState = {
    mwl: false,
    aetitle: "",
    patselected: false,
    technician: ""
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