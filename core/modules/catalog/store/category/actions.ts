import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import { quickSearchByQuery } from '@vue-storefront/store/lib/search'
import { entityKeyName } from '@vue-storefront/store/lib/entities'
import rootStore from '@vue-storefront/store'
import i18n from '@vue-storefront/i18n'
import chunk from 'lodash-es/chunk'
import trim from 'lodash-es/trim'
import toString from 'lodash-es/toString'
import { optionLabel } from '../../helpers/optionLabel'
import RootState from '@vue-storefront/store/types/RootState'
import CategoryState from '../../types/CategoryState'
import SearchQuery from '@vue-storefront/store/lib/search/searchQuery'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'

const actions: ActionTree<CategoryState, RootState> = {
  /**
   * Reset current category and path
   * @param {Object} context
   */
  reset (context) {
    context.commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, [])
    context.commit(types.CATEGORY_UPD_CURRENT_CATEGORY, {})
    rootStore.dispatch('stock/clearCache')
    Vue.prototype.$bus.$emit('category-after-reset', { })
  },
  /**
   * Load categories within specified parent
   * @param {Object} commit promise
   * @param {Object} parent parent category
   */
  list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = rootStore.state.config.entities.optimize ? rootStore.state.config.entities.category.includeFields : null, skipCache = false }) {
    const commit = context.commit

    let searchQuery = new SearchQuery()
    if (parent && typeof parent !== 'undefined') {
      searchQuery = searchQuery.applyFilter({key: 'parent_id', value: {'eq': parent.id}})
    }

    if (onlyActive === true) {
      searchQuery = searchQuery.applyFilter({key: 'is_active', value: {'eq': true}})
    }

    if (onlyNotEmpty === true) {
      searchQuery = searchQuery.applyFilter({key: 'product_count', value: {'gt': 0}})
    }

    if (skipCache || (!context.state.list || context.state.list.length === 0)) {
      return quickSearchByQuery({ entityType: 'category', query: searchQuery, sort: sort, size: size, start: start, includeFields: includeFields }).then((resp) => {
        commit(types.CATEGORY_UPD_CATEGORIES, resp)
        Vue.prototype.$bus.$emit('category-after-list', { query: searchQuery, sort: sort, size: size, start: start, list: resp })
        return resp
      })
    } else {
      return new Promise((resolve, reject) => {
        let resp = { items: context.state.list, total: context.state.list.length }
        Vue.prototype.$bus.$emit('category-after-list', { query: searchQuery, sort: sort, size: size, start: start, list: resp })
        resolve(resp)
      })
    }
  },

  /**
   * Load category object by specific field - using local storage/indexed Db
   * loadCategories() should be called at first!
   * @param {Object} commit
   * @param {String} key
   * @param {String} value
   * @param {Bool} setCurrentCategory default=true and means that state.current_category is set to the one loaded
   */
  single (context, { key, value, setCurrentCategory = true, setCurrentCategoryPath = true,  populateRequestCacheTags = true }) {
    const state = context.state
    const commit = context.commit
    const dispatch = context.dispatch

    return new Promise((resolve, reject) => {
      let setcat = (error, mainCategory) => {
        if (error) {
          console.error(error)
          reject(error)
        }

        if (setCurrentCategory) {
          commit(types.CATEGORY_UPD_CURRENT_CATEGORY, mainCategory)
        }
        if (populateRequestCacheTags && mainCategory && Vue.prototype.$ssrRequestContext) {
          Vue.prototype.$ssrRequestContext.output.cacheTags.add(`C${mainCategory.id}`)
        }
        if (setCurrentCategoryPath) {
          let currentPath = []
          let recurCatFinder = (category) => {
            if (!category) {
              return
            }
            if (category.parent_id) {
              dispatch('single', { key: 'id', value: category.parent_id, setCurrentCategory: false, setCurrentCategoryPath: false }).then((sc) => { // TODO: move it to the server side for one requests OR cache in indexedDb
                if (!sc) {
                  commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, currentPath)
                  Vue.prototype.$bus.$emit('category-after-single', { category: mainCategory })
                  return resolve(mainCategory)
                }
                currentPath.unshift(sc)
                if (sc.parent_id) {
                  recurCatFinder(sc)
                }
              }).catch(err => {
                console.error(err)
                commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, currentPath) // this is the case when category is not binded to the root tree - for example 'Erin Recommends'
                resolve(mainCategory)
              })
            } else {
              commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, currentPath)
              Vue.prototype.$bus.$emit('category-after-single', { category: mainCategory })
              resolve(mainCategory)
            }
          }
          if (typeof mainCategory !== 'undefined') {
            recurCatFinder(mainCategory) // TODO: Store breadcrumbs in IndexedDb for further usage to optimize speed?
          } else {
            reject(new Error('Category query returned empty result ' + key + ' = ' + value))
          }
        } else {
          Vue.prototype.$bus.$emit('category-after-single', { category: mainCategory })
          resolve(mainCategory)
        }
      }

      if (state.list.length > 0) { // SSR - there were some issues with using localForage, so it's the reason to use local state instead, when possible
        let category = state.list.find((itm) => { return itm[key] === value })
        // Check if category exists in the store OR we have recursively reached Default category (id=1)
        if (category || value === 1) {
          setcat(null, category)
        } else {
          reject(new Error('Category query returned empty result ' + key + ' = ' + value))
        }
      } else {
        const catCollection = Vue.prototype.$db.categoriesCollection
        // Check if category does not exist in the store AND we haven't recursively reached Default category (id=1)
        if (!catCollection.getItem(entityKeyName(key, value), setcat) && value !== 1) {
          reject(new Error('Category query returned empty result ' + key + ' = ' + value))
        }
      }
    })
  },
  /**
   * Filter category products
   */
  products (context, { populateAggregations = false, filters = [], searchProductQuery, current = 0, perPage = 50, sort = '', includeFields = null, excludeFields = null, configuration = null, append = false, skipCache = false }) {
    rootStore.state.category.current_product_query = {
      populateAggregations,
      filters,
      current,
      perPage,
      includeFields,
      excludeFields,
      configuration,
      append,
      sort
    }

    let prefetchGroupProducts = true
    if (rootStore.state.config.entities.twoStageCaching && rootStore.state.config.entities.optimize && !Vue.prototype.$isServer && !rootStore.state.twoStageCachingDisabled) { // only client side, only when two stage caching enabled
      includeFields = rootStore.state.config.entities.productListWithChildren.includeFields // we need configurable_children for filters to work
      excludeFields = rootStore.state.config.entities.productListWithChildren.excludeFields
      prefetchGroupProducts = false
      console.log('Using two stage caching for performance optimization - executing first stage product pre-fetching')
    } else {
      prefetchGroupProducts = true
      if (rootStore.state.twoStageCachingDisabled) {
        console.log('Two stage caching is disabled runtime because of no performance gain')
      } else {
        console.log('Two stage caching is disabled by the config')
      }
    }
    let t0 = new Date().getTime()

    const precachedQuery = searchProductQuery
    let productPromise = rootStore.dispatch('product/list', {
      query: precachedQuery,
      start: current,
      size: perPage,
      excludeFields: excludeFields,
      includeFields: includeFields,
      configuration: configuration,
      append: append,
      sort: sort,
      updateState: true,
      prefetchGroupProducts: prefetchGroupProducts
    }).then((res) => {
      let t1 = new Date().getTime()
      rootStore.state.twoStageCachingDelta1 = t1 - t0

      let subloaders = []
      if (!res || (res.noresults)) {
        rootStore.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t('No products synchronized for this category. Please come back while online!'),
          action1: { label: i18n.t('OK') }
        })
        if (!append) rootStore.dispatch('product/reset')
        rootStore.state.product.list = { items: [] } // no products to show TODO: refactor to rootStore.state.category.reset() and rootStore.state.product.reset()
        // rootStore.state.category.filters = { color: [], size: [], price: [] }
        return []
      } else {
        if (rootStore.state.config.products.filterUnavailableVariants && rootStore.state.config.products.configurableChildrenStockPrefetchStatic) { // prefetch the stock items
          const skus = []
          let prefetchIndex = 0
          res.items.map(i => {
            if (rootStore.state.config.products.configurableChildrenStockPrefetchStaticPrefetchCount > 0) {
              if (prefetchIndex > rootStore.state.config.products.configurableChildrenStockPrefetchStaticPrefetchCount) return
            }
            skus.push(i.sku) // main product sku to be checked anyway
            if (i.type_id === 'configurable' && i.configurable_children && i.configurable_children.length > 0) {
              for (const confChild of i.configurable_children) {
                const cachedItem = context.rootState.stock.cache[confChild.id]
                if (typeof cachedItem === 'undefined' || cachedItem === null) {
                  skus.push(confChild.sku)
                }
              }
              prefetchIndex++
            }
          })
          for (const chunkItem of chunk(skus, 15)) {
            rootStore.dispatch('stock/list', { skus: chunkItem, skipCache }) // store it in the cache
          }
        }
        if (populateAggregations === true && res.aggregations) { // populate filter aggregates
          for (let attrToFilter of filters) { // fill out the filter options
            Vue.set(rootStore.state.category.filters.available, attrToFilter, [])

            let uniqueFilterValues = new Set<string>()
            if (attrToFilter !== 'price') {
              if (res.aggregations['agg_terms_' + attrToFilter]) {
                let buckets = res.aggregations['agg_terms_' + attrToFilter].buckets
                if (res.aggregations['agg_terms_' + attrToFilter + '_options']) {
                  buckets = buckets.concat(res.aggregations['agg_terms_' + attrToFilter + '_options'].buckets)
                }

                for (let option of buckets) {
                  uniqueFilterValues.add(toString(option.key))
                }
              }

              uniqueFilterValues.forEach(key => {
                const label = optionLabel(rootStore.state.attribute, { attributeKey: attrToFilter, optionId: key })
                if (trim(label) !== '') { // is there any situation when label could be empty and we should still support it?
                  rootStore.state.category.filters.available[attrToFilter].push({
                    id: key,
                    label: label
                  })
                }
              });
            } else { // special case is range filter for prices
              const storeView = currentStoreView()
              const currencySign = storeView.i18n.currencySign
              if (res.aggregations['agg_range_' + attrToFilter]) {
                let index = 0
                let count = res.aggregations['agg_range_' + attrToFilter].buckets.length
                for (let option of res.aggregations['agg_range_' + attrToFilter].buckets) {
                  rootStore.state.category.filters.available[attrToFilter].push({
                    id: option.key,
                    from: option.from,
                    to: option.to,
                    label: (index === 0 || (index === count - 1)) ? (option.to ? '< ' + currencySign + option.to : '> ' + currencySign + option.from) : currencySign + option.from + (option.to ? ' - ' + option.to : '')// TODO: add better way for formatting, extract currency sign
                  })
                  index++
                }
              }
            }
          }
          Vue.set(rootStore.state.category.filters.available, 'new', [])
          rootStore.state.category.filters.available['new'].push({
            id: '0',
            label: 'Old'
          })
          rootStore.state.category.filters.available['new'].push({
            id: '1',
            label: 'New'
          })
        }
      }
      return subloaders
    }).catch((err) => {
      console.error(err)
      rootStore.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: i18n.t('No products synchronized for this category. Please come back while online!'),
        action1: { label: i18n.t('OK') }
      })
    })

    if (rootStore.state.config.entities.twoStageCaching && rootStore.state.config.entities.optimize && !Vue.prototype.$isServer && !rootStore.state.twoStageCachingDisabled) { // second stage - request for caching entities
      console.log('Using two stage caching for performance optimization - executing second stage product caching') // TODO: in this case we can pre-fetch products in advance getting more products than set by pageSize
      rootStore.dispatch('product/list', {
        query: precachedQuery,
        start: current,
        size: perPage,
        excludeFields: null,
        includeFields: null,
        updateState: false // not update the product listing - this request is only for caching
      }).catch((err) => {
        console.info("Problem with second stage caching - couldn't store the data")
        console.info(err)
      }).then((res) => {
        let t2 = new Date().getTime()
        rootStore.state.twoStageCachingDelta2 = t2 - t0
        console.log('Using two stage caching for performance optimization - Time comparison stage1 vs stage2', rootStore.state.twoStageCachingDelta1, rootStore.state.twoStageCachingDelta2)
        if (rootStore.state.twoStageCachingDelta1 > rootStore.state.twoStageCachingDelta2) { // two stage caching is not making any good
          rootStore.state.twoStageCachingDisabled = true
          console.log('Disabling two stage caching')
        }
      })
    }
    return productPromise
  },
  resetFilters (context) {
    context.commit(types.CATEGORY_REMOVE_FILTERS)
  },
  searchProductQuery (context, productQuery) {
    context.commit(types.CATEGORY_UPD_SEARCH_PRODUCT_QUERY, productQuery)
  }
}

export default actions
