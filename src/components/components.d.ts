import XtxSwiper from './XtxSwiper.vue'
import XtxGuess from './XtxGuess.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

// 组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
