const getCrc16 = require('../crc16');

const input1 = new Buffer.from('787805010001', 'hex')
const result1 = new Buffer.from('d9dc', 'hex')
const input2 = new Buffer.from('787805130001d9dc0d0a', 'hex')
const result2 = new Buffer.from('e9f1', 'hex')

test('CRC16 Test', () => {
    expect(getCrc16(input1.slice(2, 6))).toStrictEqual(result1);
    expect(getCrc16(input2.slice(2, 6))).toStrictEqual(result2);
});
