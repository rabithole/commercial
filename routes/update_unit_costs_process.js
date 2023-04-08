/* This module pull data from Shopify's inventoryItems endpoint to access unit cost for each product in DIG's inventory. The data is shaped for insertion into our api, then sent to our api for storage. */
let testArray = [{
    "shopify_id": "gid://shopify/ProductVariant/31527349846052",
    "sku": "111101",
    "unit_cost": "20.00"
},
{
    "shopify_id": "gid://shopify/ProductVariant/31527349878820",
    "sku": "100002",
    "unit_cost": "1000.99"
},
{
    "shopify_id": "gid://shopify/ProductVariant/31527349911588",
    "sku": "100010",
    "unit_cost": "20.51"
},{
    "shopify_id": "gid://shopify/ProductVariant/40433250369572",
    "sku": "720476",
    "unit_cost": "1865.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40449513619492",
    "sku": "720477",
    "unit_cost": "56.86"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40449515257892",
    "sku": "720478",
    "unit_cost": "19.36"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40449516797988",
    "sku": "720479",
    "unit_cost": "122.42"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40449517781028",
    "sku": "720480",
    "unit_cost": "183.59"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40452842979364",
    "sku": "720481",
    "unit_cost": "210.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40452848320548",
    "sku": "720482",
    "unit_cost": "720.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40456748269604",
    "sku": "720484",
    "unit_cost": "29.5"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40459866636324",
    "sku": "720485",
    "unit_cost": "85.34"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40459871846436",
    "sku": "6001262",
    "unit_cost": "46.95"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461827080228",
    "sku": "720486",
    "unit_cost": "28.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461831438372",
    "sku": "720487",
    "unit_cost": "45.5"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461834387492",
    "sku": "720488",
    "unit_cost": "84.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461836091428",
    "sku": "720489",
    "unit_cost": "330.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461836943396",
    "sku": "720490",
    "unit_cost": "780.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461837631524",
    "sku": "720491",
    "unit_cost": "1552.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40481752055844",
    "sku": "720492",
    "unit_cost": "25.37"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482664742948",
    "sku": "720493",
    "unit_cost": "37.23"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482667200548",
    "sku": "720494",
    "unit_cost": "56.87"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482667331620",
    "sku": "720495",
    "unit_cost": "97.31"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482667888676",
    "sku": "720496",
    "unit_cost": "299.99"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482668150820",
    "sku": "720497",
    "unit_cost": "11500.99"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40484142415908",
    "sku": "720498",
    "unit_cost": "258.77"
},
{
    "shopify_id": "gid://product_variant_test",
    "sku": "900000",
    "unit_cost": "500.00"
}]

