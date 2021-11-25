import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    VIEW_HOME_LIST: "VIEW_HOME_LIST",
    VIEW_ALL_LIST: "VIEW_ALL_LIST",
    VIEW_USER_LIST: "VIEW_USER_LIST",
    VIEW_COMMUNITY_LIST: "VIEW_COMMUNITY_LIST",
    SORT_BY_NEWEST: "SORT_BY_NEWEST",
    SORT_BY_OLDEST: "SORT_BY_OLDEST",
    SORT_BY_LIKE: "SORT_BY_LIKE",
    SORT_BY_DISLIKE: "SORT_BY_DISLIKE",
    SORT_BY_VIEW: "SORT_BY_VIEW"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        viewhomelist: false,
        viewuserlist: false,
        viewalllist: false,
        viewcommunitylist: false,
        sortbynewest: false,
        sortbyoldest: false,
        sortbylike: false,
        sortbydislike: false,
        sortbyview: false
    });
    const history = useHistory();
    const [searchKey, setSearch] = useState("");
    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            case GlobalStoreActionType.CHANGE_ITEM_NAME:{
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomeList,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            case GlobalStoreActionType.VIEW_HOME_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: true,
                    viewuserlist: false,
                    viewalllist: false,
                    viewcommunitylist: false,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            case GlobalStoreActionType.VIEW_ALL_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: false,
                    viewuserlist: false,
                    viewalllist: true,
                    viewcommunitylist: false,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            case GlobalStoreActionType.VIEW_USER_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: false,
                    viewuserlist: true,
                    viewalllist: false,
                    viewcommunitylist: false,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            case GlobalStoreActionType.VIEW_COMMUNITY_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: false,
                    viewuserlist: false,
                    viewalllist: false,
                    viewcommunitylist: true,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            case GlobalStoreActionType.SORT_BY_LIKE: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewallList,
                    viewcommunitylist: store.viewcommunityList,
                    sortbynewest: false,
                    sortbyoldest: false,
                    sortbylike: true,
                    sortbydislike: false,
                    sortbyview: false
                });
            }
            case GlobalStoreActionType.SORT_BY_DISLIKE: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewallList,
                    viewcommunitylist: store.viewcommunityList,
                    sortbynewest: false,
                    sortbyoldest: false,
                    sortbylike: false,
                    sortbydislike: true,
                    sortbyview: false
                });
            }
            case GlobalStoreActionType.SORT_BY_NEWEST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewallList,
                    viewcommunitylist: store.viewcommunityList,
                    sortbynewest: true,
                    sortbyoldest: false,
                    sortbylike: false,
                    sortbydislike: false,
                    sortbyview: false
                });
            }
            case GlobalStoreActionType.SORT_BY_OLDEST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewallList,
                    viewcommunitylist: store.viewcommunityList,
                    sortbynewest: false,
                    sortbyoldest: true,
                    sortbylike: false,
                    sortbydislike: false,
                    sortbyview: false
                });
            }
            case GlobalStoreActionType.SORT_BY_VIEW: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewallList,
                    viewcommunitylist: store.viewcommunityList,
                    sortbynewest: false,
                    sortbyoldest: false,
                    sortbylike: false,
                    sortbydislike: false,
                    sortbyview: true
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    //add comment to list
    store.addComment = async function (id, comment) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if(auth.loggedIn){
                let author = auth.user.lastName + " " + auth.user.firstName;
                let commenttoadd = [author,comment];
                top5List.comments.unshift(commenttoadd);
                async function updateList(top5List) {
                    response = await api.updateTop5ListById(top5List._id, top5List);
                    if (response.data.success) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let allpairsArray = response.data.idNamePairs;
                                let pairsArray = allpairsArray.filter(filterByownerEmail);
                                pairsArray = store.sorts(pairsArray);
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        top5List: top5List
                                    }
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                }
                updateList(top5List);
            }
        }
    }
    //edit list
    store.editList = function(payload,id){
        async function asyncEditList(id) {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                if(auth.user.email === top5List.ownerEmail){
                    top5List.items = payload.items;
                    top5List.name = payload.name;
                    top5List.publish = payload.publish;
                    top5List.publishdate = payload.publishdate;
                    async function updateList(top5List) {
                        response = await api.updateTop5ListById(top5List._id, top5List);
                        if (response.data.success) {
                            async function getListPairs(top5List) {
                                response = await api.getTop5ListPairs();
                                if (response.data.success) {
                                    let allpairsArray = response.data.idNamePairs;
                                    let pairsArray = allpairsArray.filter(filterByownerEmail);
                                    pairsArray = store.sorts(pairsArray);
                                    storeReducer({
                                        type: GlobalStoreActionType.CHANGE_ITEM_NAME,
                                        payload: {
                                            idNamePairs: pairsArray,
                                            top5List: top5List
                                        }
                                    });
                                }
                            }
                            getListPairs(top5List);
                        }
                    }
                    updateList(top5List);
                }
            }
        }
        asyncEditList(id);
    }
    //Increase like count
    store.likeList = function(id){
        async function asyncLikeList(id) {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                top5List.like = top5List.like + 1;
                async function updateList(top5List) {
                    response = await api.updateTop5ListById(top5List._id, top5List);
                    if (response.data.success) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let allpairsArray = response.data.idNamePairs;
                                let pairsArray = allpairsArray.filter(filterByownerEmail);
                                pairsArray = store.sorts(pairsArray);
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        top5List: top5List
                                    }
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                }
                updateList(top5List);
                
            }
        }
        asyncLikeList(id);
    }
    //Increase dislike count
    store.disLikeList = function(id){
        async function asyncDisLikeList(id) {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                top5List.dislike = top5List.dislike + 1;
                async function updateList(top5List) {
                    response = await api.updateTop5ListById(top5List._id, top5List);
                    if (response.data.success) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let allpairsArray = response.data.idNamePairs;
                                let pairsArray = allpairsArray.filter(filterByownerEmail);
                                pairsArray = store.sorts(pairsArray);
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        top5List: top5List
                                    }
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                }
                updateList(top5List);
                
            }
        }
        asyncDisLikeList(id);
    }
    //Increase view count
    store.increaseview = function (id){
        async function asyncIncreaseView(id) {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                if(top5List.viewing === false){
                    top5List.view = top5List.view + 1;
                    top5List.viewing = !(top5List.viewing);
                    async function updateList(top5List) {
                        response = await api.updateTop5ListById(top5List._id, top5List);
                        if (response.data.success) {
                            async function getListPairs(top5List) {
                                response = await api.getTop5ListPairs();
                                if (response.data.success) {
                                    let allpairsArray = response.data.idNamePairs;
                                    let pairsArray = allpairsArray.filter(filterByownerEmail);
                                    pairsArray = store.sorts(pairsArray);
                                    storeReducer({
                                        type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                        payload: {
                                            idNamePairs: pairsArray,
                                            top5List: top5List
                                        }
                                    });
                                }
                            }
                            getListPairs(top5List);
                        }
                    }
                    updateList(top5List);
                }
                else{
                    top5List.viewing = !(top5List.viewing);
                    async function updateList(top5List) {
                        response = await api.updateTop5ListById(top5List._id, top5List);
                        if (response.data.success) {
                            async function getListPairs(top5List) {
                                response = await api.getTop5ListPairs();
                                if (response.data.success) {
                                    let allpairsArray = response.data.idNamePairs;
                                    let pairsArray = allpairsArray.filter(filterByownerEmail);
                                    pairsArray = store.sorts(pairsArray);
                                    storeReducer({
                                        type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                        payload: {
                                            idNamePairs: pairsArray,
                                            top5List: top5List
                                        }
                                    });
                                }
                            }
                            getListPairs(top5List);
                        }
                    }
                    updateList(top5List);
                }
            }
        }
        asyncIncreaseView(id);
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function (payload) {
        payload.ownerEmail = auth.user.email;
        payload.Author = auth.user.lastName + " " + auth.user.firstName;
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            store.viewhomeList();
            history.push("/");
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }
    function filterByownerEmail(list){
        if(auth.user != null){
            if(list.ownerEmail === auth.user.email){
                return true;
            }
        }
        else{//view as guest, return all list then filter to get community list
            return true;
        }
        return false;
    }
    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let allpairsArray = response.data.idNamePairs;
            let pairsArray = allpairsArray.filter(filterByownerEmail);
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    useEffect(() => {
        if(store.viewhomelist){
            store.viewhomeList();
        }
        else if (store.viewalllist){
            store.viewallList();
        }
        else if (store.viewuserList){
            store.viewuserList();
        }
        else if (store.viewcommunitylist){
            store.viewcommunityList();
        }
    },[searchKey]);

    store.searchKey = function (key) {
        //how to search immediately
        setSearch(key);
    }

    function filterBySearchKey(list){
        if(searchKey === ""){
            return true;
        }
        else if(list.name.includes(searchKey)){
            return true;
        }
        return false;
    }
    //view home user list
    store.viewhomeList = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let allpairsArray = response.data.idNamePairs;
            let pairsArray = allpairsArray.filter(filterByownerEmail);
            let finalArray = pairsArray.filter(filterBySearchKey);
            storeReducer({
                type: GlobalStoreActionType.VIEW_HOME_LIST,
                payload: finalArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    //view all the list
    store.viewallList = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let allpairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.VIEW_HOME_LIST,
                payload: allpairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    function filterBySearchKeyUser(list){
        if(searchKey === ""){
            return false;
        }
        else if(list.Author.includes(searchKey)){
            return true;
        }
        return false;
    }
    //view user list
    store.viewuserList = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let allpairsArray = response.data.idNamePairs;
            let finalArray = allpairsArray.filter(filterBySearchKeyUser);
            storeReducer({
                type: GlobalStoreActionType.VIEW_HOME_LIST,
                payload: finalArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    function filterPublish(list){
        if(list.publish){
            return true;
        }
        return false;
    }
    // view community list
    store.viewcommunityList = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let allpairsArray = response.data.idNamePairs;
            let pairsArray = allpairsArray.filter(filterPublish);
            let finalArray = pairsArray.filter(filterBySearchKey);
            storeReducer({
                type: GlobalStoreActionType.VIEW_HOME_LIST,
                payload: finalArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    store.sorts = function(pairsArray){
        if(store.sortbynewest){
            return pairsArray.sort(function(a,b){
                let date1 = new Date(a.createdate).getMilliseconds();
                let date2 = new Date(b.createdate).getMilliseconds();
                return date2 - date1;
            });
        }
        else if(store.sortbyoldest){
            return pairsArray.sort(function(a,b){
                let date1 = new Date(a.createdate).getMilliseconds();
                let date2 = new Date(b.createdate).getMilliseconds();
                return date1 - date2;
            });
        }
        else if(store.sortbylike){
            return pairsArray.sort(function(a,b){return b.like - a.like});
        }
        else if(store.sortbydislike){
            return pairsArray.sort(function(a,b){return b.dislike-a.dislike})
        }
        else if(store.sortbyview){
            return pairsArray.sort(function(a,b){return b.view-a.view})
        }
        return pairsArray
    }
    //sort by oldest date
    store.sortByNewest= function(){
        let pairs = store.idNamePairs.sort(function(a,b)
            {
                let date1 = new Date(a.createdate).getMilliseconds();
                let date2 = new Date(b.createdate).getMilliseconds();
                return date2 - date1;
            }
        );
        storeReducer({
            type: GlobalStoreActionType.SORT_BY_NEWEST,
            payload: pairs
        });
    }
    //sort by oldest date
    store.sortByOldest= function(){
        let pairs = store.idNamePairs.sort(function(a,b)
            {
                let date1 = new Date(a.createdate).getMilliseconds();
                let date2 = new Date(b.createdate).getMilliseconds();
                return date1 - date2;
            }
        );
        storeReducer({
            type: GlobalStoreActionType.SORT_BY_OLDEST,
            payload: pairs
        });
    }
    //sort by most views
    store.sortByViews = function(){
        let pairs = store.idNamePairs.sort(function(a,b){return b.view - a.view});
        storeReducer({
            type: GlobalStoreActionType.SORT_BY_LIKE,
            payload: pairs
        });
    }
    //sort by most likes
    store.sortByLikes = function(){
        let pairs = store.idNamePairs.sort(function(a,b){return b.like - a.like});
        storeReducer({
            type: GlobalStoreActionType.SORT_BY_LIKE,
            payload: pairs
        });
    }
    //sort by most dislikes
    store.sortByDislikes = function(){
        let pairs = store.idNamePairs.sort(function(a,b){return b.dislike-a.dislike})
        storeReducer({
            type: GlobalStoreActionType.SORT_BY_DISLIKE,
            payload: pairs
        });
    }
    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        if(auth.user.email === store.listMarkedForDeletion.ownerEmail){
            store.deleteList(store.listMarkedForDeletion);
        }
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            if(response.data.top5List.ownerEmail === auth.user.email){
                let top5List = response.data.top5List;
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: top5List
                    });
                    history.push("/top5list/" + top5List._id);
                }
            }
        }
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

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