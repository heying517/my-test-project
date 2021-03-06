const mock = {
  "relationId": 1,
  "versionId": 87,
  "relationName": "4",
  "chnname": "4",
  "remark": "4",
  "modules": [{
    "name": "4",
    "chnname": null,
    "entities": [{
      "headers": [{
        "fieldName": "name",
        "relationNoShow": false
      }, {
        "fieldName": "type",
        "relationNoShow": false
      }, {
        "fieldName": "remark",
        "relationNoShow": false
      }, {
        "fieldName": "dataRange",
        "relationNoShow": false
      }, {
        "fieldName": "pk",
        "relationNoShow": false
      }, {
        "fieldName": "notNull",
        "relationNoShow": false
      }, {
        "fieldName": "autoIncrement",
        "relationNoShow": false
      }, {
        "fieldName": "defaultValue",
        "relationNoShow": false
      }, {
        "fieldName": "relationNoShow",
        "relationNoShow": true
      }],
      "instanceCode": "10.5.91.22_sddb_oracle",
      "nameTemplate": "{code}[{name}]",
      "chnname": "",
      "instanceType": "oracle",
      "index": [],
      "fields": [{
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "RECID",
        "remark": "",
        "pk": false,
        "type": "NUMBER",
        "relationNoShow": true
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "STAMP",
        "remark": "",
        "pk": false,
        "type": "NUMBER",
        "relationNoShow": true
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "FILE#",
        "remark": "",
        "pk": false,
        "type": "NUMBER",
        "relationNoShow": true
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "OFFLINE_CHANGE#",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "ONLINE_CHANGE#",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "ONLINE_TIME",
        "remark": "",
        "pk": false,
        "type": "DATE"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "RESETLOGS_CHANGE#",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "RESETLOGS_TIME",
        "remark": "",
        "pk": false,
        "type": "DATE"
      }, {
        "notNull": true,
        "chnname": "",
        "name": "name",
        "remark": "",
        "type": "varchar"
      }, {
        "chnname": "",
        "name": "age",
        "remark": "",
        "type": "int"
      }],
      "title": "V_$OFFLINE_RANGE",
      "tableSchema": "SYS"
    }, {
      "headers": [{
        "fieldName": "name",
        "relationNoShow": false
      }, {
        "fieldName": "type",
        "relationNoShow": false
      }, {
        "fieldName": "remark",
        "relationNoShow": false
      }, {
        "fieldName": "dataRange",
        "relationNoShow": false
      }, {
        "fieldName": "pk",
        "relationNoShow": false
      }, {
        "fieldName": "notNull",
        "relationNoShow": false
      }, {
        "fieldName": "autoIncrement",
        "relationNoShow": false
      }, {
        "fieldName": "defaultValue",
        "relationNoShow": false
      }, {
        "fieldName": "relationNoShow",
        "relationNoShow": true
      }],
      "instanceCode": "10.1.90.152_E-bank_zjcgdb_oracle",
      "nameTemplate": "{code}[{name}]",
      "chnname": "",
      "instanceType": "oracle",
      "index": [],
      "fields": [{
        "notNull": false,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "GRANTEE",
        "remark": "",
        "pk": false,
        "type": "VARCHAR2(256 BYTE)",
        "relationNoShow": true
      }, {
        "notNull": false,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "PRIV_NAME",
        "remark": "",
        "pk": false,
        "type": "VARCHAR2(30 BYTE)",
        "relationNoShow": true
      }, {
        "notNull": false,
        "chnname": "",
        "defaultValue": "'0000000000000000'",
        "autoIncrement": false,
        "name": "GUID",
        "remark": "",
        "pk": false,
        "type": "RAW(16)"
      }, {
        "notNull": false,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "GRANTEE_IS_ROLE",
        "remark": "",
        "pk": false,
        "type": "NUMBER(1)"
      }, {
        "notNull": false,
        "chnname": "",
        "defaultValue": "1",
        "autoIncrement": false,
        "name": "DIRECT_GRANT",
        "remark": "",
        "pk": false,
        "type": "NUMBER(1)"
      }, {
        "notNull": false,
        "chnname": "",
        "defaultValue": "0",
        "autoIncrement": false,
        "name": "REF_COUNT",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }],
      "title": "MGMT_PRIV_GRANTS",
      "tableSchema": "SYSMAN"
    }, {
      "headers": [{
        "fieldName": "name",
        "relationNoShow": false
      }, {
        "fieldName": "type",
        "relationNoShow": false
      }, {
        "fieldName": "remark",
        "relationNoShow": false
      }, {
        "fieldName": "dataRange",
        "relationNoShow": false
      }, {
        "fieldName": "pk",
        "relationNoShow": false
      }, {
        "fieldName": "notNull",
        "relationNoShow": false
      }, {
        "fieldName": "autoIncrement",
        "relationNoShow": false
      }, {
        "fieldName": "defaultValue",
        "relationNoShow": false
      }, {
        "fieldName": "relationNoShow",
        "relationNoShow": true
      }],
      "instanceCode": "10.1.90.22_E-bank_hxcgdb_oracle",
      "nameTemplate": "{code}[{name}]",
      "chnname": "",
      "instanceType": "oracle",
      "index": [],
      "fields": [{
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "ADDR",
        "remark": "",
        "pk": false,
        "type": "RAW(8)",
        "relationNoShow": true
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "INDX",
        "remark": "",
        "pk": false,
        "type": "NUMBER",
        "relationNoShow": true
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "INST_ID",
        "remark": "",
        "pk": false,
        "type": "NUMBER",
        "relationNoShow": true
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "OBJNO",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "QUEUE_ID",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "MSGID",
        "remark": "",
        "pk": false,
        "type": "RAW(16)"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "CORRID",
        "remark": "",
        "pk": false,
        "type": "VARCHAR2(30 BYTE)"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "SEQUENCE_NUM",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "MSG_NUM",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "STATE",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "PRIORITY",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "EXPIRATION",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "ENQ_TIME",
        "remark": "",
        "pk": false,
        "type": "TIMESTAMP(6)"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "ENQ_UID",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "ENQ_USER_NAME",
        "remark": "",
        "pk": false,
        "type": "VARCHAR2(30 BYTE)"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "RETRY_COUNT",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "SENDER_NAME",
        "remark": "",
        "pk": false,
        "type": "VARCHAR2(30 BYTE)"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "SENDER_ADDRESS",
        "remark": "",
        "pk": false,
        "type": "VARCHAR2(1024 BYTE)"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "SENDER_PROTOCOL",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "DEQUEUE_MSGID",
        "remark": "",
        "pk": false,
        "type": "RAW(16)"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "SRCSEQUENCE_NUM",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "SUBSCRIBER_ID",
        "remark": "",
        "pk": false,
        "type": "NUMBER"
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "EXCEPTIONQ_SCHEMA",
        "remark": "",
        "pk": false,
        "type": "VARCHAR2(30 BYTE)",
        "relationNoShow": true
      }, {
        "notNull": true,
        "chnname": "",
        "defaultValue": "",
        "autoIncrement": false,
        "name": "EXCEPTIONQ_NAME",
        "remark": "",
        "pk": false,
        "type": "VARCHAR2(30 BYTE)",
        "relationNoShow": true
      }],
      "title": "QT14121_BUFFER",
      "tableSchema": "SYS"
    }],
    "graphCanvas": {
      "nodes": [{
        "shape": "table",
        "x": 650,
        "moduleName": false,
        "y": 80,
        "id": "6a62716e",
        "title": "MGMT_PRIV_GRANTS"
      }, {
        "shape": "table",
        "x": 660,
        "moduleName": false,
        "y": 210,
        "id": "b4e73d0f",
        "title": "QT14121_BUFFER"
      }, {
        "shape": "table",
        "x": 150,
        "moduleName": false,
        "y": 350,
        "id": "ce1ad1a3",
        "title": "V_$OFFLINE_RANGE"
      }],
      "edges": [{
        "sourceAnchor": 1,
        "targetAnchor": 0,
        "shape": "erdRelation",
        "id": "dcb34361",
        "source": "ce1ad1a3",
        "controlPoints": [{
          "x": 272.8818359375,
          "y": 342.4166666666667
        }, {
          "x": 505.169921875,
          "y": 82.53571428571428
        }],
        "target": "6a62716e",
        "relation": "0,n:1"
      }, {
        "sourceAnchor": 3,
        "targetAnchor": 6,
        "shape": "erdRelation",
        "id": "be491ec9",
        "source": "ce1ad1a3",
        "controlPoints": [{
          "x": 272.8818359375,
          "y": 362.6388888888889
        }, {
          "x": 474.7177734375,
          "y": 242.75
        }],
        "target": "b4e73d0f",
        "relation": "0,n:1"
      }]
    },
    "associations": [{
      "from": {
        "field": "RECID",
        "entity": "V_$OFFLINE_RANGE"
      },
      "to": {
        "field": "GRANTEE",
        "entity": "MGMT_PRIV_GRANTS"
      },
      "relation": "0,n:1"
    }, {
      "from": {
        "field": "STAMP",
        "entity": "V_$OFFLINE_RANGE"
      },
      "to": {
        "field": "EXCEPTIONQ_SCHEMA",
        "entity": "QT14121_BUFFER"
      },
      "relation": "0,n:1"
    }]
  }],
  "isLock": "sysadmin",
  "ower": "sysadmin",
  "versionName": "name",
  "version": "v1.4",
  "description": "v1.4",
  "modifyUser": "sysadmin"
}

const data = {
  nodes: [],
};

const arr = mock.modules[0].graphCanvas.nodes;
const {
  entities
} = mock.modules[0];
for (let i = 0; i < arr.length; i += 1) {
  for (let j = 0; j < entities.length; j += 1) {
    if (entities[j].title === arr[i].title) {
      const item = {
        x: arr[i].x,
        y: arr[i].y,
        id: arr[i].id,
        title: arr[i].title,
        panels: entities[j].fields.filter(v => v.relationNoShow),
      };
      data.nodes.push(item);
    }
  }
}

export default data;
