import should from 'should'
import Module from '../../src/api/module/model'

describe('Model Module', function() {
  before(function(done) {
    Module.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Module.remove().exec().then(function() {
      done();
    });
  });

  it('初始时模块数为0', function(done) {
    Module.find({}, function(err, modules) {
      modules.should.have.length(0);
      done();
    });
  });

  it('保存模块名为空的模块时应该失败', function(done) {
    var moduleNameEmpty = new Module({
      name: '',
      href: 'http://www.baidu.com',
      color: 'red'
    });

    moduleNameEmpty.save(function(err) {
      should.exist(err);
      done();
    })
  });

  it('保存一个已经被使用的模块名时应该失败', function (done) {
    var name = '时光轴';

    var module = new Module({
      name: name,
      color: 'red',
      href: 'wwww'
    });

    var module2 = new Module({
      name: name,
      color: 'green',
      href: 'www'
    });

    module.save(function() {
      module2.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('保存链接为空的模块时应该失败', function(done) {
    var moduleHrefEmpty = new Module({
      name: '时光轴',
      href: '',
      color: 'red'
    });

    moduleHrefEmpty.save(function(err) {
      should.exist(err);
      done();
    })
  });

  it('保存颜色为空的模块时应该失败', function(done) {
    var moduleColorEmpty = new Module({
      name: '时光轴',
      href: 'http://www.baidu.com',
      color: ''
    });

    moduleColorEmpty.save(function(err) {
      should.exist(err);
      done();
    })
  });

  it('保存一个合法的模块时应该成功', function (done) {
    var module = new Module({
      name: '时光轴',
      href: 'http://www.baidu.com',
      color: 'red'
    });

    module.save(function(err, result) {
      should.not.exist(err);
      should.exist(result);
      done();
    });
  });

});
