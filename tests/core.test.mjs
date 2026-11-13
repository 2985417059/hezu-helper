import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitCents, personalBalance, createDemo } from '../public/core.js';
test('不能整除时仍精确到分，分摊总额等于原金额', () => {
  const shares = splitCents(10000, ['a','b','c']);
  assert.deepEqual(shares, { a:3334, b:3333, c:3333 });
  assert.equal(Object.values(shares).reduce((a,b)=>a+b,0),10000);
});
test('垫付人也参与分摊时，不能向自己收款', () => {
  const bill = { amountCents: 12000, payerId:'a', participantIds:['a','b','c','d'], settledIds:[] };
  assert.deepEqual(personalBalance([bill],'a'), { owe:0, owed:9000, net:9000 });
  assert.equal(personalBalance([bill],'b').owe,3000);
});
test('付款人不参与分摊与部分结清都能正确计算', () => {
  const bill = { amountCents:10000, payerId:'a', participantIds:['b','c','d'], settledIds:['b'] };
  assert.equal(personalBalance([bill],'a').owed,6666);
  assert.equal(personalBalance([bill],'b').owe,0);
});
test('所有成员的净余额总和为零', () => {
  const demo = createDemo();
  assert.equal(demo.members.reduce((sum,m)=>sum+personalBalance(demo.bills,m.id).net,0),0);
});
test('拒绝无效金额与重复或空的参与成员', () => {
  for (const amount of [0,-1,1.5,NaN,Infinity]) assert.throws(()=>splitCents(amount,['a']));
  assert.throws(()=>splitCents(100,[]));
  assert.throws(()=>splitCents(100,['a','a']));
});
