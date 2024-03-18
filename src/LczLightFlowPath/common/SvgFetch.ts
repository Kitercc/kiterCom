export default class SvgFetch {
  static fileCatch = new Map<string, string>()

  static getFileStr(url: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return new Promise(resolve => {
      function runGetResule() {
        const resule = self.fileCatch.get(url) || ''
        if (resule === 'loading') {
          requestIdleCallback(runGetResule)
        } else {
          resolve(resule)
        }
      }

      if (this.fileCatch.has(url)) {
        runGetResule()
      } else {
        this.fileCatch.set(url, 'loading')
        fetch(url)
          .then(request => request.text())
          .then(res => {
            this.fileCatch.set(url, res)
            resolve(res)
          })
          .catch(() => {
            this.fileCatch.delete(url)
            resolve('')
          })
      }
    })
  }
}
