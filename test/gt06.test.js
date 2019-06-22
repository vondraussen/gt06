const Gt06 = require('../gt06');

const login = new Buffer.from('78780d01012345678901234500018cdd0d0a', 'hex')
const loginResult = {
    data_packet: {
        data: [120, 120, 13, 1, 1, 35, 69, 103, 137, 1, 35, 69, 0, 1, 140, 221, 13, 10],
        type: "Buffer"
    },
    event: {
        number: 1,
        string: "login"
    },
    parsed: {
        errorCheck: 36061,
        imei: 123456789012345,
        serialNumber: 1
    },
    respondToClient: true,
    responseMsg: new Buffer.from('787805010001d9dc0d0a', 'hex')
}

const status = new Buffer.from('78780a13400504000000153dc20d0a', 'hex')
const statusResult = {
    data_packet: {
        data: [120, 120, 10, 19, 64, 5, 4, 0, 0, 0, 21, 61, 194, 13, 10],
        type: "Buffer"
    },
    event: {
        number: 0x13,
        string: "status"
    },
    parsed: {
        gsmSigStrength: "strong signal",
        terminalInfo: {
            alarmType: "normal",
            charging: false,
            gpsTracking: true,
            ignition: false,
            relayState: false,
            status: false
        },
        voltageLevel: "high"
    },
    respondToClient: true,
    responseMsg: new Buffer.from('787805130001e9f10d0a', 'hex')
}

const location = new Buffer.from('78781f1211071403362aca0543ec4f00ff976e021549010603e6b500e7590074763d0d0a', 'hex')
const locationResult = {
    data_packet: {
        data: [120, 120, 31, 18, 17, 7, 20, 3, 54, 42, 202, 5, 67, 236, 79, 0, 255, 151, 110, 2, 21, 73, 1, 6, 3, 230, 181, 0, 231, 89, 0, 116, 118, 61, 13, 10],
        type: "Buffer"
    },
    event: {
        number: 0x12,
        string: "location"
    },
    parsed: {
        cell_id: 59225,
        course: 329,
        datetime: "2017-07-20T03:54:42.000Z",
        east_longitude: true,
        error_check: 30269,
        gps_positioned: true,
        lac: 59061,
        lat: 49.076382,
        lon: 9.305803,
        mcc: 262,
        mnc: 3,
        north_latitude: true,
        real_time_gps: false,
        satellites: 12,
        satellitesActive: 10,
        serial_number: 116,
        speed: 2,
        speed_unit: "km/h"
    },
    respondToClient: false,
    responseMsg: null
}

const locationDouble = new Buffer.from('78781f1211071403362aca0543ec4f00ff976e021549010603e6b500e7590074763d0d0a78781f1211072403362aca0543ec4f00ff976e021549010603e6b500e7590074763d0d0a', 'hex')
const locationTripple = new Buffer.from('78781f1211071403362aca0543ec4f00ff976e021549010603e6b500e7590074763d0d0a78781f1211072403362aca0543ec4f00ff976e021549010603e6b500e7590074763d0d0a78781f1211073403362aca0543ec4f00ff976e021549010603e6b500e7590074763d0d0a', 'hex')
const locationQuad = new Buffer.from('78781f1211071403362aca0543ec4f00ff976e021549010603e6b500e7590074763d0d0a78781f1211072403362aca0543ec4f00ff976e021549010603e6b500e7590074763d0d0a78780a13400504000000153dc20d0a78781f1211073403362aca0543ec4f00ff976e021549010603e6b500e7590074763d0d0a', 'hex')

const unknown = new Buffer.from('70780d01012345678901234500018cdd0d0a', 'hex')

test('Login Test', () => {
    var gt06 = new Gt06();
    gt06.parse(login);

    expect(gt06.event.number).toBe(loginResult.event.number);
    expect(gt06.event.string).toBe(loginResult.event.string);
    expect(gt06.imei).toBe(loginResult.parsed.imei);
    expect(gt06.expectsResponse).toBe(loginResult.respondToClient);
    expect(gt06.responseMsg).toStrictEqual(loginResult.responseMsg);
});

test('Status/Heartbeat Test', () => {
    var gt06 = new Gt06();
    gt06.parse(status);
    expect(gt06.event.number).toBe(statusResult.event.number);
    expect(gt06.event.string).toBe(statusResult.event.string);
    expect(gt06.terminalInfo.alarmType).toBe(statusResult.parsed.terminalInfo.alarmType);
    expect(gt06.terminalInfo.charging).toBe(statusResult.parsed.terminalInfo.charging);
    expect(gt06.terminalInfo.gpsTracking).toBe(statusResult.parsed.terminalInfo.gpsTracking);
    expect(gt06.terminalInfo.ignition).toBe(statusResult.parsed.terminalInfo.ignition);
    expect(gt06.terminalInfo.relayState).toBe(statusResult.parsed.terminalInfo.relayState);
    expect(gt06.terminalInfo.status).toBe(statusResult.parsed.terminalInfo.status);
    expect(gt06.gsmSigStrength).toBe(statusResult.parsed.gsmSigStrength);
    expect(gt06.voltageLevel).toBe(statusResult.parsed.voltageLevel);
    expect(gt06.responseMsg).toStrictEqual(statusResult.responseMsg);
});

test('Location Test', () => {
    var gt06 = new Gt06();
    gt06.parse(location);
    expect(gt06.event.number).toBe(locationResult.event.number);
    expect(gt06.event.string).toBe(locationResult.event.string);
    expect(gt06.course).toStrictEqual(locationResult.parsed.course);
    expect(gt06.lat).toStrictEqual(locationResult.parsed.lat);
    expect(gt06.lon).toStrictEqual(locationResult.parsed.lon);
    expect(gt06.responseMsg).toBeUndefined();
});

test('Unknown Message Test', () => {
    var gt06 = new Gt06();
    try {
        gt06.parse(unknown);
    } catch (e) {
        expect(e).toEqual({
            error: 'unknown message header',
            msg: unknown
        });
    }
});

test('IMEI Storage Test', () => {
    var gt06 = new Gt06();
    gt06.parse(login);
    expect(gt06.imei).toBe(loginResult.parsed.imei);
    gt06.parse(location);
    expect(gt06.lat).toStrictEqual(locationResult.parsed.lat);
    expect(gt06.lon).toStrictEqual(locationResult.parsed.lon);
    expect(gt06.imei).toStrictEqual(loginResult.parsed.imei);
});

test('Multiple Messages in RawBuffer Test', () => {
    var gt06 = new Gt06();
    gt06.parse(location);
    expect(gt06.msgBufferRaw.length).toBe(1);
    gt06.parse(locationDouble);
    expect(gt06.msgBufferRaw.length).toBe(2);
    gt06.parse(locationTripple);
    expect(gt06.msgBufferRaw.length).toBe(3);
    gt06.parse(locationQuad);
    expect(gt06.msgBufferRaw.length).toBe(4);
});

test('Multiple Messages in MsgBuffer Test', () => {
    var gt06 = new Gt06();
    gt06.parse(location);
    expect(gt06.msgBufferRaw.length).toBe(1);
    gt06.parse(locationDouble);
    gt06.parse(locationTripple);
    gt06.parse(locationQuad);
    expect(gt06.msgBuffer.length).toBe(10);
    gt06.clearMsgBuffer();
    expect(gt06.msgBuffer.length).toBe(0);
});
