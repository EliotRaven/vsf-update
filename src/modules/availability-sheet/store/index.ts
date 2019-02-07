import * as types from './mutation-types'
import config from 'config'
import axios from "axios";

let initialData = {
    "source_selection_items": [
        {
            "source_code": "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ac",
            "sku": "MSH09-32-Green",
            "qty_to_deduct": 1,
            "qty_available": 17
        },
        {
            "source_code": "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ac",
            "sku": "24-WB01",
            "qty_to_deduct": 5,
            "qty_available": 1
        },
        {
            "source_code": "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ad",
            "sku": "MSH09-32-Green",
            "qty_to_deduct": 1,
            "qty_available": 0
        },
        {
            "source_code": "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ad",
            "sku": "24-WB01",
            "qty_to_deduct": 1,
            "qty_available": 165
        },
        {
            "source_code": "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ae",
            "sku": "MSH09-32-Green",
            "qty_to_deduct": 1,
            "qty_available": 0
        },
        {
            "source_code": "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ae",
            "sku": "24-WB01",
            "qty_to_deduct": 1,
            "qty_available": 0
        }
    ],
    "shippable": true
}

export const module = {
    namespaced: true,
    state: {
        info: []
    },
    mutations: {
        [types.SET_MAGENTA_DATA] (state, payload) {
            state.info = payload
        }
    },
    actions: {
        get ({ commit }, data) {
            // const { token, endpoint } = config.magenta;

            // axios({
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': token,
            //         'Access-Control-Allow-Origin': '*',
            //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            //     },
            //     url: endpoint,
            //     data
            // }).then(res => {
            //     debugger
            //     commit(types.SET_MAGENTA_DATA, res.data)
            // });
            commit(types.SET_MAGENTA_DATA, initialData.source_selection_items)

        }
    },
    getters: {
        info: state => state.info
    }
}