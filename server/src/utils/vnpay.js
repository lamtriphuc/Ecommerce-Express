const crypto = require('crypto');

exports.sortObject = (obj) => {
    let sorted = {};
    let str = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) str.push(encodeURIComponent(key));
    }
    str.sort();
    for (let i = 0; i < str.length; i++) {
        sorted[str[i]] = encodeURIComponent(obj[str[i]]).replace(/%20/g, "+");
    }
    return sorted;
};

exports.sign = (data) => {
    return crypto
        .createHmac("sha512", process.env.VNP_HASHSECRET)
        .update(Buffer.from(data, "utf-8"))
        .digest("hex");
};