let rawTestArray = [{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349846052",
            "sku": "900000",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "1000.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349878820",
            "sku": "100002",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "50.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349878820",
            "sku": "900022",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "1000.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349878820",
            "sku": "900055",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "1000000.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349878820",
            "sku": "800002",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "1000.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349878820",
            "sku": "900002",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "1.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349878820",
            "sku": "500002",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "20.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349878820",
            "sku": "400002",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "30.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349878820",
            "sku": "600002",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "10.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349878820",
            "sku": "900002",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "1000.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527349911588",
            "sku": "100010",
            "updatedAt": "2022-10-18T20:38:51Z"
        },
        "unitCost": {
            "amount": "100.00"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350075428",
            "sku": "100020",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "12.75"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350140964",
            "sku": "100030",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "17.52"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350173732",
            "sku": "100031",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "42.38"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350206500",
            "sku": "100040",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "14.67"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350239268",
            "sku": "100041",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "33.12"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350272036",
            "sku": "100050",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "14.67"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350304804",
            "sku": "100051",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "35.61"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350337572",
            "sku": "100080",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "0.39"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350370340",
            "sku": "100081",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "1.53"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350403108",
            "sku": "100082",
            "updatedAt": "2022-10-04T15:18:41Z"
        },
        "unitCost": {
            "amount": "1.8"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350435876",
            "sku": "100090",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "0.15"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350599716",
            "sku": "100110",
            "updatedAt": "2022-11-05T15:28:01Z"
        },
        "unitCost": {
            "amount": "3.3"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350632484",
            "sku": "100111",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "4.75"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527350665252",
            "sku": "100112",
            "updatedAt": "2022-11-05T15:28:55Z"
        },
        "unitCost": {
            "amount": "13.58"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527351091236",
            "sku": "100160",
            "updatedAt": "2022-10-18T18:09:21Z"
        },
        "unitCost": {
            "amount": "15.52"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527351124004",
            "sku": "100161",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "53.33"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527351255076",
            "sku": "100211",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "87.75"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527351287844",
            "sku": "100220",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "77.0"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527351320612",
            "sku": "100221",
            "updatedAt": "2022-10-17T16:03:20Z"
        },
        "unitCost": {
            "amount": "137.5"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527351353380",
            "sku": "100230",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "38.25"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352172580",
            "sku": "100280",
            "updatedAt": "2022-10-19T17:42:16Z"
        },
        "unitCost": {
            "amount": "3.95"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352205348",
            "sku": "100281",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "7.18"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352238116",
            "sku": "100282",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "22.33"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352270884",
            "sku": "100290",
            "updatedAt": "2022-10-19T17:42:17Z"
        },
        "unitCost": {
            "amount": "5.33"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352303652",
            "sku": "100291",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "9.68"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352336420",
            "sku": "100292",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "30.14"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352369188",
            "sku": "100300",
            "updatedAt": "2022-10-19T17:42:16Z"
        },
        "unitCost": {
            "amount": "3.95"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352598564",
            "sku": "100310",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "30.02"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352696868",
            "sku": "100320",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "13.91"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352795172",
            "sku": "100330",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "12.92"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352827940",
            "sku": "100331",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "23.48"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352860708",
            "sku": "100332",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "73.05"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352893476",
            "sku": "100340",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "25.88"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352926244",
            "sku": "100341",
            "updatedAt": "2022-10-04T15:18:42Z"
        },
        "unitCost": {
            "amount": "47.05"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352959012",
            "sku": "100342",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "146.43"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527352991780",
            "sku": "100350",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "25.88"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527353024548",
            "sku": "100351",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "47.05"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527353057316",
            "sku": "100352",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "146.43"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527353810980",
            "sku": "100370",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "15.65"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527353942052",
            "sku": "100380",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "8.78"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527353974820",
            "sku": "100381",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "15.94"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354007588",
            "sku": "100382",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "49.61"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354040356",
            "sku": "100390",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "9.98"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354171428",
            "sku": "100400",
            "updatedAt": "2022-11-05T16:43:17Z"
        },
        "unitCost": {
            "amount": "11.93"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354204196",
            "sku": "100401",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "21.67"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354236964",
            "sku": "100402",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "67.46"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354269732",
            "sku": "100403",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "147.58"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354433572",
            "sku": "100410",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "6.49"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354466340",
            "sku": "100411",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "11.81"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354499108",
            "sku": "100412",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "36.73"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354531876",
            "sku": "100413",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "79.93"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354564644",
            "sku": "100414",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "152.59"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354597412",
            "sku": "100420",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "7.09"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354630180",
            "sku": "100421",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "12.87"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354662948",
            "sku": "100422",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "40.77"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354695716",
            "sku": "100430",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "7.09"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354728484",
            "sku": "100431",
            "updatedAt": "2022-10-07T15:53:41Z"
        },
        "unitCost": {
            "amount": "12.87"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354761252",
            "sku": "100432",
            "updatedAt": "2022-10-04T15:18:43Z"
        },
        "unitCost": {
            "amount": "40.77"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354794020",
            "sku": "100440",
            "updatedAt": "2022-10-04T15:18:44Z"
        },
        "unitCost": {
            "amount": "9.68"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527354957860",
            "sku": "100490",
            "updatedAt": "2022-10-04T15:18:44Z"
        },
        "unitCost": {
            "amount": "43.24"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527355154468",
            "sku": "100520",
            "updatedAt": "2022-11-05T17:52:17Z"
        },
        "unitCost": {
            "amount": "13.8"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527355187236",
            "sku": "100530",
            "updatedAt": "2022-11-05T18:28:45Z"
        },
        "unitCost": {
            "amount": "15.0"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527355220004",
            "sku": "100540",
            "updatedAt": "2022-10-27T17:51:41Z"
        },
        "unitCost": {
            "amount": "22.82"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527355285540",
            "sku": null,
            "updatedAt": "2022-10-04T15:18:44Z"
        },
        "unitCost": {
            "amount": "18.2"
        }
    }
},
{
    "node": {
        "variant": {
            "id": "gid://shopify/ProductVariant/31527363608612",
            "sku": "100550",
            "updatedAt": "2022-10-04T15:18:44Z"
        },
        "unitCost": {
            "amount": "300000.00"
        }
    }
},]
// 282.87 Line 90
const axios = require('axios');
const fs = require('fs');

