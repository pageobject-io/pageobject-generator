'use strict';

const expect = require('chai').expect;
const Expressions = require('../lib/expressions');

describe('Expressions', () => {
  it('should get first expression', () => {
    expect(Expressions.getFirstExpression('{{expression}}')).to.equal('expression');
    expect(Expressions.getFirstExpression('With {{expression}} text')).to.equal('expression');
    expect(Expressions.getFirstExpression('Multiple {{expression}} {{expression2}}')).to.equal('expression');
    expect(Expressions.getFirstExpression('{{expression}}{{expression2}}')).to.equal('expression');
    expect(Expressions.getFirstExpression('No expression')).to.be.null;
  });

  it('should detect expression', () => {
    expect(Expressions.hasExpression('{{expression}}')).to.be.true;
    expect(Expressions.hasExpression('With {{expression}} text')).to.be.true;
    expect(Expressions.hasExpression('Multiple {{expression}} {{expression2}}')).to.be.true;
    expect(Expressions.hasExpression('{{expression}}{{expression2}}')).to.be.true;
    expect(Expressions.hasExpression('No expression')).to.be.false;
  });

  it('should get expression count', () => {
    expect(Expressions.getExpressionCount('{{expression}}')).to.equal(1);
    expect(Expressions.getExpressionCount('With {{expression}} text')).to.equal(1);
    expect(Expressions.getExpressionCount('Multiple {{expression}} {{expression2}}')).to.equal(2);
    expect(Expressions.getExpressionCount('{{expression}}{{expression2}}')).to.equal(2);
    expect(Expressions.getExpressionCount('No expression')).to.equal(0);
  });

  it('should extract name from repeater', () => {
    expect(Expressions.extractNameFromRepeater('item in items')).to.equal('items');
    expect(Expressions.extractNameFromRepeater('album in artist.albums')).to.equal('artist.albums');
    expect(Expressions.extractNameFromRepeater('(name, age) in {\'adam\':10, \'amalie\':12}')).to.equal(
      '{\'adam\':10, \'amalie\':12}');
    expect(Expressions.extractNameFromRepeater('item in items track by $id(item)')).to.equal('items');
    expect(Expressions.extractNameFromRepeater('item in items | filter:searchText track by item.id')).to.equal('items');
    expect(Expressions.extractNameFromRepeater('item in items | filter:x as results')).to.equal('items');
    expect(Expressions.extractNameFromRepeater('item in items | filter : x | orderBy : order | limitTo : limit as results'))
      .to.equal('items');
    expect(Expressions.extractNameFromRepeater('no repeater')).to.equal('');
  });

  it('should extract name from ngFor', () => {
    expect(Expressions.extractNameFromNgFor('let item of items')).to.equal('items');
    expect(Expressions.extractNameFromNgFor('let album of artist.albums')).to.equal('artist.albums');
    expect(Expressions.extractNameFromNgFor('let item of items; trackBy: trackByFn')).to.equal('items');
    expect(Expressions.extractNameFromNgFor('let item of items | filter:searchText; trackBy: trackByFn')).to.equal('items');
    expect(Expressions.extractNameFromNgFor('let item of items; let i = index; trackBy: trackByFn')).to.equal('items');
    expect(Expressions.extractNameFromNgFor('let item of items; let i = index; let odd = odd')).to.equal('items');
    expect(Expressions.extractNameFromNgFor('let item in items; let i = index; let odd = odd')).to.equal('');
  });

  it('should replace index binding with function parameter', () => {
    expect(Expressions.replaceIndexBindingWithFunctionParameter('{{$index}}', 0)).to.equal('`${rowIndex0}`');
    expect(Expressions.replaceIndexBindingWithFunctionParameter('In the {{$index}} middle', 1)).to.equal(
      '`In the ${rowIndex1} middle`');
    expect(Expressions.replaceIndexBindingWithFunctionParameter('{{$index}} starts with', 1)).to.equal(
      '`${rowIndex1} starts with`');
    expect(Expressions.replaceIndexBindingWithFunctionParameter('ends with {{$index}}', 1)).to.equal(
      '`ends with ${rowIndex1}`');
    expect(Expressions.replaceIndexBindingWithFunctionParameter('no expression', 1)).to.equal('no expression');
  });

  it('should extract controller as', () => {
    expect(Expressions.extractControllerAs('SettingsController1 as settings')).to.equal('settings');
    expect(Expressions.extractControllerAs('SettingsController')).to.equal('');
  });

  it('should allow index expression or no expressions', () => {
    expect(Expressions.allowIndexExpressionOrNoExpressions('value{{$index}}')).to.equal('value{{$index}}');
    expect(Expressions.allowIndexExpressionOrNoExpressions('value{{test}}')).to.be.null;
    expect(Expressions.allowIndexExpressionOrNoExpressions('value')).to.equal('value');
  });

});