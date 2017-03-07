'use strict';

const expressionPattern = /\{\{(.*?)}}/;
const expressionPatternGlobal = /\{\{(.*?)}}/g;

class Expressions {

  static getFirstExpression(text) {
    let matches = text.match(expressionPattern);
    return matches ? matches[1] : null;
  }

  static hasExpression(text) {
    return text.match(expressionPattern) !== null;
  }

  static getExpressionCount(text) {
    let matches = text.match(expressionPatternGlobal);
    return matches ? matches.length : 0;
  }

  static extractNameFromRepeater(repeaterExpression) {
    let variableAndExpression = Expressions.extractExactRepeater(repeaterExpression).split(' in ');
    return variableAndExpression.length == 1 ? '' : variableAndExpression[1].trim();
  }

  static extractExactRepeater(repeaterExpression) {
    return repeaterExpression.split(' track by ')[0].split(' as ')[0].split('|')[0].split('=')[0].trim();
  }

  static extractNameFromNgFor(ngForExpression) {
    let ofSplit = ngForExpression.split(';')[0].split('|')[0].split(' of ');
    return ofSplit.length == 1 ? '' : ofSplit[1].trim();
  }

  static replaceIndexBindingWithFunctionParameter(text, repeaterCount) {
    if (text.indexOf('{{$index}}') > -1) {
      return '`' + text.replace(/\{\{\$index}}/, '\${rowIndex' + repeaterCount + '}') + '`';
    } else {
      return text;
    }
  }

  static extractControllerAs(controllerExpression) {
    let asSplit = controllerExpression.split(' as ');
    return asSplit.length == 1 ? '' : asSplit[1].trim();
  }

  static allowIndexExpressionOrNoExpressions(attributeValue) {
    let expressionCount = Expressions.getExpressionCount(attributeValue);
    return expressionCount == 0 ||
    (expressionCount == 1 && Expressions.getFirstExpression(attributeValue) === '$index') ? attributeValue : null;
  }

}

module.exports = Expressions;