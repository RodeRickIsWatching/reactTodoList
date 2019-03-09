import indexDBUtils from "./indexDBUtils";

// 该class目的是为了能将异步操作变成同步，利用了promise的思路
class indexedDBController extends indexDBUtils {
  constructor(params) {
    super();
    this.storeName = params.storeName;
    this.state = "pending";
    this.asyncFnArr = [];
    this.resolveArr = [];
    this._dbInit(params);
  }

  async _dbInit(params) {
    this.indexDBObj = new indexDBUtils();
    this.db = await this.indexDBObj._init(params);
    let str = "";
    Array.from(this.db.objectStoreNames).forEach(item => {
      str += `${item} `;
    });
    console.log(`indexedDB is ready, name: ${this.db.name}, storeList: ${str}`);
    this.state = "ready";
  }

  // observer->state是pending时push到数组，state是ready时直接运行
  async observer(fn, resolve) {
    return new Promise(res => {
      if (this.state === "ready") {
        if (this.asyncFnArr.length > 0) {
          // 说明是之前有存的函数
          this.asyncFnArr.forEach((item, index) => {
            item(this.db).then(result => {
              // 取出之前保存的resolve，由于保存的函数和resolve是有对应关系的，因此可以通过index来匹配
              // 对应关系：保存一个函数就会返回一个promise
              if (resolve) {
                this.resolveArr[index](result);
              } else {
                res(result);
              }
            });
          });
          this.asyncFnArr = [];
        } else {
          if (typeof fn == "function") {
            // 初始化完成后直接执行的函数
            fn(this.db).then(result => {
              res(result);
            });
          }
        }
      } else {
        if (typeof fn === "function") {
          this.asyncFnArr.push(fn);
        }
        let temp = resolve ? resolve : res;
        this.resolveArr.push(temp);
        setTimeout(() => {
          this.observer("waiting", temp);
        }, 0);
      }
    });
  }

  async pushData(_params, storeName = this.storeName) {
    return new Promise(resolve => {
      let fn = db => {
        return this.indexDBObj.pushData(db, storeName, _params);
      };
      this.observer(fn).then(res => {
        // console.log("pushOver", res);
        resolve(res);
      });
    });
  }

  async readData(key, storeName = this.storeName) {
    return new Promise(resolve => {
      let fn = db => {
        return this.indexDBObj.readData(db, storeName, key);
      };
      this.observer(fn).then(res => {
        // console.log("readOver", res);
        resolve(res);
      });
    });
  }
  
  async readAllData(key, storeName = this.storeName) {
    return new Promise(resolve => {
      let fn = db => {
        return this.indexDBObj.readAllData(db, storeName);
      };
      this.observer(fn).then(res => {
        // console.log("readAllOver", res);
        resolve(res);
      });
    });
  }

  async updateData({ key, value }, storeName = this.storeName) {
    return new Promise(resolve => {
      let fn = db => {
        return this.indexDBObj.updateData(db, storeName, { key, value });
      };
      this.observer(fn).then(res => {
        // console.log("updateOver", res);
        resolve(res);
      });
    });
  }

  async deleteData(key, storeName = this.storeName) {
    return new Promise(resolve => {
      let fn = db => {
        return this.indexDBObj.updateData(db, storeName, key);
      };
      this.observer(fn).then(res => {
        // console.log("deleteOver", res);
        resolve(res);
      });
    });
  }

  async clear(storeName = this.storeName) {
    return new Promise(resolve => {
      let fn = db => {
        return this.indexDBObj.updateData(db, storeName);
      };
      this.observer(fn).then(res => {
        // console.log("clearOver", res);
        resolve(res);
      });
    });
  }
}

export default indexedDBController;
