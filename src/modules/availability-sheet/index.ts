import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'

export const KEY = 'availability-sheet'

const moduleConfig: VueStorefrontModuleConfig = {
    key: KEY,
    store: { modules: [{ key: KEY, module }] },
}

export const AvailabilitySheet = new VueStorefrontModule(moduleConfig)