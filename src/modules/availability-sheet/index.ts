import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'

export const KEY = 'magenta-data'

const moduleConfig: VueStorefrontModuleConfig = {
    key: KEY,
    store: { modules: [{ key: KEY, module }] },
}

export const MagentaData = new VueStorefrontModule(moduleConfig)