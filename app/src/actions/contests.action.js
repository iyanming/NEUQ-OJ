/**
 * Created by out_xu on 17/2/21.
 */
import {SET_CONTESTS_TABLE, SET_CONTEST} from "./type";
import API from "../api";
import codeHelper from "../utils/codeHelper";
import goto from "../utils/goto";
import jumpTo from '../utils/windowScroll'

/**
 * 获取竞赛列表
 * @param page,size
 */
export function getContestsTable(page = 1, size = 20) {
    return (dispatch) => {
        //将当前输入的页码存入sessionStorage
        sessionStorage.setItem("neuq_oj.contestspagecurr", page);
        sessionStorage.setItem("neuq_oj.contestspagesize", size);

        return fetch(API.contests + '?page=' + page + '&size=' + size, {
            method: 'GET',
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                sessionStorage.setItem("neuq_oj.contestspagecount", json.total_count);
                dispatch(setContestsList(json.data));
                jumpTo('navigation')
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }
}

/**
 * 设置竞赛列表
 * @param data
 */
const setContestsList = (data) => {
    return {
        type: SET_CONTESTS_TABLE,
        payload: {
            data
        }
    }
};

/**
 * 搜索竞赛
 * @param value,page,size
 */
export function searchContests(value, page = 1, size = 20) {
    return (dispatch) => {
        sessionStorage.setItem("neuq_oj.contestspagecurr", page);
        sessionStorage.setItem("neuq_oj.contestspagesize", size);

        return fetch(`${API.contestssearch}?keyword=${value}&page=${page}&size=${size}`, {
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                sessionStorage.setItem("neuq_oj.contestspagecount", json.total_count);
                dispatch(setContestsList(json.data))
                jumpTo('navigation')
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }
}
/**
 * 设置当前竞赛详情
 * @param data
 */
const setContest = (data) => {
    return {
        type: SET_CONTEST,
        payload: {
            data
        }
    }
};


/**
 * 获取竞赛问题
 * @param body
 */
export function getContest(id) {
    return (dispatch) => {
        const token = localStorage.getItem('neuq_oj.token');
        return fetch(API.contest + id, {
            method: 'GET',
            headers: {
                "token": token
            }
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                dispatch(setContest(json.data))
                jumpTo('navigation')
            } else {
                goto('/contests');
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }
}



/**
 * 加入竞赛
 * @param body
 */
export function joinContest(id, body) {
    return ()=>{
        const token = localStorage.getItem('neuq_oj.token');
        fetch(API.contest + id + '/join', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(body)
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                goto('contests/' + id);
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }
}
