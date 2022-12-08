import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    SET_SONG_PLAYING: "SET_SONG_PLAYING",
    PAUSE_SONG: "PAUSE_SONG",
    SET_PLAYER: "SET_PLAYER",
    PLAY_SONG: "PLAY_SONG",
    LOAD_PUBLISHED_ID_NAME_PAIRS: "LOAD_PUBLISHED_ID_NAME_PAIRS",
    SET_ALL_LISTS_VIEW: "SET_ALL_LISTS_VIEW",
    SET_FILTER_TEXT: "SET_FILTER_TEXT",
    SET_USER_LISTS_VIEW: "SET_USER_LISTS_VIEW"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG",
    ERROR : "ERROR"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        songPlaying: 0,
        player: null,
        playerPaused: false,
        publishedIdNamePairs: [],
        allListsView: false,
        userListsView: false,
        filterText: ""
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);
    console.log("song paused: " + store.playerPaused)
    console.log( store.player)

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: false,
                    userListsView: false,
                    filterText: store.filterText
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: store.allListsView,
                    userListsView: store.userListsView,
                    filterText: store.filterText
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: false,
                    userListsView: false,
                    filterText: store.filterText
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: false,
                    userListsView: false,
                    filterText: store.filterText
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: false,
                    userListsView: false,
                    filterText: store.filterText
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: store.allListsView,
                    userListsView: store.userListsView,
                    filterText: store.filterText
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: false,
                    userListsView: false,
                    filterText: store.filterText
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: false,
                    userListsView: false,
                    filterText: store.filterText
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: false,
                    userListsView: false,
                    filterText: store.filterText
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: 0,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: false,
                    userListsView: false,
                    filterText: store.filterText
                });
            }
            case GlobalStoreActionType.SET_SONG_PLAYING: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: payload,
                    player: null,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: store.allListsView,
                    userListsView: store.userListsView,
                    filterText: store.filterText
                });
            }

            case GlobalStoreActionType.PAUSE_SONG: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: store.songPlaying,
                    player: store.player,
                    playerPaused: true,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: store.allListsView,
                    userListsView: store.userListsView,
                    filterText: store.filterText
                });
            }

            case GlobalStoreActionType.SET_PLAYER: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: store.songPlaying,
                    player: payload,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: store.allListsView,
                    userListsView: store.userListsView,
                    filterText: store.filterText
                });
            }

            case GlobalStoreActionType.PLAY_SONG: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: store.songPlaying,
                    player: store.player,
                    playerPaused: false,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: store.allListsView,
                    userListsView: store.userListsView,
                    filterText: store.filterText
                });
            }

            case GlobalStoreActionType.LOAD_PUBLISHED_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: store.songPlaying,
                    player: store.player,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: payload,
                    allListsView: store.allListsView,
                    userListsView: store.userListsView,
                    filterText: store.filterText
                })
            }

            case GlobalStoreActionType.SET_ALL_LISTS_VIEW: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: store.songPlaying,
                    player: store.player,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: payload,
                    allListsView: true,
                    userListsView: false,
                    filterText: ""
                })
            }

            case GlobalStoreActionType.SET_FILTER_TEXT:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: store.songPlaying,
                    player: store.player,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: store.allListsView,
                    userListsView: store.userListsView,
                    filterText: payload
                })
            }

            case GlobalStoreActionType.SET_USER_LISTS_VIEW:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songPlaying: store.songPlaying,
                    player: store.player,
                    playerPaused: store.playerPaused,
                    publishedIdNamePairs: store.publishedIdNamePairs,
                    allListsView: false,
                    userListsView: true,
                    filterText: ""
                })
            }

            default:
                return store;
        }
    }

    store.setFilterText = function(text){
        if(store.allListsView){
            async function loadPublishedIdNamePairs(){
                const response = await api.getPublishedPlaylistPairs();
                if(response.data.success){
                    let pairsArray = response.data.idNamePairs;
                    console.log("-----------PUBLISHED ID NAME PAIRS--------------")
                    console.log(pairsArray)
                    console.log("--------------------------")

                    let filteredList=pairsArray.filter(obj => obj.name.toLowerCase().includes(text.toLowerCase()));
                    storeReducer({
                        type:GlobalStoreActionType.LOAD_PUBLISHED_ID_NAME_PAIRS,
                        payload: filteredList
                    })
                }
            }
            loadPublishedIdNamePairs()
        }
        else if(store.userListsView){
            async function loadPublishedIdNamePairs(){
                const response = await api.getPublishedPlaylistPairs();
                if(response.data.success){
                    let pairsArray = response.data.idNamePairs;
                    console.log("-----------PUBLISHED ID NAME PAIRS--------------")
                    console.log(pairsArray)
                    console.log("--------------------------")

                    let filteredList=pairsArray.filter(obj => obj.createdBy.toLowerCase().includes(text.toLowerCase()));
                    storeReducer({
                        type:GlobalStoreActionType.LOAD_PUBLISHED_ID_NAME_PAIRS,
                        payload: filteredList
                    })
                }
            }
            loadPublishedIdNamePairs()
        }
        else{
            async function asyncLoadIdNamePairs() {
                const response = await api.getPlaylistPairs();
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    console.log(pairsArray);
                    let filteredList=pairsArray.filter(obj => obj.name.toLowerCase().includes(text.toLowerCase()));
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: filteredList
                    });
                }
                else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            asyncLoadIdNamePairs();
        }
        
    }

    store.setAllListsView = function (){ //Sets the view to all lists, and loads the idNamePairs of only published playlists.
        //Since published playlists cant be edited, this state should not be able to be exited from unless we return to home.
        async function loadPublishedIdNamePairs(){
            const response = await api.getPublishedPlaylistPairs();
            if(response.data.success){
                let pairsArray = response.data.idNamePairs;
                console.log("-----------PUBLISHED ID NAME PAIRS--------------")
                console.log(pairsArray)
                console.log("--------------------------")
                storeReducer({
                    type:GlobalStoreActionType.SET_ALL_LISTS_VIEW,
                    payload: pairsArray
                })
                // storeReducer({
                //     type: GlobalStoreActionType.SET_ALL_LISTS_VIEW,
                //     payload: null
                // })
            }
        }
        loadPublishedIdNamePairs()

    }

    store.setUserListsView = function (){
        async function loadPublishedIdNamePairs(){
            const response = await api.getPublishedPlaylistPairs();
            if(response.data.success){
                let pairsArray = response.data.idNamePairs;
                console.log("-----------PUBLISHED ID NAME PAIRS (FOR USER LISTS)--------------")
                console.log(pairsArray)
                console.log("--------------------------")
                storeReducer({
                    type:GlobalStoreActionType.SET_USER_LISTS_VIEW,
                    payload: pairsArray
                })
            }
        }
        loadPublishedIdNamePairs()
    }

    store.setMyListsView = function(){
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                console.log(pairsArray);
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.tryAcessingOtherAccountPlaylist = function(){
        let id = "635f203d2e072037af2e6284";
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: playlist
                });
            }
        }
        asyncSetCurrentList(id);
        history.push("/playlist/635f203d2e072037af2e6284");
    }

    store.incSong = function(){
        if(store.currentList && store.currentList.songs.length){
            if(store.songPlaying < store.currentList.songs.length-1){
                let nextSong = store.songPlaying+1 % store.currentList.songs.length
                console.log("Next Song: " + nextSong);
                // nextSong = nextSong%store.currentList.songs.length
                storeReducer({
                    type: GlobalStoreActionType.SET_SONG_PLAYING,
                    payload: nextSong
                })
            }
            // let nextSong = store.songPlaying+1 % store.currentList.songs.length
            // storeReducer({
            //     type: GlobalStoreActionType.SET_SONG_PLAYING,
            //     payload: nextSong
            // })
        }   
    }

    store.decSong = function(){
        if(store.currentList && store.currentList.songs.length){
            if(store.songPlaying > 0){
                storeReducer({
                    type: GlobalStoreActionType.SET_SONG_PLAYING,
                    payload: store.songPlaying-1
                })
            }
        } 
    }

    store.setPlayer = function(player){
        storeReducer({
            type: GlobalStoreActionType.SET_PLAYER,
            payload: player
        })
    }

    store.unsetPlayer = function(player){
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList
        })
    }

    store.pauseSong = function(){
        storeReducer({
            type: GlobalStoreActionType.PAUSE_SONG,
            payload: null
        })
    }

    store.playSong = function(){
        storeReducer({
            type:GlobalStoreActionType.PLAY_SONG,
            payload: null
        })
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                                // store.setCurrentList(id);
                            }
                        }
                        getListPairs(playlist);

                    }
                }
                updateList(playlist);
                store.loadIdNamePairs();
            }
        }
        asyncChangeListName(id);
    }

    store.commentOnList = function(commentBody){
        let userName = auth.user.userName;
        let body = commentBody;
        let id = store.currentList._id
        async function asyncCommentOnList(id,body,userName){
            const response = await api.commentOnPlaylist(id,body,userName);
            if(response.data.success){
                store.setCurrentList(id)
            }
        }
        asyncCommentOnList(id,body,userName);
        // store.setCurrentList(store.currentList._id)
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        console.log("logged in email: " + auth.user.email)
        console.log("logged in username: " + auth.user.userName)
        const response = await api.createPlaylist(newListName, [], auth.user.email, auth.user.userName);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );
            store.loadIdNamePairs();

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // history.push("/playlist/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.duplicateList =  function (list) {
        async function asyncDuplicateList(list){
            let oldListName = list.name;
            const response = await api.getPlaylistPairs();
            if(response.data.success){
                let idNamePairs=response.data.idNamePairs;
                for(let i=0; i<idNamePairs.length; i++){
                    if(idNamePairs[i].name === oldListName){
                        oldListName+="(1)";
                    }
                }
                list.name = oldListName;
                async function asyncCreateDuplicatedList(oldListName, list){
                    const response2 = await api.createPlaylist(oldListName, list.songs, auth.user.email, auth.user.userName);
                    if(response2.status === 201){
                        console.log("successfully cloned a playlist!")
                        store.loadIdNamePairs();
                    }
                }
                asyncCreateDuplicatedList(oldListName, list);
            }
        }
        asyncDuplicateList(list);
    }

    store.publishPlaylist = function(){
        async function asyncPublishPlaylist(){
            const response = await api.publishPlaylistById(store.currentList._id);
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
                store.loadIdNamePairs();
            }
        }
        asyncPublishPlaylist();
    }

    store.loadPublishedIdNamePairs = function() {
        async function loadPublishedIdNamePairs(){
            const response = await api.getPublishedPlaylistPairs();
            if(response.data.success){
                let pairsArray = response.data.idNamePairs;
                console.log("-------------------------")
                console.log(pairsArray)
                console.log("--------------------------")
                storeReducer({
                    type:GlobalStoreActionType.LOAD_PUBLISHED_ID_NAME_PAIRS,
                    payload: pairsArray
                })
            }
        }
        loadPublishedIdNamePairs()
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                console.log(pairsArray);
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
        // store.loadPublishedIdNamePairs();
        
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            store.loadIdNamePairs();
            if (response.data.success) {
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
        
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        auth.errorMessage = null;
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }
    store.isErrorModalOpen = () => {
        return store.currentModal === CurrentModal.ERROR;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            if(!store.allListsView && !store.userListsView){
                let response = await api.getPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;

                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: playlist
                        });
                        // history.push("/playlist/" + playlist._id);

                        async function asyncIncrementListenCount(id){
                            let response = await api.addPlaylistListen(id);
                            if(response.data.success){
                                storeReducer({
                                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                                    payload: playlist
                                });
                            }
                        }
                        asyncIncrementListenCount(id)

                    }
                }
            }
            else{
                let response = await api.getPublishedPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: playlist
                        });
                        // history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
        tps.clearAllTransactions();
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.getCurrentListComments = function(){
        if(store.currentList){
            return store.currentList.comments;
        }
    }

    function KeyPress(event) {
        if (!store.modalOpen && event.ctrlKey){
            if(event.key === 'z'){
                store.undo();
            } 
            if(event.key === 'y'){
                store.redo();
            }
        }
    }
  
    document.onkeydown = (event) => KeyPress(event);

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };