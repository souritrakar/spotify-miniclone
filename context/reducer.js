export const initialState = {
    playlistId : "",
    playlist: {}
  };
  
  const reducer = (state, action) =>{
    switch(action.type){
        case "SET_PLAYLIST_ID":
            return {
                ...state,
                playlistId:action.playlistId
            }
        case "SET_PLAYLIST":
            return{
                ...state,
                playlist:action.playlist
            }
        default:
            return state
    }
    
  }




  export default reducer