/**
 * Created by pengshuo on 17/6/12.
 */
import {
  findPathInTree,
  formatMoney,
  accAdd,
  trans2arr
} from "../../src/utils/helper";


let tree1 = [
  {
    "children": [
      {
        "children": [
          {
            "label": "深圳桂芳园",
            "value": "7e3fa4d0-255f-11e7-bc51-005056905ead",
            "children": [
              {
                "label": "深圳桂芳园下属1",
                "value": "7e3fa4d0-255f-11e7-bc51-005056904ead"
              }
            ],

          }
        ],
        "label": "深圳分公司",
        "value": "7e3f8b08-255f-11e7-bc51-005056905ead"
      },
    ],
    "label": "佳兆业物业集团1",
    "value": "7e36b3a2-255f-11e7-bc51-005056905ead"
  },
]

let tree2 = [
  {
    "children": [
      {
        "children": [
          {
            "label": "深圳桂芳园",
            "key": "7e3fa4d0-255f-11e7-bc51-005056905ead",
            "children": [
              {
                "label": "深圳桂芳园下属1",
                "key": "7e3fa4d0-255f-11e7-bc51-005056904ead"
              }
            ],

          }
        ],
        "label": "深圳分公司",
        "key": "7e3f8b08-255f-11e7-bc51-005056905ead"
      },
    ],
    "label": "佳兆业物业集团1",
    "key": "7e36b3a2-255f-11e7-bc51-005056905ead"
  },
];

let twoDmObject = [{
  "code": "101",
  "id": "8f99c5d7-2554-11e7-8bf5-a45e60ba345d",
  "is_bottom": false,
  "name": "佳兆业物业集团",
  "range": {
    "agency_fee_amount": 100,
    "employee_fee_amount": 0,
    "invest_annual_amount": 0
  },
  "yesterday": {
    "active_customer_cnt": 0,
    "agency_fee_amount": 100,
    "child_deep": 0,
    "customer_cnt": 2,
    "employee_cnt": 0,
    "employee_fee_amount": 0,
    "leaf_cnt": 0
  }
}, {
  "code": "101",
  "id": "8f99c5d7-2554-11e7-8bf5-a45e60ba345d",
  "is_bottom": false,
  "name": "佳兆业物业集团",
  "range": {
    "agency_fee_amount": 100,
    "employee_fee_amount": 0,
    "invest_annual_amount": 0
  },
  "yesterday": {
    "active_customer_cnt": 0,
    "agency_fee_amount": 100,
    "child_deep": 0,
    "customer_cnt": 2,
    "employee_cnt": 0,
    "employee_fee_amount": 0,
    "leaf_cnt": 0
  }
}];

let oneDmObject = [{
  code: "101",
  id: "8f99c5d7-2554-11e7-8bf5-a45e60ba345d",
  is_bottom: false,
  name: "佳兆业物业集团",
  range_agency_fee_amount: 100,
  range_employee_fee_amount: 0,
  range_invest_annual_amount: 0,
  yesterday_active_customer_cnt: 0,
  yesterday_agency_fee_amount: 100,
  yesterday_child_deep: 0,
  yesterday_customer_cnt: 2,
  yesterday_employee_cnt: 0,
  yesterday_employee_fee_amount: 0,
  yesterday_leaf_cnt: 0
},{
  code: "101",
  id: "8f99c5d7-2554-11e7-8bf5-a45e60ba345d",
  is_bottom: false,
  name: "佳兆业物业集团",
  range_agency_fee_amount: 100,
  range_employee_fee_amount: 0,
  range_invest_annual_amount: 0,
  yesterday_active_customer_cnt: 0,
  yesterday_agency_fee_amount: 100,
  yesterday_child_deep: 0,
  yesterday_customer_cnt: 2,
  yesterday_employee_cnt: 0,
  yesterday_employee_fee_amount: 0,
  yesterday_leaf_cnt: 0
}]

describe("helper", function () {

  describe("findPathInTree", function () {

    it("should return correct path with props value in 1 level", function () {
      expect(findPathInTree("7e36b3a2-255f-11e7-bc51-005056905ead", tree1, "value")).toEqual(["7e36b3a2-255f-11e7-bc51-005056905ead"]);
    })

    it("should return correct path with props value in 2 level", function () {
      expect(findPathInTree("7e3f8b08-255f-11e7-bc51-005056905ead", tree1, "value")).toEqual(["7e36b3a2-255f-11e7-bc51-005056905ead", "7e3f8b08-255f-11e7-bc51-005056905ead"]);
    })

    it("should return correct path with props value in 4 level", function () {
      expect(findPathInTree("7e3fa4d0-255f-11e7-bc51-005056904ead", tree1, "value")).toEqual(["7e36b3a2-255f-11e7-bc51-005056905ead", "7e3f8b08-255f-11e7-bc51-005056905ead", "7e3fa4d0-255f-11e7-bc51-005056905ead", "7e3fa4d0-255f-11e7-bc51-005056904ead"]);
    })

    it("should return correct path with props key in 1 level", function () {
      expect(findPathInTree("7e36b3a2-255f-11e7-bc51-005056905ead", tree2, "key")).toEqual(["7e36b3a2-255f-11e7-bc51-005056905ead"]);
    })

  });

  describe("hyphenHump ", function () {
    it("should change 'a-bb-ccc' to 'aBbCcc'", function () {
      expect("a-bb-ccc".hyphenToHump()).toEqual('aBbCcc')
    })
  })

  describe("humpToHyphen ", function () {
    it("should change 'aBbCcc' to 'a-bb-ccc'  ", function () {
      expect("aBbCcc".humpToHyphen()).toEqual('a-bb-ccc')
    })
  })

  describe("dateFormat ", function () {
    it("should be formatted like '06-13 22:41:49'   ", function () {
      expect(new Date(1497364909068).format("MM-dd hh:mm:ss")).toEqual("06-13 22:41:49")
    })
  })

  describe("trans2arr ", function () {
    it("should be transform to one-dimensional object  ", function () {
      expect(trans2arr(twoDmObject)).toEqual(oneDmObject)
    })
  })

  describe("formatMoney ", function () {
    it("should be formatted like '123,4.46'  ", function () {
      expect(formatMoney(1234.45678)).toEqual("1,234.46")
    })

    it("should be formatted like '-123,4.46'  ", function () {
      expect(formatMoney(-1234.45678)).toEqual("-1,234.46")
    })
  })

  describe("accAdd ", function () {
    it("should be exact ", function () {
      expect(accAdd(0.1,0.2)).toEqual(0.3)
    })
  })


});
