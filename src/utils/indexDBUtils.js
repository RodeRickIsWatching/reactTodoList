class indexDBUtils {
  constructor() {
    this.version = 1;
  }
  async _init(_params) {
    this._params = _params;
    return await this.openDB(_params);
  }

  /**
   * 以下是初始化方法
   */
  /**
   * @param {options} Object {name, store, createIndexArr, keyPath}
   * @param {String} name 'dbName' 库的名字
   * @param {String} storeName 'storeName' 表的名字
   * @param {Object} keyPath {keyPath: 'id'} 主键名
   * @param {Array} createIndexArr [index1, index2]
   * @param {Object} index1 {index:'indexName', unique:false}
   */
  async openDB(options) {
    // 赋初值
    let {
      name = "localDB",
      storeName = "tasks",
      createIndexArr = [],
      keyPath = { keyPath: "id" }
    } = options;
    // 连接indexDB
    let request = window.indexedDB.open(name, this.version);
    return this._bindDBEvent({ request, storeName, createIndexArr, keyPath });
  }

  _bindDBEvent({ request, storeName, createIndexArr, keyPath }) {
    // 初始化和更新时候都会先触发upgradeneeded再触发success，因此在success状态中返回res即可
    return new Promise(res => {
      // 绑定事件
      request.onsuccess = e => {
        this.db = e.target.result;
        // 触发res
        res(e.target.result);
      };
      // 绑定事件
      request.onupgradeneeded = e => {
        let db = e.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          let store = db.createObjectStore(storeName, keyPath);
          createIndexArr.map(item => {
            store.createIndex(
              `${item.index}Index`,
              item.index,
              item.unique ? { unique: true } : { unique: false }
            );
          });
        }
      };
    });
  }

  /**
   * 以下都是工具方法
   */
  async getFirstDataByIndex(db, storeName, indexName, subKey) {
    //这个方式只能返回第一个查询到的值
    return new Promise(resolve => {
      db
        .transaction(storeName)
        .objectStore(storeName)
        .index(indexName)
        .get(subKey).onsuccess = e => {
        console.log(e.target.result);
        resolve();
      };
    });
  }
  getDataByCursor(db, storeName) {
    // 通过游标形式，一个一个查看
    setTimeout(() => {
      db
        .transaction(storeName)
        .objectStore(storeName)
        .openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          console.log(cursor);
          // 这个相当于链表的next方法，且会自动将后续符合要求的对象返回回来
          // 但是都是分开的，即需要自己用数组来接数据
          cursor.continue();
        }
      };
    }, 1000);
  }

  getDataByIndexAndCursor(db, storeName, indexName, subKey) {
    // 将游标和index查询结合起来
    setTimeout(() => {
      db
        .transaction(storeName)
        .objectStore(storeName)
        .index(indexName)
        .openCursor(IDBKeyRange.only(subKey)).onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          console.log(cursor);
          cursor.continue();
        }
      };
    }, 1000);
  }

  /**
   * @param {String} db
   * @param {String} storeName
   * @param {Array} _paramsArr
   */
  async pushData(db, storeName, _paramsArr = []) {
    return new Promise(resolve => {
      if (Array.isArray(_paramsArr)) {
        _paramsArr.forEach(item => {
          db
            .transaction(storeName, "readwrite")
            .objectStore(storeName)
            .add(item).onsuccess = e => {
            let result = e.target.result;
            resolve(result);
          };
        });
      } else {
        throw new Error("pushData's Param sholud be an Array");
      }
    });
  }

  async readData(db, storeName, key) {
    // get是读取key对应的对象
    return new Promise(resolve => {
      db
        .transaction(storeName, "readwrite")
        .objectStore(storeName)
        .get(key).onsuccess = e => {
        let result = e.target.result;
        resolve(result);
      };
    });
  }
  async readAllData(db, storeName) {
    // get是读取key对应的对象
    return new Promise(resolve => {
      db
        .transaction(storeName, "readwrite")
        .objectStore(storeName)
        .getAll().onsuccess = e => {
        let result = e.target.result;
        resolve(result);
      };
    });
  }
  async findKey(db, storeName, key) {
    // getKey是查找key值也就是123888是否存在，若不存在就是undefined
    // 用于判断是否存在
    return new Promise(resolve => {
      db
        .transaction(storeName, "readwrite")
        .objectStore(storeName)
        .getKey(key).onsuccess = e => {
        let res = e.target.result;
        resolve(res);
      };
    });
  }
  async updateData(db, storeName, options) {
    let { key, value: _params } = options;
    // 改数据就是先读取再重新赋值的过程
    return new Promise(resolve => {
      let req = db
        .transaction(storeName, "readwrite")
        .objectStore(storeName)
        .get(key);
      req.onsuccess = e => {
        let res = e.target.result;
        Object.keys(_params).forEach(item => {
          res[item] = _params[item];
        });
        db.transaction(storeName, "readwrite")
          .objectStore(storeName)
          .put(res);
        resolve(res);
      };
    });
  }
  async deleteData(db, storeName, key) {
    return new Promise(resolve => {
      let req = db
        .transaction(storeName, "readwrite")
        .objectStore(storeName)
        .delete(key);
      req.onsuccess = e => {
        let res = e.target.result;
        resolve(res);
      };
    });
  }
  async clear(db, storeName) {
    return new Promise(resolve => {
      db.transaction(storeName, "readwrite")
        .objectStore(storeName)
        .clear();
      resolve();
    });
  }
  deleteStore(db, name = "tasks") {
    db.deleteObjectStore(name);
  }
}

export default indexDBUtils;
