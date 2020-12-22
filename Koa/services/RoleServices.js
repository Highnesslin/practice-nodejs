function createRule(handler) {
  return {
    next: null,
    handle(args) {
      const ans = handler(args);
      if (ans) {
        return ans;
      } else if (this.next) {
        this.next.handle(args);
      }
    },
    setNext(rule) {
      this.next = rule;
    },
  };
}

const rule1 = createRule(score => {
  if (score >= 10) return false;
  // ... 1
  return true;
});

const rule2 = createRule(score => {
  if (score >= 100) return false;
  // ... 2
  return true;
});

const rule3 = createRule(score => {
  if (score >= 1000) return false;
  // ... 3
  return true;
});

rule1.setNext(rule2);
rule2.setNext(rule3);

const res = rule1.handle(8);
console.log('res', res);
