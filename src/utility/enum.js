const syncType = {
  error: -1, // 連線失敗
  init: null, // 未連線
  syncable: 0, // 連線成功待更新
  success: 1, // 連線成功已更新到最新版
  connecting: 2, // 連線中
}

export {
  syncType
}