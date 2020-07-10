// TODO: 데이터베이스 반정규화(전체 가구 소비전력 합계)
var express = require('express');
var router = express.Router();
const assert = require('assert');

var power = require("../model/powerDAO");       // 모델 불러오기

router.get('/', function(req, res, next) {
    power.find(function(err, result) {
        assert.equal(err, null);
        console.log('소비전력 데이터 추출 완료!');
        
        let sum = 0;
        let relayNumber;
        let operateRelay;

        for (const i in result) {               // 가구별 소비전력의 합 구하기
            sum += Number(result[i].powerConsumption);
        }

        const avg = sum/result.length;

        const max = Math.max.apply(Math, result.map(function(max) {         // 객체 배열 내 최대 값 구하기
            return max.powerConsumption; 
        }));

        // if(max > ???) {
        //     relayNumber = 1;
        //     operateRelay = true;
        // }

        // res.send( {'relayNumber': relayNumber , 'operateRelay': true} );
        res.send( {'relayNumber': 1 , 'operateRelay': true} );
    })
});

module.exports = router;
