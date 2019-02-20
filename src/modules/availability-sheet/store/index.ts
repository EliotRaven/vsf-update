import * as types from './mutation-types'
import config from 'config'
import axios from "axios";

let initialData = {
    source_selection_items: [
        {
            source_code: "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ac",
            sku: "MP01-32-Black",
            qty_to_deduct: 1,
            qty_available: 17
        },
        {
            source_code: "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ac",
            sku: "MSH10-32-Blue",
            qty_to_deduct: 5,
            qty_available: 8
        },
        {
            source_code: "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ad",
            sku: "MP01-32-Black",
            qty_to_deduct: 1,
            qty_available: 5
        },
        {
            source_code: "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ad",
            sku: "MSH10-32-Blue",
            qty_to_deduct: 1,
            qty_available: 0
        },
        {
            source_code: "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ae",
            sku: "MP01-32-Black",
            qty_to_deduct: 1,
            qty_available: 8
        },
        {
            source_code: "51cd3ca2-8b66-11e8-80c4-eec2ef9f58ae",
            sku: "MSH10-32-Blue",
            qty_to_deduct: 1,
            qty_available: 7
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
        [types.SET_AVAILABILITY_SHEET] (state, payload) {
            state.info = payload
        }
    },
    actions: {
        get ({ commit, dispatch }, data) {
            const { token, endpoint } = config.availabilitySheet;

            axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'Accept': '*/*'
                },
                url: endpoint,
                data
            }).then(res => {
                commit(types.SET_AVAILABILITY_SHEET, res.data.source_selection_items)
            }).catch(err => {
                console.log(err)
            });

            // commit(types.SET_AVAILABILITY_SHEET, initialData.source_selection_items)

        }
    },
    getters: {
        info: state => state.info
    }
}