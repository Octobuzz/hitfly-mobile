import R from 'ramda'

// используется в редюсерах в R.useWith функциях
export const statePayloadArr = [R.identity, R.prop('payload')]
