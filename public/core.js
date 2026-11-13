export function splitCents(amountCents, participantIds) {
  if (!Number.isSafeInteger(amountCents) || amountCents <= 0) throw new Error('金额必须是正整数分');
  if (!Array.isArray(participantIds) || !participantIds.length || new Set(participantIds).size !== participantIds.length) throw new Error('请选择不重复的分摊成员');
  const base = Math.floor(amountCents / participantIds.length);
  const remainder = amountCents % participantIds.length;
  return Object.fromEntries(participantIds.map((id, i) => [id, base + (i < remainder ? 1 : 0)]));
}

export function personalBalance(bills, memberId) {
  let owe = 0, owed = 0;
  for (const bill of bills) {
    const shares = splitCents(bill.amountCents, bill.participantIds);
    if (bill.payerId === memberId) {
      for (const id of bill.participantIds) if (id !== memberId && !bill.settledIds.includes(id)) owed += shares[id];
    } else if (shares[memberId] !== undefined && !bill.settledIds.includes(memberId)) owe += shares[memberId];
  }
  return { owe, owed, net: owed - owe };
}

export function money(cents) { return (cents / 100).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function offsetDate(days) { const date = new Date(); date.setDate(date.getDate() + days); return localDate(date); }
export function createDemo() {
  return {
    schemaVersion: 1,
    currentMemberId: 'lin',
    household: { id: 'sunny-home', name: '向阳小屋', subtitle: '四个人，一起把日子过好', createdAt: offsetDate(-83) },
    members: [
      { id: 'lin', name: '小林', avatar: '林', color: 'sage', room: '朝南主卧', tagline: '咖啡和植物爱好者' },
      { id: 'wang', name: '小王', avatar: '王', color: 'peach', room: '阳光次卧', tagline: '小家的大厨担当' },
      { id: 'li', name: '小李', avatar: '李', color: 'lavender', room: '安静次卧', tagline: '整洁是生活的仪式感' },
      { id: 'zhang', name: '小张', avatar: '张', color: 'blue', room: '窗边小屋', tagline: '负责把快乐带回家' }
    ],
    bills: [
      { id: 'b1', title: '本月水电费', amountCents: 36800, category: '水电燃气', payerId: 'wang', participantIds: ['lin','wang','li','zhang'], settledIds: ['li'], date: offsetDate(-1) },
      { id: 'b2', title: '周末一起吃火锅', amountCents: 25600, category: '一起吃饭', payerId: 'lin', participantIds: ['lin','wang','li','zhang'], settledIds: ['wang','li'], date: offsetDate(-3) },
      { id: 'b3', title: '厨房清洁用品', amountCents: 6800, category: '公共采购', payerId: 'zhang', participantIds: ['lin','wang','li','zhang'], settledIds: ['wang'], date: offsetDate(-4) },
      { id: 'b4', title: '本月宽带', amountCents: 12000, category: '网络通讯', payerId: 'li', participantIds: ['lin','wang','li','zhang'], settledIds: ['wang','zhang'], date: offsetDate(-6) }
    ],
    chores: [
      { id: 'c1', title: '让厨房焕然一新', area: '厨房', assigneeId: 'lin', date: offsetDate(0), done: false },
      { id: 'c2', title: '把垃圾带下楼', area: '公共区域', assigneeId: 'zhang', date: offsetDate(0), done: false },
      { id: 'c3', title: '给卫生间做个清洁', area: '卫生间', assigneeId: 'li', date: offsetDate(1), done: false },
      { id: 'c4', title: '客厅吸尘与拖地', area: '客厅', assigneeId: 'wang', date: offsetDate(2), done: false },
      { id: 'c5', title: '整理冰箱的小角落', area: '厨房', assigneeId: 'lin', date: offsetDate(3), done: false },
      { id: 'c6', title: '给阳台绿植浇水', area: '阳台', assigneeId: 'wang', date: offsetDate(-1), done: true }
    ],
    items: [
      { id: 'i1', name: '抽纸', category: '生活日用', quantity: 1, unit: '包', threshold: 2, icon: 'tissue' },
      { id: 'i2', name: '洗洁精', category: '厨房用品', quantity: 0, unit: '瓶', threshold: 1, icon: 'bottle' },
      { id: 'i3', name: '垃圾袋', category: '生活日用', quantity: 4, unit: '卷', threshold: 1, icon: 'bag' },
      { id: 'i4', name: '洗衣液', category: '清洁用品', quantity: 2, unit: '瓶', threshold: 1, icon: 'bottle' },
      { id: 'i5', name: '保鲜袋', category: '厨房用品', quantity: 3, unit: '盒', threshold: 1, icon: 'box' },
      { id: 'i6', name: '洗手液', category: '清洁用品', quantity: 2, unit: '瓶', threshold: 1, icon: 'bottle' }
    ],
    agreements: [
      { id: 'a1', title: '给彼此一个安静的夜晚', content: '晚上 23:00 至次日 8:00，公共区域降低音量；有朋友来访，提前在群里打个招呼。', confirmedIds: ['lin','wang','li','zhang'], version: 1 },
      { id: 'a2', title: '用完厨房，顺手整理', content: '做饭后洗好自己的锅碗，擦净灶台；冰箱内的个人食材标上名字，一起维护干净的小厨房。', confirmedIds: ['wang','li','zhang'], version: 1 },
      { id: 'a3', title: '公共支出，透明一点', content: '公共采购先和大家商量，记下用途和金额；每月底一起核对账单，及时确认结算。', confirmedIds: ['lin','wang','li','zhang'], version: 1 }
    ],
    activities: [
      { id: 'd1', text: '小王记录了「本月水电费」', time: offsetDate(-1) + 'T18:30:00', icon: 'wallet' },
      { id: 'd2', text: '小王完成了阳台绿植浇水', time: offsetDate(-1) + 'T10:20:00', icon: 'sparkles' },
      { id: 'd3', text: '小张补充了 4 卷垃圾袋', time: offsetDate(-2) + 'T19:15:00', icon: 'box' }
    ]
  };
}
