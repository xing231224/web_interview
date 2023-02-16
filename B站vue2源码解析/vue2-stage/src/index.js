import { initMixin } from "./init"
import { initLiveCycle } from "./livecycle";


function Vue(options) {
    this._init(options)
}

initMixin(Vue);
initLiveCycle(Vue)

export default Vue