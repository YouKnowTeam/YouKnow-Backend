/**
 * Created by ChenLetian on 18/6/15.
 */
let expect = require('chai').expect;
let request = require('superagent');
let domain = "http://162.105.175.115:4000";
var token;

describe('登陆相关测试', function() {
    it('登陆', function (done) {
        request
            .post(domain + "/Login")
            .type('form')
            .send({userid: "PKUer", passwd: "haha"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res.body.code).to.equal(0);
                expect(res.body.msg).to.be.a("string");
                expect(res.body.token).to.be.a("string");
                token = res.body.token;
                done();
            });
    });
});

describe('消息源相关测试', function() {
    it('获取所有的消息列表及订阅情况', function (done) {
        request
            .get(domain + "/GetAllMessageSource")
            .query({token: token})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res.body.code).to.equal(0);
                expect(res.body.msg).to.be.a("string");
                expect(res.body.data[0].SrcID).to.be.a("string");
                expect(res.body.data[0].SrcDesc).to.be.a("string");
                expect(res.body.data[0].URL).to.be.a("string");
                expect(res.body.data[0].flag).to.be.a("number");
                done();
            });
    });
    it('取消订阅北大树洞', function (done) {
        request
            .post(domain + "/UnsubscribeMessageSource")
            .type('form')
            .send({token: token, source_id: "PKU tree hole"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res.body.code).to.equal(0);
                expect(res.body.msg).to.be.a("string");
                done();
            });
    });
    it('订阅北大树洞', function (done) {
        request
            .post(domain + "/SubscribeMessageSource")
            .type('form')
            .send({token: token, source_id: "PKU tree hole"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res.body.code).to.equal(0);
                expect(res.body.msg).to.be.a("string");
                done();
            });
    });
});

describe('消息相关测试', function() {
    it('获取所有订阅的消息', function (done) {
        request
            .get(domain + "/GetAllSubscribedMessages")
            .query({token: token})
            .query({msg_id: -1})
            .query({num: 10})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res.body.code).to.equal(0);
                expect(res.body.msg).to.be.a("string");
                expect(res.body.data[0].Brief).to.be.a("string");
                expect(res.body.data[0].MsgID).to.be.a("number");
                expect(res.body.data[0].SrcID).to.be.a("string");
                expect(res.body.data[0].Timestamp).to.be.a("string");
                done();
            });
    });
    it('获取一条消息的详细', function (done) {
        request
            .get(domain + "/GetMessageDetail")
            .query({token: token})
            .query({msg_id: 426600})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res.body.code).to.equal(0);
                expect(res.body.msg).to.be.a("string");
                expect(res.body.data[0].Detail).to.be.a("string");
                expect(res.body.data[0].MsgID).to.be.a("number");
                expect(res.body.data[0].SrcID).to.be.a("string");
                expect(res.body.data[0].Timestamp).to.be.a("string");
                done();
            });
    });
});