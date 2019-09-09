import {getBannerListApi, getIconListApi, getShopListApi, } from '../../service/api.js'
import { Toast } from 'vant';

//切割一条array，return {{...}, {...}, ...}
function sliceArray (array, size) {
    const result = []
    for (let x = 0; x < Math.ceil(array.length / size); x++) {
      const start = x * size
      const end = start + size
      result.push(array.slice(start, end))
    }
    return result
}
const state= {
    bannerList: [],
    iconList: [],
    shopList: [],
    searchList: [],  
}

const mutations = {
    getBanner(state, payload){
        state.bannerList = payload.data
    },
    getIcon(state, payload){
        state.iconList = payload.data
    },
    getShop(state, payload){
        state.shopList = payload.data
    },
    getSearch(state, payload){
        state.searchList = payload.data
    },
}

const getters = {
    iconListGetter: state => {
      return  sliceArray(state.iconList, 8)
    }    
}

const actions = {
    getBannerList ({commit}, data){
        getBannerListApi({...data}).then((res) => {
            if(res && res.code === '00000'){
                commit({
                    type: 'getBanner',
                    data: res.data
                })
            } else {
                Toast('加载数据失败！')
            }
        })
    },
    getIconList ({commit}, data){
        getIconListApi({...data}).then((res) => {
            if(res && res.code === '00000'){
                commit({
                    type: 'getIcon',
                    data: res.data
                })
            } else {
               Toast('加载数据失败！')
            }
        })
    },
    getShopList ({commit}, data){
        return new Promise((resolve, reject)=>{
            getShopListApi({...data}).then((res) => {
                if(res && res.code === '00000'){
                    commit({
                        type: 'getShop',
                        data: res.data
                    })
                    resolve()
                } else {
                    Toast('加载数据失败！')
                }
            })
        })
    },
    getSearchList ({commit}, data){
        getShopListApi({...data}).then((res) => {
            if(res && res.code === '00000'){
                commit({
                    type: 'getSearch',
                    data: res.data
                })
            } else {
                Toast('加载数据失败！')
            }
        })
    },
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}

