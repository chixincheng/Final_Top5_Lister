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
        newListCounter: 0,
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
    const [searchKeyWord, setSearch] = useState("");
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
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
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
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
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
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
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
                    newListCounter: store.newListCounter + 1,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
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
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
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
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: payload,
                    viewhomelist: store.viewhomelist,
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
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
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
                    newListCounter: store.newListCounter,
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
                    newListCounter: store.newListCounter,
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
                    newListCounter: store.newListCounter,
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
                    newListCounter: store.newListCounter,
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
                    newListCounter: store.newListCounter,
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
                    newListCounter: store.newListCounter,
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
                    newListCounter: store.newListCounter,
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
                    newListCounter: store.newListCounter,
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
                    newListCounter: store.newListCounter,
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
                                let pairsArray = store.viewList(allpairsArray);
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
                                    let pairsArray = store.viewList(allpairsArray);
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
                                let pairsArray = store.viewList(allpairsArray);
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
                                let pairsArray = store.viewList(allpairsArray);
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
                                    let pairsArray = store.viewList(allpairsArray);
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
                                    let pairsArray = store.viewList(allpairsArray);
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

    // THIS FUNCTION CREATES A NEW COMMUNITY LIST
    store.createCommunityList = async function (payload) {
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.editCommunityList = function(payload,id){
        async function asynceditCommunityList(id) {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                top5List.updateDate = new Date();
                let score = 5;
                for(let i = 0; i < payload.items.length; i++){
                    let itemname = payload.items[i];
                    let added = false;
                    for(let j = 0; j < top5List.commentItems.length; j++){
                        if(top5List.commentItems[j][0] === itemname){
                            top5List.commentItems[j][1] = Number(top5List.commentItems[j][1]) + score;
                            added = true;
                        }
                    }
                    if(!added){
                        let communityitems = [itemname,score];
                        top5List.commentItems.unshift(communityitems)
                    }
                    score = score-1;
                } 
                async function updateList(top5List) {
                    response = await api.updateTop5ListById(top5List._id, top5List);
                    if (response.data.success) {
                        async function getListPairs(top5List) {
                            response = await api.getCommunityList();
                            if (response.data.success) {
                                let allpairsArray = response.data.idNamePairs;
                                let pairsArray = store.viewList(allpairsArray);
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
        asynceditCommunityList(id);
    }

    //Create or Edit existing community list
    store.createOrEditCommunityList = async function(payload){
        //check if such community already exist
        const response = await api.getCommunityList();
        if (response.data.success) {
            console.log("enters")
            let allpairsArray = response.data.idNamePairs;//all community list
            let exist = false;
            let id = 0;
            for(let i = 0; i < allpairsArray.length; i++){
                if(allpairsArray[i].name === payload.name){
                    exist = true;
                    id = allpairsArray[i]._id;//id of the existing community list
                }
            }
            if(exist){//update current community list
                store.editCommunityList(payload,id);
            }
            else{//create a new community list
                let payloadtemp = {
                    name : payload.name,
                    items: payload.items,
                    ownerEmail: "community",
                    Author: "community",
                    comments: [],
                    like: 0,
                    dislike: 0,
                    view: 0,
                    publish: true,
                    createdate: new Date(),
                    viewing: false,
                    publishdate: null,
                    commentItems: [],
                    isCommunityList: true,
                    updateDate: new Date()
                };
                let score = 5;
                for(let i = 0; i < payload.items.length; i++){
                    let communityitems = [payloadtemp.items[i],score];
                    payloadtemp.commentItems.unshift(communityitems)
                    score = score-1;
                }
                store.createCommunityList(payloadtemp);
            }
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
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
    },[searchKeyWord]);

    store.searchKey = function (key) {
        //how to search immediately
        setSearch(key);
    }

    function filterByPublish(list){
        if(list.publish){
            return true;
        }
        return false;
    }

    function filterBySearchKey(list){
        if(searchKeyWord === ""){
            return true;
        }
        else if(list.name.includes(searchKeyWord)){
            return true;
        }
        return false;
    }

    //filter list based on view selection
    store.viewList = function (allpairsArray){
        if(store.viewhomelist){
            let pairsArray = allpairsArray.filter(filterByownerEmail);
            let filterArray = pairsArray.filter(filterByCommunityList);
            let finalArray = filterArray.filter(filterBySearchKey);
            return finalArray;
        }
        else if (store.viewalllist){
            let pairsArray = allpairsArray.filter(filterByPublish);
            let filterArray = pairsArray.filter(filterByCommunityList);
            let finalArray = filterArray.filter(filterBySearchKey);
            return finalArray;
        }
        else if (store.viewuserlist){
            let pairsArray = allpairsArray.filter(filterByPublish);
            let filterArray = pairsArray.filter(filterByCommunityList);
            let finalArray = filterArray.filter(filterBySearchKeyUser);
            return finalArray;
        }
        else if (store.viewcommunitylist){
            let pairsArray = allpairsArray.filter(filterBySearchKey);
            let filterArray = pairsArray.filter(filterAllCommunityList);
            return filterArray;
        }
    }
    //filter all list that is not a community list
    function filterByCommunityList(list){
        if(list.isCommunityList){
            return false;
        }
        return true;
    }

    //filter all list that is a community list
    function filterAllCommunityList(list){
        if(list.isCommunityList){
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
            let filterArray = pairsArray.filter(filterByCommunityList);
            let finalArray = filterArray.filter(filterBySearchKey);
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
            let pairsArray = allpairsArray.filter(filterByPublish);
            let filterArray = pairsArray.filter(filterByCommunityList);
            let finalArray = filterArray.filter(filterBySearchKey);
            storeReducer({
                type: GlobalStoreActionType.VIEW_ALL_LIST,
                payload: finalArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    function filterBySearchKeyUser(list){
        if(searchKeyWord === ""){
            return false;
        }
        else if(list.Author.includes(searchKeyWord)){
            return true;
        }
        return false;
    }
    //view user list
    store.viewuserList = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let allpairsArray = response.data.idNamePairs;
            let pairsArray = allpairsArray.filter(filterByPublish);
            let filterArray = pairsArray.filter(filterByCommunityList);
            let finalArray = filterArray.filter(filterBySearchKeyUser);
            storeReducer({
                type: GlobalStoreActionType.VIEW_USER_LIST,
                payload: finalArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    // view community list
    store.viewcommunityList = async function () {
        //load community list
        const response = await api.getCommunityList();
        if (response.data.success) {
            let allpairsArray = response.data.idNamePairs;
            let finalArray = allpairsArray.filter(filterBySearchKey);
            storeReducer({
                type: GlobalStoreActionType.VIEW_COMMUNITY_LIST,
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
            return pairsArray.sort(function(a,b){return b.dislike - a.dislike})
        }
        else if(store.sortbyview){
            return pairsArray.sort(function(a,b){return b.view - a.view})
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
            type: GlobalStoreActionType.SORT_BY_VIEW,
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
            if(response.data.data.publish){//update community list
                let listname = response.data.data.name;
                let listitem = response.data.data.items;
                async function updateCommunity(listname,listitem){
                    response = await api.getCommunityList();
                    if (response.data.success) {
                        let allpairsArray = response.data.idNamePairs;
                        let id = 0;
                        for(let i = 0;i<allpairsArray.length;i++){
                            if(allpairsArray[i].name === listname){
                                id = allpairsArray[i]._id;
                            }
                        }
                        async function asyncupdateCommunityList(id,listitem) {
                            let response = await api.getTop5ListById(id);
                            if (response.data.success) {
                                let top5List = response.data.top5List;
                                top5List.updateDate = new Date();
                                let score = 5;
                                for(let i = 0; i < listitem.length; i++){
                                    let itemname = listitem[i];
                                    for(let j = 0; j < top5List.commentItems.length; j++){
                                        if(top5List.commentItems[j][0] === itemname){
                                            top5List.commentItems[j][1] = Number(top5List.commentItems[j][1]) - score;
                                        }
                                    }
                                    score = score-1;
                                }
                                async function updateList(top5List) {
                                    response = await api.updateTop5ListById(top5List._id, top5List);
                                    if (response.data.success) {
                                        async function getListPairs(top5List) {
                                            response = await api.getTop5ListPairs();
                                            if (response.data.success) {
                                                let allpairsArray = response.data.idNamePairs;
                                                let pairsArray = store.viewList(allpairsArray);
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
                        asyncupdateCommunityList(id,listitem);
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                updateCommunity(listname,listitem)
            }
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

    store.searchkey = searchKeyWord;

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