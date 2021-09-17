
export const UUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c, r) => {
    return ('x' === c
      ? (r = Math.random() * 16 | 0)
      : (r & 0x3 | 0x8)
    ).toString(16);
  });
};

export const uniqName = () => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'W', 'X', 'Y', 'Z'];
  const firstLetter = letters[Math.round(Math.random() * (letters.length - 1))];
  const secondLetter = letters[Math.round(Math.random() * (letters.length - 1))];
  const number = String(Date.now()).slice(-6);

  return `${firstLetter}${secondLetter}-${number}`;
};

export const sleep = async (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const nounDeclension = (number = 0, titles = []) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : cases[(number % 10 < 5)
      ? number % 10
      : 5]];
};

export const reduceToArray = (items, SIZE = 4, options = { fillNull: false }) => {
  return items.reduce((p, c, index, source) => {
    if( p[p.length - 1].length === SIZE) {
      p.push([]);
    }
    p[p.length - 1].push(c);

    if (options['fillNull']) {
      if (index === (source.length - 1)) {
        if (p[p.length - 1].length < SIZE) {
          let i = p[p.length - 1].length;
          while (i < SIZE) {
            i++;
            p[p.length - 1].push(null);
          }
        }
      }
    }

    return p;
  }, [[]]);
};

export const objectToQuery = (object) => {
  let query = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (value instanceof Array) {
        if ( !! value.length) {
          query = [...query, ...value.map(item => [key, item])];
        }
      }
      else {
        if (value) {
          query = [...query, [key, value]];
        }
      }
    }
  }

  const searchURL = new URLSearchParams(query);
  const search = searchURL.toString();
  return search ? '?' + search : '';
};

export const queryToObject = (query) => {
  const searchURL = new URLSearchParams(query);

  let params = {};
  for (let param of searchURL) {
    if ( !! param[1]) {
      let paramValue = param[1];
      if (/^(\d+)$/.test(paramValue)) {
        paramValue = Number(paramValue);
      } else if (/^(true)$/.test(paramValue)) {
        paramValue = true;
      } else if (/^(false)$/.test(paramValue)) {
        paramValue = false;
      }

      if (param[0] in params) {
        if (params[param[0]] instanceof Array) {
          params[param[0]] = [...params[param[0]], paramValue];
        }
        else {
          params[param[0]] = [params[param[0]], paramValue];
        }
      }
      else {
        params[param[0]] = paramValue;
      }
    }
  }

  return params;
};

// export const getBuffer = (result) => {
//   return new Promise((response, reject) => {
//
//     const buffer = [];
//
//     result.on('data', chunk => buffer.push(chunk));
//     result.on('end', () => response(Buffer.concat(buffer)));
//     result.on('error', error => reject(error));
//   });
// };
//
// export const saveFile = (buffer, path) => {
//
//   return new Promise((resolve) => {
//
//     const stream = fs.createWriteStream(path);
//
//     stream.write(buffer, 'utf16le', resolve);
//   });
// };
//
// export const getFiles = async (req) => {
//
//   return new Promise((resolve, reject) => {
//
//     const result = { files: {}, fields: {} };
//     const bb = new BusBoy({ headers: req.headers });
//
//     bb.on('file', (fieldName, file, filename, encoding, mimeType) => {
//
//       const hashString = UUID();
//       const fileName = `${hashString}.${extensions[mimeType]}`;
//
//       result['files'][fieldName] = {
//         fileName: fileName,
//         mimeType: mimeType,
//         encoding: encoding,
//         buffer: []
//       };
//
//       file.on('data', (data) => {
//         result['files'][fieldName]['buffer'].push(data);
//       });
//
//       file.on('end', () => {
//         result['files'][fieldName]['buffer'] = Buffer.concat(result['files'][fieldName]['buffer']);
//       });
//     });
//
//     // bb.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
//     bb.on('field', function(fieldName, val) {
//       result['fields'][fieldName] = val;
//     });
//
//     bb.on('error', (error) => {
//       reject(error);
//     });
//
//     bb.on('finish', () => {
//       resolve(result);
//     });
//
//     req.pipe(bb);
//   });
// };

export const validation = {
  email: (value) => {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(value).toLowerCase());

  },
};

export const isJSON = (value) => {
  try {
    JSON.parse(value);
    return true;
  }
  catch(e) {
    return false;
  }
};