let hasNextPage = false;
let cursor = null;
let unitCosts = [];

// Queries unit_cost, sku and Shopify gid id's.
// Logs data to a json file in the root directory.
// The following processes will utlizie this json file.
// Json file will be overwritten if it already exists.
function getUnitCosts() {
    axios
        .post('http://localhost:5080/shopify_get_all_unit_costs', {firstProducts: 250, after: cursor})
        .then((response) => {
            hasNextPage = response.data.data.inventoryItems.pageInfo.hasNextPage;     
            cursor = JSON.stringify(response.data.data.inventoryItems.pageInfo.endCursor);
            // console.log('response inventory items', response.data.data.inventoryItems.edges)
            let unitCostsData = response.data.data.inventoryItems.edges;
            unitCosts.push(...unitCostsData)
            if(hasNextPage == true){
                console.log('Yes there is another page ---------------------------------------------------------------------------', hasNextPage)
                setTimeout(getUnitCosts, 10000);
                // console.log('unit costs', unitCosts)
            }else{
                console.log('There is not another page ---', hasNextPage)
                // console.log('Unit Costs array', unitCosts)
                fs.writeFile("routes/unitCost.json", JSON.stringify(unitCosts), function(err){
                    console.log('json file creation')
                })
                processJsonDataFromShopfiy(unitCosts);
                return 
            }
        })

    // processJsonDataFromShopfiy(rawTestArray);
}
// Be sure to start the Express server with npm start and not nodemon!!!!!!
getUnitCosts();
// ---------------------------------------------------------------------------------------------------------


// Shape data form Shopify raw query.
let parsingArray = [];
function processJsonDataFromShopfiy(costsData) {
    costsData.map((parsed) => {
        let nulling = parsed.node.unitCost;
        
        // nulling checks for an object set as null by Shopify.
        if(nulling == null){
            console.log('null');
        }else{
            parsingArray.push({
                shopify_id: parsed.node.variant.id,
                sku: parsed.node.variant.sku,
                unit_cost: parsed.node.unitCost.amount,
                updated_at: parsed.node.variant.updatedAt,
                created_at: parsed.node.variant.createdAt
            })
        }
    })
    console.log('array length', costsData.length)
    // console.log('parsed array', parsingArray)

    fs.writeFile("routes/shapedArray.json", JSON.stringify(parsingArray), function(err){
        console.log('json file creation')
    })

    // slowProcessCostsJsonFile(testArray);
    postUnitCostsToCommercialApi(parsingArray);
}
// processJsonDataFromShopfiy();
// -----------------------------------------------------------------------------------------------------------


// Post or put request to local commercial database
function postUnitCostsToCommercialApi(unitCostData){
    console.log('post unit controller')
    axios
        .post('http://localhost:5080/unit_costs_controller', unitCostData)
        .then((response) => {
            console.log('response', response.data)
        })
        .catch(err => {
            console.log('error', err)
        })
}
// postUnitCostsToCommercialApi()
// -------------------------------------------------------------------------------------------------

module.exports = getUnitCosts;