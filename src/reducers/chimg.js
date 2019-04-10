
const initialState = { 
    images: [] 
};

const chimg = (state = initialState, action) => {
    switch (action.type) {
        case "IMAGES": {
            return {
                images: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default chimg;