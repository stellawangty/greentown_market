/**
 * 创建script
 * @param url
 * @returns {Promise}
 */
export default function remoteLoad (url, hasCallback) {
  return createScript(url, hasCallback)
}
function createScript (url, hasCallback) {
  let scriptElement = document.createElement('script')
  document.body.appendChild(scriptElement)
  let promise = new Promise((resolve, reject) => {
    scriptElement.addEventListener('load', e => {
      removeScript(scriptElement)
      if (!hasCallback) {
        resolve(e)
      }
    }, false)

    scriptElement.addEventListener('error', e => {
      removeScript(scriptElement)
      reject(e)
    }, false)

    if (hasCallback) {
      window.____callback____ = function () {
        resolve()
        window.____callback____ = null
      }
    }
  })

  if (hasCallback) {
    url += '&callback=____callback____'
  }

  scriptElement.src = url

  return promise
}
/**
 * 移除script标签
 * @param scriptElement script dom
*/
function removeScript (scriptElement) {
  document.body.removeChild(scriptElement)
}
