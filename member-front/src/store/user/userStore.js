export default {
    state: {
        user:{

        },
        auth: true,
    },
    mutations: {
        setUser(state, user){
            state.user = user
        },
        clearUser(state){
            state.user = {

            }
        }
    },
    getter: {
        getUser(state){
            return state.user;
        }
    }
}
