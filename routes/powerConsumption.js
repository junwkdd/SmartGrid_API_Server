// TODO: 데이터베이스 반정규화 (예측 전기요금 등)
// TODO: 예측 전기요금 보내주기

var express = require('express');
var router = express.Router();
const assert = require('assert');

var power = require("../model/powerDAO");        // 모델 불러오기
var powerModel = new power();

router.post('/add', function(req, res, next) {
  const address = req.body.address;        // 사용가의 주소
  const powerConsumption = req.body.powerConsumption;          // 소비전력

  powerModel.address = address;
  powerModel.powerConsumption = powerConsumption;

  powerModel.save(function(err, result) {
    assert.equal(err, null);        // err 가 null 이면 pass!
    console.log('소비전력 데이터 추가 완료!');
    res.send({ success: true });
  });
});

router.post('/get', function(req, res, next) {
  const address = req.body.address;

  power.find({ 'address': address }, function(err, result) {
    assert.equal(err, null);
    console.log('사용자 소비전력 데이터 추출 완료');
    res.send( {'powerConsumption': result[0].powerConsumption} );
  })
});

module.exports = router;
